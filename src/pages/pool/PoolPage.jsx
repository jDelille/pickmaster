import React, { useContext, useEffect, useState, useRef } from 'react'
import domain from '../../util/domain';
import ExpertPicks from './ExpertPicks';
import '../../styles/Pages.scss'
import GameLabels from './GameLabels';
import UserPicks from './UserPicks';
import axios from 'axios';
import Register from '../../Auth/Register';
import Login from '../../Auth/Login';
import UserContext from '../../context/UserContext';

const PoolPage = ({ labels, setRegister, setLogin, register, login }) => {
  const [expertPicks, setExpertPicks] = useState([])
  const [poolData, setPoolData] = useState([])

  const { user } = useContext(UserContext);





  // set the day to use as a param in fetch

  const num = useRef(71)

  // // change the number once a day

  let date = new Date();
  useEffect(() => {
    if (date.getHours() === 23 && date.getMinutes() === 36) {
      num.current += 1
    }
  }, [])

  // fetch expert picks from backend
  // check for date change (implement later)
  useEffect(() => {
    fetch(`${domain}/expert-picks/${num.current}`)
      .then((res) => res.json())
      .then((data) => {
        setExpertPicks(data.picks);
      });
  }, []);

  async function getAllPicks() {
    let data = await axios.get(`${domain}/pool/`);
    setPoolData(data.data);
  }

  useEffect(() => {
    getAllPicks();
  }, []);

  // delete picks once every day
  useEffect(() => {
    setInterval(function () {
      let date = new Date();
      if (date.getHours() === 22 && date.getMinutes() === 41) {
        axios.delete(`${domain}/picks/`);
      }
    }, 1000);
  }, []);



  return (
    <div className='page'>
      <GameLabels labels={labels} />
      {poolData.map((item, index) => {
        return <UserPicks item={item} labels={labels} />;
      })}
      {expertPicks.map((item, i) => {
        return <ExpertPicks item={item} key={i} labels={labels} />;
      })}
      {register && !user && (
        <Register setRegister={setRegister} setLogin={setLogin} />
      )}
      {login && !user && (
        <Login setLogin={setLogin} setRegister={setRegister} />
      )}
    </div>
  )
}

export default PoolPage