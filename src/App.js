import './App.css';
import React, { useEffect, useState } from 'react';
const API_URL = 'https://reqres.in/api/users?page=2'; 



function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const json = await response.json();
          setData(json.data);
        } else {
          setError('Error retrieving data');
        }
      } catch (error) {
        setError('Error retrieving data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };
  const filteredUsers = data.filter(user =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <div> 
      <div>
        <div>
        <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
       
      />
        </div>
        {searchTerm &&
          <div className="container">
          <div className="card-row">
            <h6>Searched Data</h6>
            {filteredUsers.map((user) => (
              <div key={user.id}>
                <div className='avatarId'>
                <img src={user.avatar} />
                <h3>{user.id}</h3>
                </div>
                <div className='name'>         
                  <p>{user.first_name}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
       
        }

       

      </div>
       <div className="container">
    <div className="card-row">
      <h1>All Users Data</h1>
      {data.map((user) => (
        <div key={user.id}>
          <div className='avatarId'>
          <img src={user.avatar} />
          <h3>{user.id}</h3>
          </div>
          <div className='name'>         
            <p>{user.first_name}</p>
           </div>
        </div>
      ))}
    </div>
  </div>
    </div>  
  );

}

export default App;
