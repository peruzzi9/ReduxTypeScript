// store all actions names here this way
// for easy modify in the future 
// this action name will be used in two places
// final component where we call to do this action
// like here :
// const mapDispatchToProps = dispatch => {
//     return {
//       saveArticle: article =>
//         dispatch({ type: actionTypes.ADD_ARTICLE, articleData:  article  }), 
//     }
//   }
// and the second place inside reducer switch cases
// like here :
// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//       case actionTypes.ADD_ARTICLE:
//          do something here ....


export const ADD_ARTICLE = "ADD_ARTICLE"
export const CLEAR_ARTICLES = "CLEAR_ARTICLES"
export const GET_ARTICLES_STARTED = "GET_ARTICLES_STARTED"
export const GET_ARTICLES_SUCCESS = "GET_ARTICLES_SUCCESS"
export const GET_ARTICLES_FAILURE = "GET_ARTICLES_FAILURE"

export const GET_NEWS = "GET_NEWS" 
export const NEWS_RECEIVED = "NEWS_RECEIVED" 
export const NEWS_ERROR = "NEWS_ERROR"

// SYSTEM Settings action types
export const THEME_COLOR = 'theme_color';
export const DARK_THEME = 'dark_theme';

// language and direction
export const SWITCH_LANGUAGE = 'switch-language';
export const CHANGE_DIRECTION = 'change-direction';

//Auth
export const   LOG_IN_START= 'LOG_IN_START';
export const   LOG_IN_SUCCESS= 'LOG_IN_SUCCESS';
export const   LOG_IN_FAILURE= 'LOG_IN_FAILURE';
export const   REGISTER_START= 'REGISTER_START';
export const   REGISTER_SUCCESS= 'REGISTER_SUCCESS';
export const   REGISTER_FAILURE= 'REGISTER_FAILURE';
export const   LOG_OUT= 'LOG_OUT';
export const   LOG_OUT_SUCCESS='LOG_OUT_SUCCESS';