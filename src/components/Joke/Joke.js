import React from 'react';
import './Joke.css';

const Joke = (props) => {
	return (
		<div className="joke">
			<div className="joke-buttons">
				<i className="fas fa-arrow-up" onClick={props.upvote} />
				<span className="joke-votes">{props.votes}</span>
				<i className="fas fa-arrow-down" onClick={props.downvote} />
			</div>
			<div className="joke-text">{props.text}</div>
			<div className="joke-smiley">
				<i className="em em-rolling_on_the_floor_laughing" />
			</div>
		</div>
	);
};

export default Joke;
