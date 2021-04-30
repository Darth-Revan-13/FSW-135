import React, {useContext} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Navbar from './Navbar.js'
import Auth from './Auth'
import Profile from './Profile.js'
import Public from './Public.js'
import {UserContext} from '../context/UserProvider'
import ProtectedRoute from './ProtectedRoute.js'

export default function App(){
  const {token, logout} = useContext(UserContext)
  return (
    <div className="app">
      <Navbar logout={logout}/>
      <Switch>
        <Route 
          exact path="/" 
          render={()=> token ? <Redirect to="/profile"/> : <Auth />}
        />
        <ProtectedRoute 
          path="/profile"
          component={Profile}
          redirectTo='/'
          token={token}
        />
        <Route 
          path="/public"
          render={() => <Public />}
        />
      </Switch>
    </div>
  )
}