import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UsersList() {
    const [users, setUsers] = useState([])

    const getUserData = async () => {
        const response = await fetch('http://localhost:8000/api/accounts/')
        const userData = await response.json()
        console.log(userData)
        setUsers(userData)
    }

    useEffect(() => {
        getUserData();
    }, []
    )

    return (
        <div>
            <h1>Users</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>username</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => {
                        return (
                            <tr key={user.id}>
                                <td>
                                    <Link class="link" to={`/users/${user.username}`}>
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
    )
}

export default UsersList
