

export default function Users({userData}) {
  return (
    <div>   
      <h1>Users</h1>   
      <ul>
      {
        userData?.users.map((user) => (
          <li key={user.id}>
            {`${user.fullname} - ${user.show}`}
          </li>
        ))
      }
      </ul>
    </div>
  )
}