export function filterByLanguage(language, gists) {
	if(language.length === 0) {
		return gists;
	}
	
	let filteredGists = [];	
	//gist kerrallaan
	gists.forEach((gist) => {
		let match = false;
		
		//gistin tiedosto kerrallaan
		for(let i = 0; i < gist.files.length; i++) {
			if(gist.files[i].language) {
				
				for(let j = 0; j < language.length; j++) {
					if(gist.files[i].language.toLowerCase() === language[j].toLowerCase()) {
						match = true;
						break;
					}
				}
			}
		}
		
		if(match) {
			filteredGists.push(gist);
		}
		
	});
	
	return filteredGists;
}

