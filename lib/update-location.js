//updates files main view and breadcrumb bar
//callback called when user select another location
const createExplorerItem = require('./explorer-item.js');
const updateBreadcrumbLocation = require('./update-breadcrumb.js');


module.exports = function updateLocation(location, files, container, breadcrumbBar, callback){
	container.innerHTML = '';
	files.forEach(function(file){
		//explorer main view item
		let fileItem = createExplorerItem(location, file.name, file.stat, callback);
		container.appendChild(fileItem);
	});
	updateBreadcrumbLocation(location, breadcrumbBar, callback);
}