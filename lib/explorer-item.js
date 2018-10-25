module.exports = function createExplorerItem(location, name, stat, gotoLocation){
	var ele = document.createElement('span');
	let fullname = path.resolve(location, name);
	ele.innerHTML = name;

	if (stat.isFile()){
		let open = function(){
			let child = exec('explorer', [fullname], (err, stdout, stderr) => {
				if (err){
					console.error(err);
				}
			});
		}

		ele.addEventListener('dblclick', function(e){
			open();
		});

		ele.addEventListener('contextmenu', function(e){
			let template = createFileContextMenu(fullname, stat, open);
			const menu = Menu.buildFromTemplate(template);
			menu.popup({window: remote.getCurrentWindow()});
		});
		ele.innerHTML = '<i class="icon-doc element-item-icon file-icon"></i>' + name;
	} else if (stat.isDirectory()){
		ele.addEventListener('dblclick', function(){
			gotoLocation(fullname);
		});

		ele.addEventListener('contextmenu', function(e){
			let template = createFolderContextMenu(fullname, stat, () => gotoLocation(fullname));
			const menu = Menu.buildFromTemplate(template);
			menu.popup({window: remote.getCurrentWindow()});
		});
		ele.innerHTML = '<i class="icon-folder-open element-item-icon folder-icon"></i>' + name;
	}

	return ele;
}