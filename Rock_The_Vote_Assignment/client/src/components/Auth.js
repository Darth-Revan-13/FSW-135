import React, {useState, useContext} from 'react'
import AuthForm from './AuthForm.js'
import {UserContext} from '../context/UserProvider.js'

const initInputs = {username: "", password: ""}

export default function Auth(){
  const [inputs, setInputs] = useState(initInputs)
  const [toggle, setToggle] = useState(false)

  const {signup, login, errMsg, resetAuthErr} = useContext(UserContext)

  function handleChange(e){
    const {name, value} = e.target 
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSignup(e){
    e.preventDefault()
    signup(inputs)
  }

  function handleLogin(e){
    e.preventDefault()
    login(inputs)
  }

  function toggleForm() {
      console.log("hello")
    setToggle(prev => !prev)
    resetAuthErr()
  }

  return (
      <div className="auth-container">
          <h1>Rock The Vote</h1>
            {!toggle ?
                <>
                    <AuthForm
                        handleChange={handleChange}
                        handleSubmit={handleSignup}
                        inputs={inputs}
                        btnText="Sign up!"
                        errMsg={errMsg}
                    />
                    
                    <p onClick={toggleForm}>Already have an account?</p>
                </>
            :
                <>
                    <AuthForm
                        handleChange={handleChange}
                        handleSubmit={handleLogin}
                        inputs={inputs}
                        btnText="Login"
                        errMsg={errMsg}
                    />
                    
                    <p onClick={toggleForm}>Don't have an account?</p>
                </>
            }
      </div>
  )
}