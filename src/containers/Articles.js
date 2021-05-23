import React, { useEffect, useState } from "react"

import Article from "../components/Articles/ShowArticles"
import AddArticle from "../components/Articles/AddArticle"

// MaterialUi
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
//or
//import CircularProgress from '@material-ui/core/CircularProgress';

// for  redux state and actions / store
import { connect } from "react-redux"
import * as actionTypes from "../store/actionTypes"
import { clearAllArticles, getAllArticles } from "../store/Articles/articleAction";

//change interface texts depending on language
import IntlMessages from '../util/IntlMessages';

//************** articles defintion before redux *********** */
// const Articles = () => {
//     const [articles, setArticles] = useState([
//       { id: 1, title: "post 1", body: "Quisque cursus, metus vitae pharetra" },
//       { id: 2, title: "post 2", body: "Quisque cursus, metus vitae pharetra" },
//     ])
//     const saveArticle = e => {
//       e.preventDefault()
//       // the logic will be updated later
//     }


// for use with redux we replaced this :

// this is defintion for redux to get global state without implementing actions yet
// const Articles = ({ articles }) => {
//   const saveArticle = e => {
//     e.preventDefault()
//     // the logic will be updated later
//   }
//
// with this defintion
// note : that this is the final defintion for redux fanctional component connected with 
// redux store to get global state of articles
// using mapStateToProps

// and use redux store action/reducer to execute update/add/delete on articles
// saveArticle new defintion using 
// mapDispatchToProps

const Articles = (
  { articles,loading,error, language, saveArticle, clearAllArticles, getAllArticles }) => {

  useEffect(() => getAllArticles(), [])

  return (<div>
    <div><IntlMessages id="article.addtitle" /></div>
    <AddArticle saveArticle={saveArticle} language={language} />
    <div>  <h1>{loading?"Loading ... ":""}</h1>
               {loading?<CircularProgress color="secondary" /> :""}
               <h1>{error}</h1>
        <IntlMessages id="article.allarticletitle" />
    </div>
    {articles.map(article => (
      <Article key={article.id} Article={article} language={language} />

    ))}
    <Button variant="contained" color="primary" onClick={clearAllArticles} ><IntlMessages id="article.clearall" /></Button>
    {/* or */}
    {/* <button onClick={() => clearAllArticles()} >Clear all articles </button> */}
  </div>
  )
}
// get and connect with global state which is stored in redux store
// mapStateToProps – this function determines which data is injected into the Articles display component.
// here this data is articles

// state is the store 
// it can be {articles} when store is one reducer without combine
// and it can be {article,theme,auth} when we store is combine of many reducers
// article here is object contain  articles 
const mapStateToProps = state => {
  console.log("Articles=== Global State Store===", state)
  //get language from redux store
  const language = state.languageDirection.locale;
  return {
    // very very important name returned here should be the same in  
    // function defention
    // const Articles = ({ articles, saveArticle, clearAllArticles }) => (

    articles: state.article.articles,
    loading : state.article.loading,
    error   : state.article.error,
    /* when we defined reducer inside redux store
   state= {
  articles: [
    { id: 1, title: "post 1", body: "Quisque cursus, metus vitae pharetra" },
    { id: 2, title: "post 2", body: "Quisque cursus, metus vitae pharetra" },
  ],
}
    */
    language: language
  }
}

//update store with action and new data
const mapDispatchToProps = dispatch => {
  //all actions inside return
  return {
    // defintion for first action may used
    saveArticle: article =>
      dispatch({ type: actionTypes.ADD_ARTICLE, articleData: article })
    // note here direct call to reducer
    //action = { type: actionTypes.ADD_ARTICLE, articleData: { article } }
    //action is an object of minimum two properties 
    // type : is the real action
    // payload : data to be added/deleted/edited ....

    // defintion for second action may used
    // update store clear data
    // note here is not direct call to reducer
    // we call reducer through action.js file defintions and functions
    , clearAllArticles: () => dispatch(clearAllArticles())
    , getAllArticles: () => dispatch(getAllArticles())
  }
}




export default connect(
  mapStateToProps,//connect/get states/all component states from global redux store
  mapDispatchToProps,//connect/send actions/all component actions and data to redux store
)(Articles)

/*
Here, we first import connect(), a function that returns a higher-order function
and receive as input a component. It helps us to connect our component
to the store and give access to get the state.

Then, we declare a new function named mapStateToProps()
(you can name it whatever you like).
It's used to get our state from the redux store.
The function receives as parameter the state stored in redux
and returns a JavaScript object that will hold our articles.

And to reach the store, we need to pass mapStateToProps()
to the connect function. It will take our component Articles
and return a wrapper component with the props it injects.
That means we can now get our state from the store.
The state is received by the component through
props, we can still show the articles as before but now through redux.

We've successfully connected our store to react and get
our state from it. Now, let's dive into actions
*/