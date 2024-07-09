const Movie = require("../models/Movie");

module.exports.addMovie = (req,res) => {

	let newMovie = new Movie({
		title : req.body.title,
		director : req.body.director,
		year: req.body.year,
		description: req.body.description,
		genre: req.body.genre,
		comments:[]
	});

	newMovie.save()
	.then(savedMovie => res.status(201).send(savedMovie))
	.catch(saveErr => {

		console.error("Error in saving the Movie: ", saveErr)
		return res.status(500).send({ error: 'Failed to save the Movie' });
	})

};

module.exports.getAllMovies = async (req, res) => {


    try {
        const movies = await Movie.find({});

        if (!movies.length) {
            return res.status(404).send({ message: 'No Movies found.' });
        }

        res.status(200).send({ movies });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

};

module.exports.getMovieById = (req, res) => {

	let movieId = req.params.id;

	return Movie.findById(movieId).then(movie => {

		if(!movie) {

			return res.status(404).send({error: 'Movie not found'});
		}

		
		return res.status(200).send(movie);
		

	}).catch(findErr => {

		console.error('Error finding movie: ', findErr);
		return res.status(500).send({ error: 'Failed to fetch movie' });
	});

};


module.exports.updateMovie = (req, res) => {

	let movieId = req.params.id;
	let updatedMovie= {
		title : req.body.title,
		director : req.body.director,
		year: req.body.year,
		description: req.body.description,
		genre: req.body.genre
	};

	return Movie.findByIdAndUpdate(movieId, updatedMovie, { new: true }).then(updatedMovie => {

		if(updatedMovie) {

			return res.status(200).send({
				message: 'Movie updated successfully',
				updatedMovie
			});
		} 
		// if Movie is not found
		else {

			return res.status(404).send({ error: 'Movie not found '});
		}
	}).catch(updateErr => {

		console.error('Error in updating the Movie: ', updateErr);
		return res.status(500).send({ error: "Error in updating the Movie"});
	});
};


module.exports.deleteMovie = (req, res) => {

    return Movie.deleteOne({ _id: req.params.id})
    .then(deletedResult => {

        if (deletedResult.deletedCount === 0) {

            return res.status(400).send({ error: 'No Movie deleted' });

        }

        return res.status(200).send({ 
        	message: 'Movie deleted successfully',
        });

    })
    .catch(err => {
		console.error("Error in deleting the Movie : ", err)
		return res.status(500).send({ error: 'Error in deleting the Movie.' });
	});
};


module.exports.addComment = async (req, res) => {
    const userId = req.user.id;
    const { comment } = req.body;

    try {
    	let movie = await Movie.findOne({ _id: req.params.id });

        // // check if movie exist
        if (!movie) {
            return res.status(404).send({ error: 'Movie not found '});
        }
        
        
        movie.comments.push({ userId, comment });
        
        await movie.save();

        res.status(200).json({ message: 'comment added successfully', updatedMovie: movie });

    } catch (error) {
        res.status(500).json({ message: 'Error updating movie', error: error.message });
    }
};


module.exports.getComments = async (req, res) => {

    try {
        const movie = await Movie.findOne({ _id: req.params.id });

        if (!movie.comments.length) {
            return res.status(404).send({ message: 'No comments found.' });
        }

        res.status(200).send({ comments: movie.comments });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};