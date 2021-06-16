import { Redirect } from 'react-router-dom'

import React, { useState } from "react"
// for  redux state and actions / store
import { connect } from "react-redux"
//change interface texts depending on language
import IntlMessages from '../util/IntlMessages';
 

const Login = ({ language }) => {
  
//  loggedin: isAuthenticated()
 const [loggedin,setLogedin]=useState(false) 

 const submit=(e)=>{
    e.preventDefault()
    e.stopPropagation()
    
    let form = e.target
    let formData = new FormData(form)
    let params = new URLSearchParams(formData)
    console.log('REACT_APP_SERVER =======',process.env.REACT_APP_SERVER)
    console.log('/auth/login params =======',params)
    // Send request to the server
    fetch(process.env.REACT_APP_SERVER+'/auth/login', {
      method: 'POST',
      json:true,
      body: params
    }).then( (res) => { 
      return res.json()
    }).then(data => {
        console.log('/auth/login data =======',data)
      if (data.code ==  200 /* OR data.statusCode != 401 */)
      {
       localStorage.setItem('token', data.accessToken)
       setLogedin(true)
      }  
      else
      {
        setLogedin(false)
      }
    }).catch( (err) => {
      console.error(err)
      setLogedin(false)
    })
  }

  return (
   loggedin ?
        <Redirect
          to={{
            pathname: '/'
          }}
        />
      
   :
        <div>
          <h1>Login</h1>
          <form onSubmit={submit}>
            <div>
              <label>Username: </label>
              <input type="text" name="username" pattern=".{2,16}" required />
            </div>
            <div>
              <label>Password: </label>
              <input type="password" name="password" pattern=".{5,20}" required />
            </div>
            <div>
              <input type="submit" value="Log in" />
            </div>
          </form>
        </div>
      
  )
    
  }



const mapStateToProps = state => {
    const language = state.languageDirection.locale;
    return {
        language: language
    }
}

export default connect(mapStateToProps)(Login)