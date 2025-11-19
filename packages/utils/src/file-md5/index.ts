import SparkMD5 from 'spark-md5';
export default (file: any) => {
	return new Promise((resolve, reject) => {
		// @ts-ignore
		let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
			chunkSize = 2097152,
			chunks = Math.ceil(file.size / chunkSize),
			currentChunk = 0,
			spark = new SparkMD5.ArrayBuffer(),
			fileReader = new FileReader();

		// 计算读取的文件的hash值
		fileReader.onload = function (e: any) {
			spark.append(e.target.result); // Append array buffer
			currentChunk++;

			if (currentChunk < chunks) {
				loadNext();
			} else {
				const hash = spark.end();
				resolve(hash);
			}
		};

		fileReader.onerror = err => {
			reject(err);
		};

		// 分片读取
		function loadNext() {
			let start = currentChunk * chunkSize,
				end = start + chunkSize >= file.size ? file.size : start + chunkSize;

			fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
		}

		loadNext();
	});
};
