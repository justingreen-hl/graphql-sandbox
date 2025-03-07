import { useState } from 'react'
import './App.css'
import Users from './components/Users'
import Cars from './components/Cars'
import Restaurants from './components/Restaurants'
import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    users {
      ...userInfo
    }
  }

  fragment userInfo on User {
    id  
    fullname
    show
  }
`;

const GET_CARS = gql`
  query GetCars {
    cars {
      ...carInfo
    }  
  }

  fragment carInfo on Car {
    id
    make
    model
    year
  }
`;

const GET_RESTAURANTS = gql`
  query GetRestaurants {
    restaurants {
      ...restaurantInfo
    }
  }

  fragment restaurantInfo on Restaurant {
    id
    name
  }
`;

function App() {
  const [gqlData, setGqlData] = useState(GET_RESTAURANTS)
  const [showUsers, setShowUsers] = useState(false);
  const { loading, error, data } = useQuery(gqlData);

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error {error.message}</p>
  if(data) console.log(data);

  return (
    <>
      <Restaurants restaurantsData={data} />
      {/* <button 
        style={{ marginRight: '20px' }}
        onClick={() => {
          setShowUsers(true);
          setGqlData(GET_USERS);
        }}>
          Show Users
        </button>
      
      {
        showUsers === false
        ?
        <button 
          disabled
          onClick={() => {
          setShowUsers(false);
          setGqlData(GET_CARS);
        }}>
          Show Cars
        </button>
      :
        <button 
          onClick={() => {
          setShowUsers(false);
          setGqlData(GET_CARS);
        }}>
          Show Cars
        </button>
      }
      

      { showUsers ? <Users userData={data} /> : <Cars carsData={data} /> }   */}
    </>
  )

  // if(data.users) {
  //   { showUsers ? <Users userData={data} /> : null }  
  // }  

  // if(data.cars) {
  //   return (
  //     <Cars carsData={data} />
  //   )
  // }

  // if(data.users) {
  //   return (
  //     <>
  //      <h1>Users</h1>
  //      <ul>
  //       {
  //         data?.users.map((user) => (
  //           <li key={user.id}>
  //             {`${user.fullname} - ${user.show}`}
  //           </li>
  //         ))
  //       }
  //      </ul>
  //     </>
  //   )
  // }

  // if(data.cars) {
  //   return (
  //     <>
  //      <h1>Cars</h1>
  //      <ul>
  //       {
  //         data?.cars.map((car) => (
  //           <li key={car.id}>
  //             {`${car.year} ${car.make} ${car.model}`}
  //           </li>
  //         ))
  //       }
  //      </ul>
  //     </>
  //   )
  // }
  
}

export default App
