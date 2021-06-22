import { Redirect } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { logOut } from '../store/Auth/authAction';

 const Logout = () => { 

  const dispatch = useDispatch();
   dispatch(logOut())
    return (
      <Redirect to="/" />
    )
}
export default (Logout)