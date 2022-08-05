import { useState, useEffect } from "react"

const Twitter = () => {
  const [trends, setTrends] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:8000/s')
      .then(response => {return response.json()})
      .then(data => setTrends(data))
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <h3 className="twitter-header">Top worldwide trends on Twitter: </h3>
      <div className="tweets">
        {trends.map(trend => {
          return (
          <div className="indv-trend" key={trend.name}>
            <a href={trend.url} id='trend-url'>{trend.name}</a>
          </div>);
        })}
      </div>
    </div>
  )
}

export default Twitter