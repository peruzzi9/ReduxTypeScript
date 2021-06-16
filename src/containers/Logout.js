import { Redirect } from 'react-router-dom'
import { useEffect } from "react"

 const Logout = () => {
  useEffect(() => {
       // Logout process: Remove token from localStorage
       localStorage.removeItem('token')   
    }, [])
  
  
    return (
      <Redirect to="/login" />
    )
}
export default (Logout)