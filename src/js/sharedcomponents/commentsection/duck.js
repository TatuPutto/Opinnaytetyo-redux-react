export function fetchComments(id) {
	const url = 'https://api.github.com/gists/' + id + '/comments';

	return (dispatch) => {
		return read(url)
			.then(checkStatus)
			.then(readJson)
			.then((data) => dispatch(receiveComments(data)))
			.catch((error) => dispatch(notify(error.message)));
	};
}


function receiveComments(comments) {
	let parsedComments = [];
	comments.forEach((comment) => {
		let commentObj = {};
		commentObj['commenter'] = comment.user.login;
		commentObj['commenterAvatarUrl'] = comment.user.avatar_url;
		commentObj['body'] = comment.body;

		parsedComments.push(commentObj);
	});

	return {type: 'RECEIVE_COMMENTS', comments: parsedComments};
}

export function createComment(id) {
	const url = 'https://api.github.com/gists/' + id + '/comments';

	const comment = {
		body: 'Test comment1',
	};

	return (dispatch) => {
		return create(url, comment)
			.then(checkStatus)
			.then(readJson)
			.then((data) => console.log(data))
			.catch((error) => dispatch(notify(error.message)));
	};
}
