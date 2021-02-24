const path = require('path')
const fs = require('fs').promises

var filePath = path.resolve('./')
scanFile(filePath)
async function scanFile(filePath){
	//根据文件路径读取文件，返回文件列表
	const files = await fs.readdir(filePath)
	for (const filename of files) {
		//获取当前文件的绝对路径
		var filedir = path.join(filePath, filename);
		//根据文件路径获取文件信息，返回一个fs.Stats对象
		const stats = await fs.lstat(filedir)
		var isFile = stats.isFile();//是文件
		var isDir = stats.isDirectory();//是文件夹
		if(isFile){
			if (filename.includes('snapshot')) {
				const newPath = path.join(filePath, 'snapshot.png')
				await fs.rename(filedir, newPath)

				// const content = await fs.readFile(filedir)
				// if (!content.includes('export')) {
				// 	console.log(filedir)
				// }
			}
		}
		if(isDir){
			scanFile(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
		}
	}
}
