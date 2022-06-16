import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import domain from './util/domain';
import Home from './pages/home/Home';
import PicksPage from './pages/picks/PicksPage';
import Navbar from './components/navbar/Navbar';
import PoolPage from './pages/pool/PoolPage';
import UserContext from './context/UserContext';

function Router() {
	const [data, setData] = useState([]);
	const [expertPicks, setExpertPicks] = useState([]);
	const [videos, setVideos] = useState([]);

	// get todays date and pass as param in fetch request
	let today = new Date();
	let res = today.toISOString().slice(0, 10).replace(/-/g, '');
	let theDate = Number(res);
	let [date, setDate] = useState(theDate);

	// fetch schedule from backend
	useEffect(() => {
		fetch(`${domain}/schedule`)
			.then((res) => res.json())
			.then((data) => {
				setData(data.events);
			});
	}, []);

	// sort games by id
	let sortedGames = data.sort(function (a, b) {
		return a.date - b.date;
	});

	const [register, setRegister] = useState(false);
	const [login, setLogin] = useState(false);

	return (
		<BrowserRouter>
			<Navbar
				setRegister={setRegister}
				setLogin={setLogin}
				register={register}
				login={login}
			/>
			<Switch>
				<Route exact path='/'>
					<Home
						sortedGames={sortedGames}
						setRegister={setRegister}
						setLogin={setLogin}
						register={register}
						login={login}
					/>
				</Route>
				<Route exact path='/picks'>
					<PicksPage sortedGames={sortedGames} />
				</Route>
				<Route exact path='/pool'>
					<PoolPage
						item={expertPicks}
						labels={data}
						setRegister={setRegister}
						setLogin={setLogin}
						register={register}
						login={login}
					/>
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default Router;
