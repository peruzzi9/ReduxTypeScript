import React, { useState } from "react"
import { Link, withRouter } from "react-router-dom";
/* if you want that your component receive RouterProps(history,location,history.push  ....),
 but don't want to wrap it in <Route component={Some}>.
  You can just use withRouter function to connect component
   to the router, without additional manipulations 
   or jsx tags wrapping. You can just "export default withRouter(component)" 
   
   Header here is shered component used every where and it is not called/warped 
   as <Route path="/header"  component={Header}>
   so we use  withRouter to give it access to Route props (history,location,history.push  ....)*/
import ThemeSwitcher from "./ThemeSwitcher/ThemeSwitcher"
import LanguageSwitcher from "./LanguageSwitcher"

// MaterialUi
import Button from '@material-ui/core/Button';

//change interface texts depending on language
import IntlMessages from '../util/IntlMessages';
// for  redux state and actions / store
import {useSelector} from 'react-redux'

import '../styles/main.css';

const Header = () => { 

  // for Auth status
  const auth = useSelector((state) => state.auth);
 
  return (
    <div>
      <div>
        {/* this is materialui Button component  themed by MuiThemeProvider 
                   every change on theme color will effect these buttons
                */}
        <Link className="text-link"  to="/">
          <Button variant="contained">
            <IntlMessages id="header.homepage" />
          </Button>
        </Link>
        <Link className="text-link"  to="/myapp/articlesmanage">
          <Button variant="contained" color="primary">
            <IntlMessages id="article.allarticletitle" />
          </Button>
        </Link>
        <Link className="text-link"  to="/privateapp/articles">
          <Button variant="contained" color="secondary">
            Private<IntlMessages id="article.allarticletitle" />
          </Button>
        </Link>
        <Link className="text-link"  to="/myapp/products">
          <Button variant="contained" color="primary">
            <IntlMessages id="header.products" />
          </Button>
        </Link>
        <Link className="text-link"  to="/aboutus">
          <Button variant="contained" color="secondary">
            <IntlMessages id="header.aboutus" />
          </Button>
        </Link>
        <Link className="text-link"  to="/news">
          <Button variant="contained" color="secondary">
            <IntlMessages id="header.news" />
          </Button>
        </Link>
        <Button variant="contained" color="primary">
          <Link className="text-link"  to="/oldarticles"><IntlMessages id="article.oldariclelink" /></Link>
        </Button>
        <Button variant="contained" color="secondary">
          <Link className="text-link"  to="/also/will/not/match"><IntlMessages id="test.anylink" /></Link>
        </Button>
        <Link className="text-link"  to="/privatepage">
          <Button variant="contained" color="primary">
            Private Page
          </Button>
        </Link>





        <Button variant="contained" disabled>
          <IntlMessages id="header.contactus" />
        </Button> 
        {auth.currentUser ? 
              <Button variant="contained"   href="/logout">
               <IntlMessages id="header.logout" />
              </Button>
              : 
              <Button variant="contained"   href="/login">
               <IntlMessages id="header.login" />
              </Button>
            }
      </div>
      <div>
        {/* component for switching theme with redux store */}
        <ThemeSwitcher />
      </div>
      <div>
        <LanguageSwitcher />
      </div>
    </div>
  )

}


export default withRouter(Header)
