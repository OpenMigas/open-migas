const updateLocation = require('./update-location.js');

module.exports = function createFolderContextMenu(folderFullname, stat, rename, open, del){
	return [
		{
			label: 'Open',
			click: () => {open()}
		},
		{
			label: 'Open in terminal',
			click: () => {
				spawn(path.resolve(__dirname, '../', 'bin', 'open-terminal.cmd'), [folderFullname]);
			}
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
			label: 'Paste',
			accelerator: 'Ctrl+V',
			click: () => {console.log('paste')}
		},
		{
			type: 'separator'
		},
		{
			label: 'rename',
			click: () => {rename()}
		},
		{
			label: 'Delete',
			accelerator: 'Delete',
			click: () => {
				deleteConfirmationDialog(dialog, folderFullname, stat, (res) => {
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