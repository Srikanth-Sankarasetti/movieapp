import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import ProtectRoute from './components/ProtectRoute'
import Home from './components/Home'
import Popular from './components/Popular'
import Search from './components/Search'
import Account from './components/Account'
import MovieItemDetails from './components/MovieItemDetails'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectRoute exact path="/" component={Home} />
    <ProtectRoute exact path="/popular" component={Popular} />
    <ProtectRoute exact path="/search" component={Search} />
    <ProtectRoute exact path="/account" component={Account} />
    <ProtectRoute exact path="/movies/:id" component={MovieItemDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
