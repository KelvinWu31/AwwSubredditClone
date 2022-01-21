import React, {useState, useEffect} from "react";

import Article from './components/Article';

function App() {
  const [articles, setArticles] = useState([]);
  const [subreddit, setSubreddit] = useState('Aww');
  const [loading, setLoading] = useState(true);

 /* const handleScroll = (event) => {
    const {scrollTop, clientHeight, scrollHeight} = event.currentTarget; 
    
    if(scrollHeight - scrollTop === clientHeight){ 
      setArticles(prev => prev + 1)
    }
  }  I ran into a issue here trying to implement the infinite scroll into useEffect, 
        I believe there may be 2 issues that I am currently running into: 
         - the api link that i am currently calling from doesn't accept page numbers to receive more data
         - I am not too sure the proper way to implement pages with what I have so far. 
    */

  useEffect(() => { 
    fetch("https://www.reddit.com/r/aww.json?limit=25").then(res =>{
      // fetches json data from r/Aww and checking the status for Error.
      if(res.status != 200){ 
        console.log("Error");
        return;
      }

      res.json().then(data => {
        if(data != null){ 
          // console.log(data); 
          setLoading(true);
          setArticles(data.data.children);
        }
      });
    })
  }, [subreddit]);

  return ( 
    <div className="App">
      <header className="App-header">
        <h1> R/Aww </h1>
        <h2>A subreddit for cute and cuddly pictures</h2>
      </header>
      <div className="articles"  /*onScroll={handleScroll}*/>
        {
        (articles != null) ? articles.map((article, index) => <Article  key={index} article ={article.data} />) : ''
        }
      </div>
    </div>
  );
}

export default App;
