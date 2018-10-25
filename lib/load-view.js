const path = require('path');
const updateLocation = require('./update-location.js');
const readFolder = require('./read-folder.js');

module.exports = function loadView(fullname, history, container, breadcrumbBar, loaded){
	readFolder(fullname, (childFiles) => {
		let childElements = [];
		childFiles.forEach((item, index) => {
			if (item.stat.isDirectory()){
				childElements[index] = {
					name: item.name,
					fullname: path.resolve(fullname, item.name),
					children: []
				};
			}
		});
		updateLocation(fullname, childFiles, container, breadcrumbBar, (gotoLocation) => {
			//go to another location
			loadView(gotoLocation, history, container, breadcrumbBar, function(){
				history.add(gotoLocation);
				console.log(history.getHistoryPath());
			});
		});
		loaded(childElements);
	});
}