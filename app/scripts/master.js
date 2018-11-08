const remote = require('electron').remote;
const fs = require('fs');
const path = require('path');
const exec = require('child_process').execFile;
const spawn = require('child_process').spawn;
const {Menu, MenuItem, dialog} = remote;
const trash = require('trash');
const deleteConfirmationDialog = require('../view/delete-dialog.js');
const vdom = require('virtual-dom');
const hyperx = require('hyperx');
const hx = hyperx(vdom.h);

const History = require('../lib/history.js');
const createFileContextMenu = require('../lib/file-ctx-menu.js');
const createFolderContextMenu = require('../lib/folder-ctx-menu.js');
const createExplorerItem = require('../lib/explorer-item.js');

const loadView = require('../lib/load-view.js');

var selected = new Selected('file-selected');

function init(){
	var win = remote.getCurrentWindow();
	let history = new History();
	let explorerDOMElement = document.querySelector('#explorer-container');
	let breadcrumbBar = document.querySelector('#breadcrumb-bar');

	window.addEventListener('contextmenu', (e) => {
		e.preventDefault();
	});

	document.querySelector('#close-button').addEventListener('click', function(e){
		win.close();
	});

	document.querySelector("#maximize-button").addEventListener("click", function(e){
		if(win.isMaximized()){
			win.unmaximize();
		}else{
			win.maximize();
		}
	});

	document.querySelector("#minimize-button").addEventListener("click", function(e){
		win.minimize();
	});

	const root = {
		name: 'My Computer',
		fullname: null,
		children: []
	};

	const tree = require('electron-tree-view')({
		root,
		container: document.querySelector('#folder-tree'),
		children: c => c.children,
		label: c => c.name,
		renderItem: (hx, data, children, loadHook, clickElem, createChild) => {
			return hx`<div class="" loaded=${loadHook}>
				<a href="#" class="clickable-elem" onclick=${clickElem}>
				<div>
					<span>${hx`<i class="icon-right-open chevron" />`} ${data.name}</span>
				</div>
				</a>
				<ul>
					${children.map(createChild)}
				</ul>
			</div>`
		}
	});

	tree.on('selected', function(ele){
		loadView(ele.fullname, history, explorerDOMElement, breadcrumbBar, (childElements) => {
			ele.children = childElements;
			history.add(ele.fullname);
			tree.loop.update({root});
		});
	});

	document.querySelector('#back').addEventListener('click', function(){
		history.goBack();
		loadView(history.getCurrentLocation(), history, explorerDOMElement, breadcrumbBar, function(){});
	});

	document.querySelector('#forward').addEventListener('click', function(){
		history.goForward();
		loadView(history.getCurrentLocation(), history, explorerDOMElement, breadcrumbBar, function(){});
	});

	document.querySelector('#up').addEventListener('click', function(){
		history.goUp();
		loadView(history.getCurrentLocation(), history, explorerDOMElement, breadcrumbBar, function(){});
	});

	document.querySelector('#reload').addEventListener('click', function(){
		loadView(history.getCurrentLocation(), history, explorerDOMElement, breadcrumbBar, function(childElements){
			tree.loop.update({root});
		});
	});

	win.on('resize', function(){
		if (win.isMaximized()){
			document.querySelector('#maximize-button').innerHTML = '<i class="icon-window-restore"></i>';
			document.querySelector('body').style.border = 'none';
		} else {
			document.querySelector('#maximize-button').innerHTML = '<i class="icon-window-maximize"></i>';
			document.querySelector('body').style.border = 'solid 5px #000';
		}
	});
}

function Selected(className){
	var elements = [];

	this.add = function(ele){
		elements.push(ele);
		ele.classList.add(className);
	}

	this.remove = function(ele){
		let index = elements.indexOf(ele);
		if (index >= 0){
			ele.classList.remove(className);
			elements.splice(index, 1);
		}
	}

	this.clearAll = function(){
		elements.forEach(function(el){
			el.classList.remove(className);
		});
		elements = [];
	}

	this.clearAndAdd = function(ele){
		this.clearAll();
		this.add(ele);
	}

	this.isSelected = function(ele){
		if(elements.indexOf(ele) >= 0) return true;
	}

	this.getSelectedElements = function(){
		return elements;
	}
}

document.onreadystatechange = function(){
	if (document.readyState === 'complete'){
		init();
	}
}