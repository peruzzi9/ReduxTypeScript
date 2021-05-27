interface RootState {
    languageDirection: { locale :Language } ,
    article : {
      articles: IArticle[],
      loading:  Boolean,
      error:   String
    }
  }