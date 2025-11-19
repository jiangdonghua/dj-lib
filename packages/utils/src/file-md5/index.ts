import SparkMD5 from 'spark-md5'
export default (file: any) => {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
    const chunkSize = 2097152
    const chunks = Math.ceil(file.size / chunkSize)
    let currentChunk = 0
    const spark = new SparkMD5.ArrayBuffer()
    const fileReader = new FileReader()

    // 计算读取的文件的hash值
    fileReader.onload = function (e: any) {
      spark.append(e.target.result) // Append array buffer
      currentChunk++

      if (currentChunk < chunks) {
        loadNext()
      } else {
        const hash = spark.end()
        resolve(hash)
      }
    }

    fileReader.onerror = err => {
      reject(err)
    }

    // 分片读取
    function loadNext() {
      const start = currentChunk * chunkSize
      const end = start + chunkSize >= file.size ? file.size : start + chunkSize

      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
    }

    loadNext()
  })
}
