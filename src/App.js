import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      const repositories = await api.get("/repositories");

      setRepositories(repositories.data);
    }
    getRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: "Projeto-" + Date.now(),
      url: "https://github.com/Rocketseat/projeto" + Date.now(),
      techs: ["React Native", "Expo"],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const repositoriesIndex = repositories.findIndex((repository) => repository.id === id);

    if (repositoriesIndex < 0) {
      console.log("Repository not found.");
    }

    repositories.splice(repositoriesIndex, 1);
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
