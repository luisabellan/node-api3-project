import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const [selected, setSelected] = useState(false);

  function showDetails(user) {
    return <p>{user}</p>;
  }
  useEffect(() => {
    axios
      .get(`http://localhost:4000/users`)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })

      .catch((err) => `Houston we have an error: ${err}`);
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/posts`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })

      .catch((err) => `Houston we have an error: ${err}`);
  }, []);

  return (
    <div className="users">
      {users.map((user) => {
        return (
          <div
            key={user.id}
            onClick={() => {
              showDetails();
            }}
            className="post"
          >
            <p>{user.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
