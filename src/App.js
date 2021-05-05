import logo from './logo.svg';
import Articles from "./containers/Articles"
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher"
import LanguageSwitcher from "./components/LanguageSwitcher"

import './styles/main.css';
// need npm install  @material-ui/core before import MaterialUI
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import greenTheme from './themes/greenTheme';
import redTheme from './themes/redTheme';
import blueTheme from './themes/blueTheme';
import alaaTheme from './themes/alaaTheme';
import { GREEN, RED, BLUE, ALAACOLOR } from './constants/ThemeColors';

// language provider to change user interface texts language
import {IntlProvider} from 'react-intl' 
import AppLocale from './lngProvider';

// for  redux state and actions / store 
import { connect } from 'react-redux';

const App = ({Settings}) => {
//this is come after mapStateToProps
console.log("App settings from  store ===", Settings)
let { themeColor } = { themeColor: Settings.themeColor };
let  language  =  Settings.language ; 
document.title = language.locale == "ar" ? "مثال بالريدوكس": "Redux Example"; 
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

  const currentAppLocale = AppLocale[language.locale];
  return (
    <MuiThemeProvider theme={applyTheme}>
      <IntlProvider
         locale={currentAppLocale.locale}
         messages={currentAppLocale.messages}>
                         
      <div className="App">
        <div>
          {/* component for switching theme with redux store */}
          <ThemeSwitcher />
        </div>
        <div>
          <LanguageSwitcher/>
        </div>
        <header  >
          <img src={logo} className="App-logo" alt="logo" />
          <Articles />
        </header>

      </div>
 
      </IntlProvider>
    </MuiThemeProvider>
  )
}

const mapStateToProps = statefromstore => {
  console.log("App=== Global State Store ======", statefromstore)
  const { themeColor, darkTheme } = statefromstore.theme;
  //get language from redux store
  const  language  = statefromstore.languageDirection.locale;
  return { Settings: { themeColor, isDarkTheme: darkTheme ,language } }
  // very very important name returned here should be the same in  
  // function defention
  // const App = ({themeSettings}) => {
  //return themeSettings
};
export default connect(mapStateToProps)(App) 
