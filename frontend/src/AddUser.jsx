import React, { useState } from 'react';
import axios from 'axios';

function AddUser() {
  const [user, setUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    location: ''
  });

  const [err, setErr] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3300/users', user)
      .then(() => {
        alert('User added successfully');
        // Clear form or handle as needed
      })
      .catch(error => {
        alert('Error adding user');
        console.error('Error:', error);
        setErr(`Invalid Input ${error}`);
      });
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <h2>Add User</h2>
      <label>
        ID:
        <input type="text" name="id" value={user.id} onChange={handleChange} />
      </label>
      <label>
        First Name:
        <input type="text" name="firstName" value={user.firstName} onChange={handleChange} />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
      </label>
      <label>
        Location:
        <input type="text" name="location" value={user.location} onChange={handleChange} />
      </label>
      <button type="submit">Add User</button>
    </form>
  <p>{err}</p>
    </div>
  );
}

export default AddUser;
