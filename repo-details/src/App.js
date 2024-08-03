import { useState } from "react";
import RepoDetails  from "./repo_details";
import axios from 'axios';

function App() {

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [details, setDetails] = useState({});
  const [detailsLoading, setDetailsLoading] = useState(false);

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
      <div className="row" onClick={() => getDetails(repo.name)} key={repo.id}>
        <h2 className="repo-name">
          {repo.name}
        </h2>
      </div>
    )
  }
  function getDetails(repoName) {
    setDetailsLoading(true);
    axios({
      method: "get",
      urls: 'https://api.github.com/repos/${username}/${repoName}',
    }).then(res=> {
      setDetailsLoading(false);
      setDetails(res.data);
    });
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
      <div>
        <RepoDetails details={details} loading={detailsLoading} />
      </div>
    </div>
  )
}

export default App;