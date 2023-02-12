import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import SearchHeader from '../SearchHeader'
import SilkList from '../SilkList'
import './index.css'

const initialSearchStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Search extends Component {
  state = {
    searchList: [],
    searchStatus: initialSearchStatus.initial,
    searchValue: '',
  }

  getSearchMovies = async value => {
    if (value !== '') {
      const jwtToken = Cookies.get('jwt_token')
      this.setState({
        searchValue: value,
        searchStatus: initialSearchStatus.progress,
      })
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(
        `https://apis.ccbp.in/movies-app/movies-search?search=${value}`,
        options,
      )
      const data = await response.json()
      if (response.ok === true) {
        const filterSearchList = data.results.map(each => ({
          backdropPath: each.backdrop_path,
          title: each.title,
          id: each.id,
          posterPath: each.poster_path,
        }))
        this.setState({
          searchList: filterSearchList,
          searchStatus: initialSearchStatus.success,
        })
      }
      if (data.results.length === 0) {
        this.setState({searchStatus: initialSearchStatus.failure})
      }
    }
    if (value === '') {
      this.setState({searchStatus: initialSearchStatus.initial, searchList: []})
    }
  }

  renderEmptyResult = () => {
    const {searchValue} = this.state
    return (
      <div className="empty-container">
        <img
          className="no-video-image"
          src="https://res.cloudinary.com/ducrzzdqj/image/upload/v1675364948/Group_7394_o5vlfg.png"
          alt="no movies"
        />
        <p className="search-para">
          Your search for {searchValue} did not find any matches.
        </p>
      </div>
    )
  }

  renderSearchVideos = () => {
    const {searchList} = this.state
    return (
      <div className="search-list-container">
        {searchList.map(each => (
          <SilkList key={each.id} silkLists={each} />
        ))}
      </div>
    )
  }

  renderSearchLoader = () => (
    <div className="search-loader-container" testid="loader">
      <Loader type="TailSpin" color="#d81f26" width={50} height={50} />
    </div>
  )

  renderSearchListOnStatus = () => {
    const {searchStatus} = this.state
    switch (searchStatus) {
      case initialSearchStatus.progress:
        return this.renderSearchLoader()
      case initialSearchStatus.success:
        return this.renderSearchVideos()
      case initialSearchStatus.failure:
        return this.renderEmptyResult()
      default:
        return null
    }
  }

  render() {
    const {searchList} = this.state
    return (
      <div className="search-main-container">
        <SearchHeader searchFunction={this.getSearchMovies} />
        {this.renderSearchListOnStatus()}
      </div>
    )
  }
}

export default Search
