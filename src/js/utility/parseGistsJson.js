export function parseSingleGistJson(gistJson) {
	let gist = Object.assign({}, gistJson, {
		viewUrl: '/gist/' + gistJson.id,
		editUrl: '/edit/' + gistJson.id,
		deleteUrl: '/delete/' + gistJson.id,
		files: parseFilesWithSource(gistJson.files),
		formattedTime: formatTime(gistJson.updated_at)
	});

	return gist;
}

export function parseMultipleGistsJson(gistsJson) {
	let gists = [];
	
	gistsJson.forEach(gist => {
		gists.push(Object.assign({}, gist, {
			viewUrl: '/gist/' + gist.id,
			files: parseFiles(gist.files),
			formattedTime: formatTime(gist.updated_at)
		}));
	})
	
	return gists;
}


export function parseFiles(json) {
	var files = [];
	
	for (var key in json) {
		var singleFile = {};
		singleFile['filename'] = json[key].filename;
		singleFile['language'] = json[key].language;
	
		files.push(singleFile);
	}
	
	return files;
}


export function parseFilesWithSource(json) {
	var files = [];
	
	for (var key in json) {
		var singleFile = {};
		singleFile['filename'] = json[key].filename;
		singleFile['description'] = json[key].language;
		singleFile['content'] = json[key].content;
		
		files.push(singleFile);
	}
	
	return files;
}


function formatTime(time) {
	var date = new Date(time);
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	var hours = date.getHours();
	var minutes = date.getMinutes(); 
	
	return day + '.' + month + '.' + year + 
			', ' + hours + ':' + minutes;
}

