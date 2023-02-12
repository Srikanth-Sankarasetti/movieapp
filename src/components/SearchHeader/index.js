import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {CgPlayList} from 'react-icons/cg'
import {AiOutlineClose} from 'react-icons/ai'

import './index.css'

class SearchHeader extends Component {
  constructor(props) {
    super(props)
    const {searchFunction} = this.props
    this.state = {
      searchFunctionClicked: searchFunction,
      listMenuClicked: false,
      searchValue: '',
    }
  }

  listButton = () => {
    this.setState({listMenuClicked: true})
  }

  closeButtonClicked = () => {
    this.setState({listMenuClicked: false})
  }

  searchClicked = () => {
    const {searchValue, searchFunctionClicked} = this.state
    searchFunctionClicked(searchValue)
  }

  changeInputValue = event => {
    this.setState({searchValue: event.target.value})
  }

  render() {
    const {listMenuClicked} = this.state
    const listMenuShow = listMenuClicked ? '' : 'list-menu-show '
    return (
      <>
        <nav className="headerMainContainer">
          <div className="headerContainer">
            <Link to="/">
              <img
                className="websiteLogo"
                src="https://res.cloudinary.com/ducrzzdqj/image/upload/v1675173753/Group_7399_btlhcd.png"
                alt="website logo"
              />
            </Link>
            <nav className="navList">
              <Link to="/" className="link">
                <li>Home</li>
              </Link>
              <Link to="/popular" className="link">
                <li>Popular</li>
              </Link>
            </nav>
          </div>
          <div className="search_and_profile_container">
            <div className="search-value-container">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={this.changeInputValue}
              />
              <button
                type="button"
                className="search-button-data"
                onClick={this.searchClicked}
              >
                <HiOutlineSearch color="#ffffff" size={20} />
              </button>
            </div>
            <Link to="/account">
              <img
                className="profile"
                src="https://res.cloudinary.com/ducrzzdqj/image/upload/v1675189771/Avatar_bj1bi3.png"
                alt="profile"
              />
            </Link>
          </div>
        </nav>
        <nav className="headerMainContainer1">
          <div className="sri">
            <div className="headerContainer">
              <Link to="/">
                <img
                  className="websiteLogo"
                  src="https://res.cloudinary.com/ducrzzdqj/image/upload/v1675173753/Group_7399_btlhcd.png"
                  alt="website logo"
                />
              </Link>
            </div>
            <div className="search_and_profile_container">
              <div className="search-value-container">
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  onChange={this.changeInputValue}
                />
                <button
                  type="button"
                  className="search-button-data"
                  onClick={this.searchClicked}
                >
                  <HiOutlineSearch color="#ffffff" size={20} />
                </button>
              </div>
              <button
                type="button"
                className="list-button"
                onClick={this.listButton}
              >
                <CgPlayList color="white" size={30} />
              </button>
            </div>
          </div>
          <ul className={`header-ul-list ${listMenuShow}`}>
            <Link to="/" className="link">
              <li>Home</li>
            </Link>
            <Link to="/popular" className="link">
              <li>Popular</li>
            </Link>
            <Link to="/account" className="link">
              <li>Account</li>
            </Link>
            <button
              type="button"
              className="close-button"
              onClick={this.closeButtonClicked}
            >
              <AiOutlineClose color="#ffffff" size={18} />
            </button>
          </ul>
        </nav>
      </>
    )
  }
}

export default SearchHeader
