module.exports = function(remoteDialog, fileName, stat, cb){
    let dialogResponse = remoteDialog.showMessageBox({
        type: 'warning',
        buttons: ['No', 'Yes'],
        defaultId: 0,
        cancelId: 0,
        title: 'Delete file',
        message: `Are you sure you want to move this file to the Recycle Bin?\n\nName: ${fileName}`
    });

    if (cb) cb(dialogResponse);
    return dialogResponse;
}