import React, { useState } from "react"
import { Link ,useHistory } from "react-router-dom";
import isAuthenticated from '../util/isAuthenticated'

// MaterialUi
import Button from '@material-ui/core/Button';

//change interface texts depending on language
import IntlMessages from '../util/IntlMessages';


// for  redux state and actions / store
import { connect } from "react-redux"

const Home = ({ language }) => {
  //this is come after mapStateToProps
  
  let history=useHistory();

  let back = e => {
    e.stopPropagation();
    history.goBack();
  };

  let isAuthenticat=async()=>{ 
    let result=await isAuthenticated();
     alert(result)
  }

  return (
    <div>
      <div>
        {/* this is materialui Button component  themed by MuiThemeProvider 
                   every change on theme color will effect these buttons
                */}
        <h1>You are in the home page component</h1>
        <Link className="text-link"  to="/">
          <Button variant="contained">
            <IntlMessages id="header.homepage" />
          </Button>
        </Link>
        <div>
         <button type="button" onClick={isAuthenticat}>
           Check Refresh token httponly isAuthenticated
         </button> 
        </div>
        <div>
         <button type="button" onClick={back}>
           back to last visited page using history
         </button> 
        </div>
        
      </div>
      
    </div>
  )

}

const mapStateToProps = state => {
  const language = state.languageDirection.locale;
  return {
      language: language
  }
}
export default connect(mapStateToProps)(Home)
