import PropTypes from 'prop-types'

const Header = ({title}) => {
  return (
    <header>
        <h1 className='title'>{title}</h1>
    </header>
  )
}

Header.propTypes = {
    title: PropTypes.string
}
export default Header