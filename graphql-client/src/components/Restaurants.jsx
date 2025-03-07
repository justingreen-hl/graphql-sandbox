import { useState } from 'react'

export default function Restaurants({restaurantsData}) {
  const [list, setList] = useState(restaurantsData?.restaurants);
  const handleReverse = () => {
    setList(list.slice().reverse());
  }
  return (
    <>
     <h1>Restaurants</h1>
     <ul>
      {
        list.map((restaurant) => (
          <li key={restaurant.id}>            
            {`ID: ${restaurant.id}, Name: ${restaurant.name}`}
          </li>
        ))
      }
     </ul>

     <button
      onClick={handleReverse}
     >
      Reverse List
    </button>
    </>
  )
}