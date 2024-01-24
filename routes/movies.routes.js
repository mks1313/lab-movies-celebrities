const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');


router.get('/movies/create', (req, res, next) => {
 
    Celebrity.find()
        .then((celebrities) => {
            res.render('movies/new-movie', { isMoviesPage: true, celebrities });
        })
        .catch(error => {
            next(error);
        });
});


router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;

    const newMovie = new Movie({
        title,
        genre,
        plot,
        cast,
    });


    newMovie.save()
        .then(() => {
            res.redirect('/movies');
        })
        .catch(error => {
            next(error);
        });
});

router.get('/movies', (req, res, next) => {
    Movie.find()
        .then((movies) => {
            res.render('movies/movies', { isMoviesPage: true, movies });
        })
        .catch((error) => {
            next(error);
        });
});

router.get('/movies/:id', (req, res, next) => {
    const movieId = req.params.id;

    Movie.findById(movieId)
        .populate('cast') 
        .then((movie) => {
            res.render('movies/movie-details', { isMoviesPage: true, movie });
        })
        .catch((error) => {
            next(error);
        });
});


router.get('/movies/:id/edit', (req, res, next) => {
    const movieId = req.params.id;
    
    Movie.findById(movieId)
    .then((movie) => {
        return Celebrity.find()
        .then((celebrities) => {
            res.render('movies/edit-movie', { isMoviesPage: true, movie, celebrities });
        });
    })
    .catch((error) => {
        next(error);
    });
});

router.post('/movies/:id', (req, res, next) => {
    const movieId = req.params.id;
    const { title, genre, plot, cast } = req.body;
    
    Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast }, { new: true })
    .then(() => {
        res.redirect(`/movies/${movieId}`);
    })
    .catch((error) => {
        next(error);
    });
});


router.post('/movies/:id/delete', (req, res, next) => {
    const movieId = req.params.id;

    Movie.findByIdAndDelete(movieId)
        .then(() => {
            res.redirect('/movies');
        })
        .catch((error) => {
            next(error);
        });
});


module.exports = router;


