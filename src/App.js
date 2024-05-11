import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Navbar from './Components/Navbar/Navbar';
import Spinner from 'react-bootstrap/Spinner';
import './App.css'



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
          <InputGroup className='my-5'>

            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search by first name'
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
        <div className='table-responsive'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className='listItems'>Profile Picture</th>
                <th className='listItems'>Username</th>
                <th className='listItems'>First Name</th>
                <th className='listItems'>Last Name</th>
                <th className='listItems'>Email</th>
                <th className='listItems'>Phone</th>
              </tr>
            </thead>
            <tbody>
              {(searchResults.length > 0 ? searchResults : user).map((item, index) => (
                <tr key={index}>
                  <td className='listItems'><img src={item.image} alt="User" style={{ width: '50px', height: '50px' }} /></td>
                  <td className='listItems'>{item.username}</td>
                  <td className='listItems'>{item.firstName}</td>
                  <td className='listItems'>{item.lastName}</td>
                  <td className='listItems'>{item.email}</td>
                  <td className='listItems'>{item.phone}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}

export default App;



