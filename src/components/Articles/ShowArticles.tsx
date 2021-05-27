import React from "react"
//import "./Article.css"

 

type Props ={
  Article:IArticle,
  language:Language
}

const article = ( {Article,language} : Props  ):JSX.Element => (
  <div className="article">
    <h1>{Article.title}</h1>
    <p>{Article.body}</p>
  </div> 
)

export default article