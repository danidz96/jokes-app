import React, { useEffect, useState } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';
import Joke from '../Joke/Joke';
import './JokesList.css';

const JokesList = (props) => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ url, setUrl ] = useState('https://geek-jokes.sameerkumar.website/api');
	const [ jokesList, setJokesList ] = useState([]);

	useEffect(
		() => {
			const fetchData = async () => {
				setIsLoading(true);

				try {
					let jokesList = [];
					while (jokesList.length < props.numJokesToGet) {
						const result = await axios.get(url);
						jokesList.push({ id: uuid(), text: result.data, votes: 0 });
					}
					setJokesList(jokesList);
					setIsLoading(false);
				} catch (error) {
					console.log(error);
				}
			};

			fetchData();
		},
		[ url, props.numJokesToGet ]
	);

	return (
		<div className="jokesList">
			<div className="jokesList-sidebar">
				<h1 className="jokesList-title">
					<span>Geek</span> Jokes
				</h1>
				<img
					src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
					alt="Smiley Face"
				/>
				<button className="jokesList-getMore">New Jokes</button>
			</div>
			<div className="jokesList-jokes">
				{jokesList.map((joke) => <Joke key={joke.id} text={joke.text} votes={joke.votes} />)}
			</div>
		</div>
	);
};

export default JokesList;
