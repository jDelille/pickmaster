import React, { useEffect, useState } from 'react'
import domain from '../../util/domain';
import moment from 'moment';

import './News.scss';

const News = () => {
  const [data, setData] = useState([]);

  // get todays date and pass as param in fetch request
  let today = new Date();
  let res = today.toISOString().slice(0, 10).replace(/-/g, '');
  let theDate = Number(res);
  let [date, setDate] = useState(theDate);

  // fetch schedule from backend
  useEffect(() => {
    fetch(`${domain}/schedule/${date}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.videos);
      });
  }, [date]);

  console.log(data)




  return (
    <div className="news">
      <div className="top-bar">
        <img src="../assets/mlb-logo.svg" alt="" className='mlb-logo' />
        <h1> MLB News </h1>
      </div>
      <div className="show-news">
        {data.map((news, index) => {
          return <div className="news-card">
            <div className="img-container">

              <video src={news.links.source.HD.href} controls poster={news.posterImages.wide.href}></video>
            </div>
            <div className="text">
              <p className='publish-date'>{moment(news.lastModified).format('MMMM DD')}</p>
              <h1 className='headline'>{news.headline}</h1>
              <p className='desc'>{news.description}</p>
              <p className='source'>Source: {news.source}</p>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default News