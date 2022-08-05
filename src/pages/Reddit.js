import { useState, useEffect } from "react"

const Reddit = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:8000/redditapi')
      .then(response => {return response.json()})
      .then(data => setPosts(data))
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const fileType = (filename) => {
    const extension = filename.split('.').pop();
    
    switch(extension) {
      case 'jpg':
      case 'gif':
      case 'bmp':
      case 'png':
        return <img id='img' src={filename} alt='reddit' width="250" height="250" />
      case 'm4v':
      case 'avi':
      case 'mpg':
      case 'mp4':
        return <video id='video' width="500" height="500" controls><source src={filename} /></video> 
      case 'gifv': 
        return <video id='gif' preload="auto" autoplay="autoplay" loop="loop" style={{width: 350, height: 350}}>
        <source src={(filename).substr(0, (filename).lastIndexOf(".")) + ".mp4"} type="video/mp4"></source>
    </video>
      default:
        return <a href={filename} id='post-url'>{filename}</a>;
    }
  }

  return (
    <div>
      <h1 id="reddit-header">Top posts on Reddit: </h1>
      {posts.map(post => {
        return (
        <div className="indv-post" key={post.title}>
          <h1 id="post-title">{post.title}</h1>
          {fileType(post.url)}
        </div>);
      })}
    </div>
  )
}

export default Reddit