import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:4000/users`)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })

      .catch((err) => `Houston we have an error: ${err}`);
  }, []);

  return (
    <div className="App">
      {users.map((user) => {
        return (
          <div key={user.id} className="post">
            <p>{user.name}</p>
            <p>{user.posts}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
