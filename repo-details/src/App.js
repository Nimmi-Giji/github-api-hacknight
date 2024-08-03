import { useState } from "react";
import axios from 'axios';

function App() {

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);

  function handleSubmit(e){
    e.preventDefault();
    searchRepos();
  };

  function searchRepos(){
    setLoading(true);
    axios({
      method: "get",
      url: `https://api.github.com/users/${username}/repos`,
    }).then(res => {
      setLoading(false);
      setRepos(res.data);
    });
  }

  function renderRepos(repo){
    return (
      <div className="row" key={repo.id}>
        <h2 className="repo-name">
          {repo.name}
        </h2>
      </div>
    )
  }

  return (
    <div>

      <form className = "form">
        <input className="input"
        value = {username}
        placeholder = "Username"
        onChange = {e => setUsername(e.target.value)} />

        {/* // a form that takes username as input */}

        <button className="button" onClick = {handleSubmit}>{loading ? "Searching..." : "Search"}</button>

        {/* a button that displays search when loading is false, and searching when setLoading(true) is called */}

      </form>

      <div className="results-container">
        {repos.map(renderRepos)}

        {/* empty array is initialised in useState so the map() function works */}

      </div>
    </div>
  )
}

export default App;
