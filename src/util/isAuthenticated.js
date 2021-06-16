import axios from 'axios';

export default  function isAuthenticated(){
   return new Promise((resolve, reject)=>{

      const accessToken= localStorage.getItem('token') ;
      axios.get(process.env.REACT_APP_SERVER+`/auth/whoami`,{
       headers: {
         'Authorization': `Bearer ${accessToken}`
       }
     })
      .then(res => {
        console.log("isAuthenticated====",res.data)
        console.log("isAuthenticated====",res.status)
        console.log("isAuthenticated====",(res.status == 200))
        resolve (res.status == 200)
      })
      .catch(err => {
         resolve (false);
      });

   })
   
    
  }