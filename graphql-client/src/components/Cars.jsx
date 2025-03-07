export default function Cars({carsData}) {
  return (
    <>
     <h1>Cars</h1>
     <ul>
      {
        carsData?.cars.map((car) => (
          <li key={car.id}>
            {`${car.year} ${car.make} ${car.model}`}
          </li>
        ))
      }
     </ul>
    </>
  )
}