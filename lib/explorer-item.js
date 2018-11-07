module.exports = function createExplorerItem(location, name, stat, gotoLocation){
	var ele = document.createElement('li');
	let fullname = path.resolve(location, name);
	ele.innerHTML = name;

	let rename = function(){
		let input = document.createElement('input');
		let prevContent = ele.innerHTML;

		input.setAttribute('type', 'text');
		input.classList.add('rename-input');
		ele.innerHTML = '';
		ele.appendChild(input);
		input.focus();

		let execRename = function(nameToSet){
			console.log('name changed');
			console.log(path.resolve(__dirname, '../', 'bin', 'rename.cmd'), fullname, path.resolve(location, nameToSet));
			spawn(path.resolve(__dirname, '../', 'bin', 'rename.cmd'), [fullname, nameToSet]);
			ele.innerHTML = prevContent;
			ele.querySelector('.item-name').innerHTML = nameToSet;
		}

		let blurHandler = function(e){
			execRename(input.value);
		}

		input.addEventListener('blur', blurHandler);
		input.addEventListener('keyup', function(e){
			if (e.keyCode === 13) this.blur();
		});
	}

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
			let template = createFileContextMenu(fullname, stat, rename, open);
			const menu = Menu.buildFromTemplate(template);
			menu.popup({window: remote.getCurrentWindow()});
		});

		ele.innerHTML = `<i class="icon-doc element-item-icon file-icon"></i><span class="item-name">${name}</span>`;
	} else if (stat.isDirectory()){
		ele.addEventListener('dblclick', function(){
			gotoLocation(fullname);
		});

		ele.addEventListener('contextmenu', function(e){
			let template = createFolderContextMenu(fullname, stat, rename, () => gotoLocation(fullname));
			const menu = Menu.buildFromTemplate(template);
			menu.popup({window: remote.getCurrentWindow()});
		});
		ele.innerHTML = `<i class="icon-folder-open element-item-icon folder-icon"></i><span class="item-name">${name}</span>`;
	}

	return ele;
}