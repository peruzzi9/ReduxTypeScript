//react route
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
// sub router
import MyRoutes from "./routes"
import MyPrivateRoutes from "./routesPrivate"
import  { useEffect,useState } from "react"

import logo from './logo.svg';
import Articles from "./containers/Articles"
import ArticlesHooks from "./containers/ArticlesHooks"
import Aboutus from "./containers/Aboutus"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./components/Home"
import PrivatePage from "./containers/PrivatePage"
import Login from "./containers/Login"
import News from "./containers/News"

import './styles/main.css';
// need npm install  @material-ui/core before import MaterialUI
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import greenTheme from './themes/greenTheme';
import redTheme from './themes/redTheme';
import blueTheme from './themes/blueTheme';
import alaaTheme from './themes/alaaTheme';
import { GREEN, RED, BLUE, ALAACOLOR } from './constants/ThemeColors';

// language provider to change user interface texts language
import { IntlProvider } from 'react-intl'
import AppLocale from './lngProvider';

// for  redux state and actions / store 
import { connect } from 'react-redux';

import isAuthenticated from './util/isAuthenticated'
import Logout from "./containers/Logout";

const App = ({ Settings }) => {
  //this is come after mapStateToProps

  // check is User LoggedIn 
  // change it to true for testing logged in user 
  let [isUserLoggedIn,setLogedin]=useState(false) 

  
  useEffect( () => {
     
     async function checkAuthentication() {
        let isLogedin = await isAuthenticated(); 
        console.log("App useEffect checkAuthentication===",isLogedin)
        setLogedin(isLogedin);
     }
     checkAuthentication(); 
     
  }, [])

  console.log("App settings from  store ===", Settings)
  let { themeColor } = { themeColor: Settings.themeColor };
  let language = Settings.language;
  let isDirectionRTL = Settings.isDirectionRTL;
  document.title = language.locale == "ar" ? "مثال بالريدوكس" : "Redux Example";
  //applyTheme= createMuiTheme(alaaTheme);
  /* if (isDarkTheme) {
    applyTheme = createMuiTheme(darkTheme)
  } else { */
  let applyTheme;
  console.log("set theme template=========", themeColor)
  switch (themeColor) {
    case GREEN: {
      applyTheme = createMuiTheme(greenTheme);
      break;
    }
    case RED: {
      applyTheme = createMuiTheme(redTheme);
      break;
    }
    case ALAACOLOR: {
      applyTheme = createMuiTheme(alaaTheme);
      break;
    }
    case BLUE: {
      applyTheme = createMuiTheme(blueTheme);
      break;
    }
    default:
      {
        applyTheme = applyTheme;
      }

  }
  /* } */
  console.log("isDirectionRTL=====", isDirectionRTL)
  if (isDirectionRTL) {
    applyTheme.direction = 'rtl';
    document.body.classList.add('rtl')
  } else {
    document.body.classList.remove('rtl');
    applyTheme.direction = 'ltr';
  }

  const currentAppLocale = AppLocale[language.locale];
  return (
    <MuiThemeProvider theme={applyTheme}>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}>

        <div className="App">
          {/* Here come root route 
          to warp all components */}
          <Router>
            <div>
              {/* Header should be inside Router to make Link works */}
              <Header isUserLoggedIn={isUserLoggedIn} />
            </div>
            <header  >
              <img src={logo} className="App-logo" alt="logo" />
            </header>

            <div>
              {/* // You can use the last <Route> in a <Switch> as a kind of
                  // "fallback" route, to catch 404 errors.
                  //
                  // There are a few useful things to note about this example:
                 //
                // - A <Switch> renders the first child <Route> that matches
                // - A <Redirect> may be used to redirect old URLs to new ones
                // - A <Route path="*> always matches */}
              <Switch>
               {/*   RestrictedRoute : component for check user login state */}
               {/*  //privateapp code be any name  
                     // nested route for private
                */}
              <RestrictedRoute path={`/privateapp`} isUserLoggedIn={isUserLoggedIn} component={MyPrivateRoutes}/>
                
                <Route exact path="/">
                  <Home />
                </Route>
                {/* master routes */}
                <Route path="/aboutus" component={Aboutus} />
                <Route path="/contactus" component={Articles} />
                <Route path="/articleshooks" component={ArticlesHooks} />
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
                <Route path="/news" component={News} />
                <Route path="/privatepage"
                  render={() => {
                    if (isUserLoggedIn) {
                      return <PrivatePage />;
                    } else {
                      return <Redirect to="/login" />;
                    }
                  }} />
                <Route path="/oldarticles">
                  <Redirect to="myapp/articlesmanage" />
                </Route>
                {/* sub routes / another routes to make route easyer and simple
                     we distribute route inside many route files in the project
                     so we can update and modify easy
                 */}
                {/*  //myapproute code be any name  
                     // nested route for public
                */}
                <Route path="/myapp" component={MyRoutes} />
                <Route path="*">
                  <NoMatch />
                </Route>
              </Switch>
            </div>
          </Router>
          <div>
            <Footer />
          </div>
        </div>

      </IntlProvider>
    </MuiThemeProvider>
  )

  function NoMatch() {
    return (
      <div>
        <h3>
          404 page is not found
        </h3>
      </div>
    );
  }
}
/* 
RestrictedRoute check user if it is loggedin
if user is logged in it will be route to nested private route and there it will be routed to right place
if user is not logged in it will be redirected to login page
*/
const RestrictedRoute = ({component: Component, isUserLoggedIn, ...rest}) =>
{
  //console.log("RestrictedRoute isUserLoggedIn====",isUserLoggedIn)
  alert("RestrictedRoute / "+isUserLoggedIn)
return (<Route 
     {...rest}
        render={props =>
          isUserLoggedIn
                ? <Component {...props} />
                : <Redirect
                    to={{
                        pathname: '/login',
                        state: {from: props.location}
                    }}
                />}
    />)
  }
    ;

const mapStateToProps = statefromstore => {
  console.log("App=== Global State Store ======", statefromstore)
  const { themeColor, darkTheme } = statefromstore.theme;
  //get language from redux store
  const language = statefromstore.languageDirection.locale;
  const isDirectionRTL = statefromstore.languageDirection.isDirectionRTL;
  return { Settings: { themeColor, isDarkTheme: darkTheme, language, isDirectionRTL } }
  // very very important name returned here should be the same in  
  // function defention
  // const App = ({themeSettings}) => {
  //return themeSettings
};


/* 
 If you want the App component to re-render when the route change,
 you can use the withRouter HOC to inject route props
*/
export default connect(mapStateToProps)(App)
