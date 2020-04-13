const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs, likes = 0 } = request.body;
  const repository = { id: uuid(), title, url, techs, likes }

  repositories.push(repository)
  return response.status(200).json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(respository => respository.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "repository not found" })
  }

  repositories[repositoryIndex].id = id;
  repositories[repositoryIndex].title = title;
  repositories[repositoryIndex].url = url;
  repositories[repositoryIndex].techs = techs;
  let repository = repositories[repositoryIndex]

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(respository => respository.id === id)
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "repository not found" })
  }

  repositories.splice(repositoryIndex, 1)

  return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(respository => respository.id === id)
  console.log(repositoryIndex)
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "repository not found" })
  }

  let likes = repositories[repositoryIndex].likes;
  likes = likes + 1
  repositories[repositoryIndex].likes = likes


  return response.status(201).json({ likes })

});


module.exports = app;
