import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;
//const apiUrl = window.env?.REACT_APP_API_URL || process.env.REACT_APP_API_URL;
// var url="http://localhost:5000";
function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
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
              {loading ? (
                <li className="list-group-item text-center">Loading...</li>
              ) : error ? (
                <li className="list-group-item text-center text-danger">
                  Error: {error}
                </li>
              ) : users.length > 0 ? (
                users.map((user, index) => (
                  <li key={index} className="list-group-item">
                    {user.username || user[1]} {/* Safely handle user data */}
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
