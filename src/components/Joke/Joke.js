import React from 'react';

const Joke = (props) => {
	return (
		<div className="joke">
			<div className="joke-buttons">
				<i className="fas fa-arrow-up" onClick={props.upvote} />
				<span>{props.votes}</span>
				<i className="fas fa-arrow-down" onClick={props.downvote} />
			</div>
			<div className="joke-text">{props.text}</div>
		</div>
	);
};

export default Joke;
