import React, { useEffect, useRef, useState } from 'react'
import domain from '../../util/domain';
import './ExpertPicks.scss'
const GameLabels = () => {

  const [labels, setLabels] = useState([])

  // const num = useRef(69)

  // let date = new Date();
  // useEffect(() => {
  //   if (date.getHours() === 23 && date.getMinutes() === 36) {
  //     num.current += 1
  //   }
  // }, [])

  let num = 70;


  // fetch schedule from backend
  useEffect(() => {
    fetch(`${domain}/labels/${num}`)
      .then((res) => res.json())
      .then((data) => {
        setLabels(data);
      });
  }, []);



  return (
    <div className='label-container'>
      <div className='labels'>
        <div className='name-label'>
          <p> Player </p>
        </div>
        <div className='matchups'>
          {labels.map((item, index) => {
            const homeTeamAbbr = item.home_team_id
            const awayTeamAbbr = item.road_team_id
            return (
              <div className='label-box'>
                <p>
                  {homeTeamAbbr}
                </p>
                {item.live_home_team_score === null && (
                  <p className='score'>0</p>
                )}
                <p className='score'> {item.live_home_team_score}</p>
                {item.additional_data.Status === 'InProgress' ? (
                  <p className='live'>Live</p>
                ) : item.additional_data.Status === 'Final' ? (
                  <p className='final'>Final</p>
                ) : (
                  <p className='versus'> vs</p>
                )
                }
                {
                  item.live_road_team_score === null && (
                    <p className='score'>0</p>
                  )
                }
                < p className='score' > {item.live_road_team_score}</p>
                <p>
                  {awayTeamAbbr}
                </p>
              </div>
            );
          })}
        </div>


      </div >
    </div >
  )
}

export default GameLabels