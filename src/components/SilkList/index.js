import {Link} from 'react-router-dom'
import './index.css'

const SilkList = props => {
  const {silkLists} = props
  const {backdropPath, overview, name, id, posterPath} = silkLists
  return (
    <li className="popularPosterContainer" key={id}>
      <Link to={`/movies/${id}`}>
        <img className="popularImage" src={posterPath} alt={name} />
      </Link>
    </li>
  )
}

export default SilkList
