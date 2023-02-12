import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {CgPlayList} from 'react-icons/cg'
import {AiOutlineClose} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {
    listMenuClicked: false,
  }

  listButton = () => {
    this.setState({listMenuClicked: true})
  }

  closeButtonClicked = () => {
    this.setState({listMenuClicked: false})
  }

  searchClicked = () => {
    const {history} = this.props
    history.replace('/search')
  }

  render() {
    const {listMenuClicked} = this.state
    const {match} = this.props
    const {path} = match
    const homeColor = path === '/' ? 'active-tab-color' : ''
    const popularColor = path === '/popular' ? 'active-tab-color' : ''
    const accountColor = path === '/account' ? 'active-tab-color' : ''
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
              <Link to="/" className={`link ${homeColor}`}>
                <li>Home</li>
              </Link>
              <Link to="/popular" className={`link ${popularColor}`}>
                <li>Popular</li>
              </Link>
            </nav>
          </div>
          <div className="search_and_profile_container">
            <div>
              <button
                type="button"
                className="searchButton"
                onClick={this.searchClicked}
              >
                <HiOutlineSearch size={25} color="#ffffff" />
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
              <div>
                <button
                  type="button"
                  className="searchButton"
                  onClick={this.searchClicked}
                >
                  <HiOutlineSearch size={25} color="#ffffff" />
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
            <Link to="/" className={`link ${homeColor}`}>
              <li>Home</li>
            </Link>
            <Link to="/popular" className={`link ${popularColor}`}>
              <li>Popular</li>
            </Link>
            <Link to="/account" className={`link ${accountColor}`}>
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

export default withRouter(Header)
