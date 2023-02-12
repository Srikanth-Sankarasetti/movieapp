import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FiAlertTriangle} from 'react-icons/fi'
import Slider from 'react-slick'

import HomeHeader from '../HomeHeader'
import Footer from '../Footer'
import SilkList from '../SilkList'
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const initialTrendingStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    originalList: [],
    trendingList: [],
    trendingApiStatus: initialTrendingStatus.initial,
    originalApiStatus: initialTrendingStatus.initial,
  }

  componentDidMount() {
    this.getOriginalDetails()
    this.getTrendingDetails()
  }

  getOriginalDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({originalApiStatus: initialTrendingStatus.progress})
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
      const filterOrginalList = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        overview: each.overview,
        name: each.title,
        id: each.id,
        posterPath: each.poster_path,
      }))
      this.setState({
        originalList: filterOrginalList,
        originalApiStatus: initialTrendingStatus.success,
      })
    }
    if (response.status === 400) {
      this.setState({originalApiStatus: initialTrendingStatus.failure})
    }
  }

  getTrendingDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({trendingApiStatus: initialTrendingStatus.progress})
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/trending-movies',
      options,
    )
    const data = await response.json()
    if (response.ok === true) {
      const filterTrendingList = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        overview: each.overview,
        name: each.title,
        id: each.id,
        posterPath: each.poster_path,
      }))
      this.setState({
        trendingList: filterTrendingList,
        trendingApiStatus: initialTrendingStatus.success,
      })
    }
    if (response.status === 400) {
      this.setState({trendingApiStatus: initialTrendingStatus.failure})
    }
  }

  trendingTryAgainClicked = () => {
    this.getTrendingDetails()
  }

  originalTryAgainClicked = () => {
    this.getOriginalDetails()
  }

  renderTrendingNowMovies = () => {
    const {trendingList} = this.state
    return (
      <>
        <div>
          <Slider {...settings}>
            {trendingList.map(each => (
              <div key={each.id} className="original-slider-container">
                <Link to={`/movies/${each.id}`}>
                  <img
                    className="original-image"
                    src={each.posterPath}
                    alt={each.name}
                  />
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </>
    )
  }

  renderOriginalsMovieList = () => {
    const {originalList} = this.state
    return (
      <>
        <div>
          <Slider {...settings}>
            {originalList.map(each => (
              <div key={each.id} className="original-slider-container">
                <Link to={`/movies/${each.id}`}>
                  <img
                    className="original-image"
                    src={each.posterPath}
                    alt={each.name}
                  />
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </>
    )
  }

  renderLoader = () => (
    <div className="home-loader">
      <Loader type="TailSpin" color="red" width={50} height={50} />
    </div>
  )

  renderFailureData = () => (
    <div className="home-loader">
      <FiAlertTriangle color="#D81F26" size={30} />
      <p className="error-message">Something went wrong. Please try again</p>
      <button
        type="button"
        className="try-again-button"
        onClick={this.trendingTryAgainClicked}
      >
        Try Again
      </button>
    </div>
  )

  renderOriginalFailureData = () => (
    <div className="home-loader">
      <FiAlertTriangle color="#D81F26" size={30} />
      <p className="error-message">Something went wrong. Please try again</p>
      <button
        type="button"
        className="try-again-button"
        onClick={this.originalTryAgainClicked}
      >
        Try Again
      </button>
    </div>
  )

  renderTrendingDataOnStatus = () => {
    const {trendingApiStatus} = this.state
    switch (trendingApiStatus) {
      case initialTrendingStatus.progress:
        return this.renderLoader()
      case initialTrendingStatus.success:
        return this.renderTrendingNowMovies()
      case initialTrendingStatus.failure:
        return this.renderFailureData()
      default:
        return null
    }
  }

  renderOriginalDataOnStatus = () => {
    const {originalApiStatus} = this.state
    switch (originalApiStatus) {
      case initialTrendingStatus.progress:
        return this.renderLoader()
      case initialTrendingStatus.success:
        return this.renderOriginalsMovieList()
      case initialTrendingStatus.failure:
        return this.renderOriginalFailureData()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-main-container">
        <HomeHeader />
        <div className="home-sub-container">
          <div className="silk-container">
            <h1 className="trending-head">Trending Now</h1>
            {this.renderTrendingDataOnStatus()}
            <h1 className="trending-head">Trending Now</h1>
            {this.renderOriginalDataOnStatus()}
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
