const fs = require("fs");
const movies = JSON.parse(fs.readFileSync("./data/movies.json"));

//ROUTE HANDLERS
//GET ALL MOVIES
exports.getAllMovies = (req, res) => {
  res.status(200).json({
    status: "success",
    //updating with count property
    count: movies.length,
    data: {
      movies: movies,
    },
  });
};

//GET A MOVIE
exports.getMovie = (req, res) => {
  const id = +req.params.id;
  const movie = movies.find((el) => el.id === id);

  //Handle non existing route parameter
  if (!movie) {
    res.status(404).json({
      status: "fail",
      message: `Movie with ID:${id} not found`,
    });
    return;
  }
  res.status(200).json({
    status: "success",
    data: {
      movie: movie,
    },
  });
};

//CREATE A MOVIE
exports.createMovie = (req, res) => {
  //create newId
  const newId = movies[movies.length - 1].id + 1;

  //Create New movie
  const newMovie = Object.assign({ id: newId }, req.body);
  movies.push(newMovie);
  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(201).json({
      status: "Success",
      data: {
        movie: newMovie,
      },
    });
  });
};

//UPDATE A MOVIE
exports.updateMovie = (req, res) => {
  const id = +req.params.id;

  //Lets get the movie to update
  const movieToUpdate = movies.find((el) => el.id === id);

  //Handle errors for non existing route parameter
  if (!movieToUpdate) {
    res.status(404).json({
      status: "fail",
      data: {
        message: `No movie object with ID: ${id} is found`,
      },
    });

    return;
  }

  //Lets get the index of the movie to update
  const index = movies.indexOf(movieToUpdate);

  //Lets compare and match properties of the movie to update and the property we want to update
  Object.assign(movieToUpdate, req.body);

  //Lets update the movie index with our updated movie
  movies[index] = movieToUpdate;

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(200).json({
      status: "Success",
      data: {
        movie: movieToUpdate,
      },
    });
  });
};
//DELETE A MOVIE
exports.deleteMovies = (req, res) => {
  const id = +req.params.id;
  const movieToDelete = movies.find((el) => el.id === id);
  const index = movies.indexOf(movieToDelete);

  if (!movieToDelete) {
    res.status(404).json({
      status: "fail",
      data: {
        message: `No movie object with ID:${id} is found`,
      },
    });
    return;
  }
  movies.splice(index, 1);
  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(204).json({
      status: "Success",
      data: {
        movie: null,
      },
    });
  });
};