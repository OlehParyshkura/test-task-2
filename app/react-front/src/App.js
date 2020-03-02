import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'


function App() {
  const [_triggerFetch, _setTrigerFetch] = useState(true);
  function triggerFetch() {
    _setTrigerFetch((val) => !val);
  }
  const [sortProperty, setSortProperty] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    age: ""
  });
  useEffect(() => {
    fetch('http://localhost:8080/api/users')
      .then(res => res.json())
      .then(res =>setUsers(res))
      .catch(err => console.error(err));
  }, [_triggerFetch]);
  function addNewUser(e) {
    e.preventDefault();
    const firstName = e.target.firstName.value,
      lastName = e.target.lastName.value,
      phone = e.target.phone.value,
      gender = e.target.gender.value,
      age = e.target.age.value;
    fetch('http://localhost:8080/api/users',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, phone, gender, age })
      })
      .then(() => {
        triggerFetch();
        setSelectedUser({
          _id: "",
          firstName: "",
          lastName: "",
          phone: "",
          gender: "",
          age: ""
        });
      })
      .catch(function (err) { console.error(err) })
  }
  function editUser(id) {
    return (e) => {
      e.preventDefault();
      const firstName = e.target.firstName.value,
        lastName = e.target.lastName.value,
        phone = e.target.phone.value,
        gender = e.target.gender.value,
        age = e.target.age.value;
      fetch('http://localhost:8080/api/users/' + id,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'PUT',
          body: JSON.stringify({ firstName, lastName, phone, gender, age })
        })
        .then(() => {
          triggerFetch();
          setSelectedUser({
            _id: "",
            firstName: "",
            lastName: "",
            phone: "",
            gender: "",
            age: ""
          });
        })
        .catch(function (err) { console.error(err) })
    }

  }
  function deleteUser(id) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      fetch('http://localhost:8080/api/users/' + id,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'DELETE',
        })
        .then(() => { triggerFetch() })
        .catch(function (err) { console.error(err) })
    }
  }

  return (
    <div>
      <UserForm input={selectedUser} onSubmit={selectedUser._id !== "" ? editUser(selectedUser._id) : addNewUser} onInput={(e) => {
        setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
      }} />
      <Table striped bordered hover>
        <thead>
          <tr onClick={(e) => {
            if (sortProperty !== e.target.getAttribute('name')) {
              setSortProperty(e.target.getAttribute('name'));
            } else {
              setSortProperty(null);
            }
          }}>
            <th name="firstName" >First Name{sortProperty === 'firstName' ? '\\/' : ''}</th>
            <th name="lastName">Last Name{sortProperty === 'lastName' ? '\\/' : ''}</th>
            <th name="phone">Phone{sortProperty === 'phone' ? '\\/' : ''}</th>
            <th name="gender">Gender{sortProperty === 'gender' ? '/' : ''}</th>
            <th name="age">Age{sortProperty === 'age' ? '\\/' : ''}</th>
            <th>delete</th>
          </tr>
        </thead>

        <tbody>
          {users.sort((a, b) => {
            if (a[sortProperty] < b[sortProperty]) { return -1; }
            if (a[sortProperty] > b[sortProperty]) { return 1; }
            return 0;
          }).map((user) => {
            return (
              <tr onClick={() => setSelectedUser(user)}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.phone}</td>
                <td>{user.gender ? 'Male' : 'Female'}</td>
                <td>{user.age}</td>
                <td><Button variant='danger' onClick={deleteUser(user._id)}>delete</Button></td>
              </tr>
            )
          })}

        </tbody>
      </Table>
    </div>
  );
}

export default App;