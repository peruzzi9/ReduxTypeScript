import React, { useState } from "react"
//import "./AddArticle.css"

// MaterialUi
import Button from '@material-ui/core/Button';

//change interface texts depending on language
import IntlMessages from '../../util/IntlMessages';

type Props={
  language : Language; 
  saveArticle : Function; 
} 
const iniArticle = {
  title : '',
  body  : '',
  id    : 0,
  userId: 0
}

const AddArticle = ({ saveArticle , language}:Props) => {
  const [article, setArticle] = useState<IArticle>(iniArticle)

  const handleArticleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticle({
      ...article,
      [e.target.id]: e.target.value,
    })
  }
  const addNewArticle = (e: React.SyntheticEvent) => {
    e.preventDefault()
    saveArticle(article)
  }

  return (
    <form onSubmit={() => addNewArticle} className="add-article">
      <input
        type="text"
        id="title"
        placeholder={language.locale=="ar"?"العنوان":"Title"}
        onChange={handleArticleData}
      />
      <input
        type="text"
        id="body"
        placeholder={language.locale=="ar"?"الموضوع":"Body"}
        onChange={handleArticleData}
      />
     {/*  <button>Add article</button> */}
     {/* note we add type="submit" to make materialui button submit form */}
     <Button variant="contained" type="submit"> <IntlMessages id="article.add" /></Button>
    </form>
  )
}
export default AddArticle