//breadcrumb bar location
module.exports = function updateBreadcrumbLocation(location, breadcrumbBar, callback){
	let splitLocation = location.split(path.sep);

	//remove empty string
	if (splitLocation[splitLocation.length - 1] === '') splitLocation.splice(-1, 1);
	//clear bar
	breadcrumbBar.innerHTML = '';

	splitLocation.forEach(function(item, index){
		let locationSubfolder = document.createElement('span');
		locationSubfolder.setAttribute('class', 'location-element');

		locationSubfolder.innerHTML = item;

		//get current iteration location
		let locationSliced = splitLocation.slice(0, index + 1);
		let itemLocation = locationSliced.join(path.sep);
		if (itemLocation[itemLocation.length - 1] === ':') itemLocation += path.sep;

		locationSubfolder.addEventListener('click', function(e){
			e.stopPropagation();
			callback(itemLocation);
		});

		breadcrumbBar.appendChild(locationSubfolder);

		//add a separator
		if (index < splitLocation.length - 1){
			let itemSeparator = document.createElement('span');
			itemSeparator.setAttribute('class', 'location-separator');
			itemSeparator.innerHTML = '<i class="icon-right-open"></i>';
			breadcrumbBar.appendChild(itemSeparator);
		}
	});
}