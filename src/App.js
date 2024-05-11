import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Navbar from './Components/Navbar/Navbar';
import Spinner from 'react-bootstrap/Spinner';



function App() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(true);


  const handleSearch = () => {
    const filteredResults = user.filter((item) => {
      return search.toLowerCase() === ''
        ? item
        : item.firstName.toLowerCase().includes(search);
    })
    setSearchResults(filteredResults);
  };


  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUser(data.users);
        setLoading(false);
      })
      .catch(err => {
        console.log(err)
        setLoading(false);
      });
  }, []);


  return (
    <div>
      <Navbar />
      <Container>
        <h1 className='text-center mt-4'>Digital Jalebi By Yogya Sharma</h1>

        <Form>
          <InputGroup className='my-3'>

            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search'
            />

            <Button variant="primary" onClick={handleSearch}>Search</Button>
          </InputGroup>
        </Form>

        {loading && (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner>
          </div>
        )}

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Profile Picture</th>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {(searchResults.length > 0 ? searchResults : user).map((item, index) => (
              <tr key={index}>
                <td><img src={item.image} alt="User" style={{ width: '50px', height: '50px' }} /></td>
                <td>{item.username}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default App;



