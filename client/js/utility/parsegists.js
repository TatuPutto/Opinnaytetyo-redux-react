export function parseSingleGistJson(gistJson) {
	let gist = {
		id: gistJson.id,
		description: gistJson.description,
		files: parseFilesWithSource(gistJson.files),
		owner: parseOwnerInfo(gistJson.owner),
		isPublic: gistJson.public,
		createdAtUnformatted: gistJson.created_at,
		updatedAtUnformatted: gistJson.updated_at,
		createdAt: formatTime(gistJson.created_at),
		updatedAt: formatTime(gistJson.updated_at),
		forkInfo: parseForkInfo(gistJson.fork_of),
		comments: gistJson.comments,
	};
	return gist;
}

export function parseMultipleGistsJson(gistsJson) {
	let gists = [];

	gistsJson.forEach((gist) => {
		if(gist.files != null && gist.owner != null) {
			gists.push({
				id: gist.id,
				description: gist.description,
				createdAt: formatTime(gist.created_at),
				updatedAt: formatTime(gist.updated_at),
				files: parseFiles(gist.files),
				comments: gist.comments,
				owner: parseOwnerInfo(gist.owner),
				isPublic: gist.public,
			});
		}
	});
	return gists;
}


function parseFiles(json) {
	let files = [];
	for(let key in json) {
		let singleFile = {};
		singleFile['filename'] = json[key].filename;
		singleFile['language'] = json[key].language;
		singleFile['size'] = json[key].size;
		files.push(singleFile);
	}
	return files;
}


export function parseFilesWithSource(json) {
	let files = [];
	for(let key in json) {
		let file = {};
		file['filename'] = json[key].filename;
		file['description'] = json[key].language;
		file['content'] = json[key].content;
		files.push(file);
	}
	return files;
}


function parseOwnerInfo(ownerJson) {
    if(!ownerJson) {
		return null;
	}

	let owner = {};
	owner['id'] = ownerJson.id;
	owner['login'] = ownerJson.login;
	owner['avatarUrl'] = ownerJson.avatar_url;
	return owner;
}

function parseForkInfo(forkJson) {
	if(!forkJson) {
		return null;
	}

	let fork = {};
	fork['id'] = forkJson.id;
	//fork['name'] = forkJson.files[0].filename;
	fork['owner'] = forkJson.owner.login;
	return fork;
}


function formatTime(time) {
	const date = new Date(time);
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return day + '.' + month + '.' + year;
}
