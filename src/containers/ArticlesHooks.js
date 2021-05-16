import React, { useEffect, useState } from "react"

import Article from "../components/Articles/ShowArticles"
import AddArticle from "../components/Articles/AddArticle"

// MaterialUi
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
//or
//import CircularProgress from '@material-ui/core/CircularProgress';

// for  redux state and actions / store
import {useSelector, useDispatch} from 'react-redux'

import * as actionTypes from "../store/actionTypes"
import { clearAllArticles, getAllArticles } from "../store/Articles/articleAction";

//change interface texts depending on language
import IntlMessages from '../util/IntlMessages';

 
const Articles = () => {

    const  language = useSelector(state =>state.languageDirection.locale)  
    const  articles = useSelector(state =>state.article.articles)
    const  loading  = useSelector(state =>state.article.loading)
    const  error    = useSelector(state =>state.article.error) 

    const dispatch = useDispatch()
    
    const saveArticle= article =>dispatch({ type: actionTypes.ADD_ARTICLE, articleData: article })
    const clearArticles = ()=> dispatch(clearAllArticles());

  useEffect(() => dispatch(getAllArticles()), [])

  return (<div>
    <div><IntlMessages id="article.addtitle" /></div>
    <AddArticle saveArticle={saveArticle} language={language} />
    <div>  <h1>{loading?"Loading ... ":""}</h1>
               {loading?<CircularProgress color="secondary" /> :""}
               <h1>{error}</h1>
        <IntlMessages id="article.allarticletitle" />
    </div>
    {articles.map(article => (
      <Article key={article.id} article={article} language={language} />

    ))}
    <Button variant="contained" color="primary" onClick={clearArticles} ><IntlMessages id="article.clearall" /></Button>
   
  </div>
  )
} 
export default  Articles

/*
*/