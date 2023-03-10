import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UsersList() {
  const [users, setUsers] = useState([]);

  const getUserData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/accounts/`);
    const userData = await response.json();
    setUsers(userData);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="container">
      <div className="heading">
        <h1>Users</h1>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>username</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link className="link" to={`/users/${user.username}`}>
                    {user.username}
                  </Link>
                </td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;
