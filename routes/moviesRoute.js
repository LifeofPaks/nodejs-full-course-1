const express = require("express")

const router = express.Router()

router.route("/")
.get(getAllMovies)
.post(createMovie)

router.route("/:id")
.get(getMovie)
.patch(updateMovie)
.delete(deleteMovies)

module.exports = router