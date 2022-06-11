import React, { useContext } from 'react'
import Login from '../../Auth/Login'
import Register from '../../Auth/Register'
import UserContext from '../../context/UserContext'
import Gamebar from '../../components/gamebar/Gamebar'
import DemoLogin from '../../Auth/DemoLogin'
import './Home.scss'
import News from '../../components/news/News'
const Home = ({ setRegister, setLogin, register, login, sortedGames, videos }) => {
 const { user } = useContext(UserContext);

 return (
  <div className='homepage'>
   <Gamebar sortedGames={sortedGames} />
   {register && !user && (
    <Register setRegister={setRegister} setLogin={setLogin} />
   )}
   {login && !user && (
    <Login setLogin={setLogin} setRegister={setRegister} />
   )}
   <div className="hero">
    <h1> Pickmaster </h1>
    <p> Make your picks and compete </p>
    {!user &&
     <div className='btns'>
      <p className='register-btn' onClick={() => setRegister(true)}>
       Get started for free
      </p>
      <h2 className='mobile'>or</h2>
      <DemoLogin />
     </div>
    }
   </div>
   <div className="news-container">
    <News />
   </div>

  </div>
 )
}

export default Home