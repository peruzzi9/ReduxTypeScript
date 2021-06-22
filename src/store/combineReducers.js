import { combineReducers } from 'redux';

import articleReducer from "./Articles/articleReducer"
import newsReducer from "./News/newsReducer"
import themeReducer from "./Theme/themeReducer"
import languageDirectionReducer from "./LanguageDirection/languageDirectionReducer"
import authReducer from './Auth/authReducer';

export default combineReducers(
    {
        // article is name which will deal with
        // and we get it in console when we connect with global store :
        //const mapStateToProps = state => {
        // console.log("state===",state)    
        // return {
        // articles: state.article.articles,

        // articleReducer is the real name , it is the reducer with stored values
        article:articleReducer,
        news:newsReducer,
        theme:themeReducer,
        languageDirection:languageDirectionReducer,
        auth:authReducer
    });