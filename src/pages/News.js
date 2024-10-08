import {useState, useEffect} from 'react';

const News = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:3000/newsarticles')
      .then(response => {return response.json()})
      .then(data => setArticles(data))
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false)
      })
  }, []) 


  return (
    <div>
      <h1 id='news-header'>Top WorldWide News: </h1>
      {articles.map(article => {
        return (
        <div className="indv-article" key={article.title}>
          <h1 id="article-title">{article.title}</h1>
          <a href={article.url} id='article-url'>{article.url}</a>
        </div>);
      })}
    </div>
  )
}

export default News