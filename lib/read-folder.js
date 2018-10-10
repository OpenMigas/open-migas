const fs = require('fs');

module.exports = function readFolder(location, done){
	let filesArr = [];
	fs.readdir(location, function(err, files){
		if (err) return console.error(err);
		files.forEach((item, index) => {
			try {
				let stat;
				stat = fs.statSync(path.resolve(location, item));
				filesArr[index] = {name: item, stat: stat};
			} catch(err) {
				console.error(err);
				return;
			}
		});
		done(filesArr);
	});
}