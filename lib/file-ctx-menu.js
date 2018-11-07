//const updateLocation = require('./updateLocation.js');

module.exports = function createFileContextMenu(fileFullname, stat, rename, open, del){
	return [
		{
			label: 'Open',
			click: () => {open()}
		},
		{
			type: 'separator'
		},
		{
			label: 'Cut',
			accelerator: 'Ctrl+X',
			click: () => {console.log('cut')}
		},
		{
			label: 'Copy',
			accelerator: 'Ctrl+C',
			click: () => {console.log('copy')}
		},
		{
			label: 'Rename',
			click: rename
		},
		{
			label: 'Delete',
			accelerator: 'Delete',
			click: () => {
				deleteConfirmationDialog(dialog, fileFullname, stat, (res) => {
					console.log(res);
					/*	trash([fileName]).then(() => {
							updateLocation(explorerPath);
							console.log('done');
						});*/
				});
			}
		}
	];
}