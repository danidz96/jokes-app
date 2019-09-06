import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JokesList = (props) => {
	// const [ joke, setJoke ] = useState('');
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
						jokesList.push(result.data);
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
		<React.Fragment>
			<h1>Geek Jokes</h1>
			{jokesList.map((joke, index) => <p key={index}>{joke}</p>)}
		</React.Fragment>
	);
};

export default JokesList;
