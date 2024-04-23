import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3300/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3300/users/${id}`)
      .then(() => {
        alert('User Deleted Successfully');
        window.location.reload(true);
      })
      .catch(error => {
        alert('Error deleting user');
        console.error('Error:', error);
      });

  };

    return (
      <div>
        <h2>Users List</h2>
        <ul>
          {users.map(user => (
            <div key={user.id}>
              <li><b>ID:</b> {user.id}<br></br><b> FirstName: </b>{user.firstName}</li>
              <button onClick={() => deleteUser(user.id)}>delete</button>
            </div>
          ))}
        </ul>
      </div>
    );
  }

  export default UsersList;
