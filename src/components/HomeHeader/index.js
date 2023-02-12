import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {FiAlertTriangle} from 'react-icons/fi'

import Header from '../Header'

import './index.css'

const initialTrendingStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class HomeHeader extends Component {
  state = {
    titleList: [],
    apiStatus: initialTrendingStatus.initial,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: initialTrendingStatus.progress})
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/originals',
      options,
    )

    if (response.ok === true) {
      const data = await response.json()
      const value = Math.floor(Math.random() * data.results.length)
      const poster = data.results[value]
      const filterMainHeader = {
        backdropPath: poster.backdrop_path,
        overview: poster.overview,
        name: poster.title,
        id: poster.id,
      }
      this.setState({
        titleList: filterMainHeader,
        apiStatus: initialTrendingStatus.success,
      })
    }
    if (response.status === 400) {
      this.setState({apiStatus: initialTrendingStatus.failure})
    }
  }

  orginalTryAgainClicked = () => {
    this.getDetails()
  }

  renderLoader = () => (
    <div className="loader">
      <Header />
      <div className="home-header-loader-container">
        <Loader type="TailSpin" color="red" width={50} height={50} />
      </div>
    </div>
  )

  renderMainOrginalErrorDetails = () => (
    <div className="loader">
      <Header />
      <div className="home-header-loader-container">
        <FiAlertTriangle color="#D81F26" size={30} />
        <p className="error-message">Something went wrong. Please try again</p>
        <button
          type="button"
          className="try-again-button"
          onClick={this.orginalTryAgainClicked}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderHomeHeaderDetails = () => {
    const {titleList} = this.state
    const {backdropPath, overview, name, id} = titleList
    return (
      <>
        <div
          style={{
            backgroundImage: `url(${backdropPath})`,
            backgroundSize: 'cover',
            minHeight: '75vh',
            width: '100%',
          }}
        >
          <Header />
          <div className="super-man-container">
            <h1 className="super-man-head">{name}</h1>
            <h1 className="super-man-text">{overview}</h1>
            <Link to={`/movies/${id}`}>
              <button className="playButton" type="button">
                Play
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }

  renderOriginalDataOnStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case initialTrendingStatus.progress:
        return this.renderLoader()
      case initialTrendingStatus.success:
        return this.renderHomeHeaderDetails()
      case initialTrendingStatus.failure:
        return this.renderMainOrginalErrorDetails()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderOriginalDataOnStatus()}</>
  }
}

export default HomeHeader
