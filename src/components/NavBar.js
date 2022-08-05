import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className='nav'>
      <ul>
        <NavLink to="/">twitter</NavLink>
        <NavLink to="/reddit">reddit</NavLink>
        <NavLink to="/news">news</NavLink>
      </ul>

    </nav>
  )
}

export default NavBar