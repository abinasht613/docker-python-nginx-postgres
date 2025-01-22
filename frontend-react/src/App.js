import React, { useEffect, useState } from "react";

const apiUrl = window.env?.REACT_APP_API_URL || process.env.REACT_APP_API_URL;
// var url="http://localhost:5000";
function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">User List</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Registered Users</h3>
            </div>
            <ul className="list-group list-group-flush">
              {users.length > 0 ? (
                users.map((user, index) => (
                  <li key={index} className="list-group-item">
                    {user[1]}
                  </li>
                ))
              ) : (
                <li className="list-group-item text-center">
                  No users found.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
