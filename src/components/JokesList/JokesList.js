import React, { useEffect, useState } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';
import Joke from '../Joke/Joke';
import useLocalStorage from '../../hooks/useLocalStorage';
import './JokesList.css';

const JokesList = (props) => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ url, setUrl ] = useState('https://geek-jokes.sameerkumar.website/api');
	const [ jokesLS, setJokesLS ] = useLocalStorage('jokes', []);
	const [ jokesList, setJokesList ] = useState(jokesLS || []);

	const seenJokes = new Set(jokesList.map((joke) => joke.text));

	useEffect(
		() => {
			if (jokesList.length === 0) {
				getJokes();
			}
		},
		[ url, props.numJokesToGet ]
	);

	const getJokes = async () => {
		console.log(seenJokes);
		setIsLoading(true);
		try {
			let newJokes = [];
			while (newJokes.length < props.numJokesToGet) {
				const result = await axios.get(url);
				const newJoke = result.data;
				if (!seenJokes.has(newJoke)) {
					newJokes.push({ id: uuid(), text: result.data, votes: 0 });
				}
			}
			setJokesList([ ...jokesList, ...newJokes ]);
			jokesList.length !== 0 ? setJokesLS(jokesList.slice(0, 10)) : setJokesLS(newJokes);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleVote = (id, number) => {
		const updatedJokesList = jokesList.map(
			(joke) => (joke.id === id ? { ...joke, votes: joke.votes + number } : joke)
		);

		setJokesList(updatedJokesList.sort((a, b) => b.votes - a.votes));
		setJokesLS(updatedJokesList);
	};

	const handleClick = () => {
		getJokes();
	};

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
				<button className="jokesList-getMore" onClick={handleClick}>
					New Jokes
				</button>
			</div>
			<div className="jokesList-jokes">
				{isLoading && (
					<div className="jokesList-spinner">
						<i className="far fa-8x fa-laugh fa-spin" />
						<h1 className="jokesList-spinner-text">Loading...</h1>
					</div>
				)}
				{jokesList.map((joke) => (
					<Joke
						key={joke.id}
						text={joke.text}
						votes={joke.votes}
						upvote={() => handleVote(joke.id, 1)}
						downvote={() => handleVote(joke.id, -1)}
					/>
				))}
			</div>
		</div>
	);
};

export default JokesList;
