/**
 * urlToBase64
 * @description url转base64
 * @param {String} url
 * @returns {Promise} base64Data
 */
export const urlToBase64 = (url: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			canvas.width = img.width;
			canvas.height = img.height;
			ctx!.drawImage(img, 0, 0);
			const data = canvas.toDataURL();
			resolve(data);
		};
		img.onerror = err => {
			reject(err);
		};
		img.setAttribute('crossOrigin', 'Anonymous');
		img.src = url;
	});
};

/**
 * blobToBase64
 * @description Blob转base64
 * @param {File} blob
 * @returns {Promise} base64Data
 */
export const blobToBase64 = (blob: File): Promise<any> => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.onload = e => {
			resolve(e.target?.result);
		};
		fileReader.onerror = err => {
			reject(err);
		};
		fileReader.readAsDataURL(blob);
	});
};

/**
 * blobToUrl
 * @description blob转url
 * @param {File} blob
 * @returns {String} localUrl
 */
export const blobToUrl = (blob: File): string => {
	return window.URL.createObjectURL(blob);
};

/**
 * fileToBase64
 * @description file转base64
 * @param {File} file 目标文件
 * @returns {Promise} base64Data
 */
export const fileToBase64 = async (file: File): Promise<any> => {
	const url = blobToUrl(file);
	const base64Data = await urlToBase64(url);
	return base64Data;
};

/**
 * checkFileFormats
 * @description 文件格式校验
 * @param {File} file
 * @param {String | Array} formats
 * @returns {Boolean}
 */
export const checkFileFormats = (file: File, formats: string | string[] = []): boolean => {
	if (typeof formats === 'string') {
		return formats === file.type;
	}
	return formats.includes(file.type);
};

/**
 * checkFileSize
 * @description 文件大小校验
 * @param {File} file
 * @param {number} size
 */
export const checkFileSize = (file: File, size: number) => {
	return file.size / 1024 / 1024 < size;
};

/**
 * compressImage
 * @description 图片压缩
 * @param {String} imgData
 * @param {number} width
 * @param {number} height
 * @param {String} outputType
 */
export const compressImage = (imgData: string, width: number, height: number, outputType = 'png') => {
	return new Promise(resolve => {
		const img = new Image();
		img.onload = () => {
			const realWidth = img.width;
			const realHeight = img.height;
			if (realWidth < width || realHeight < height) {
				resolve(imgData);
				return;
			}
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			canvas.width = width;
			canvas.height = height;
			ctx!.drawImage(img, 0, 0, width, height);
			imgData = canvas.toDataURL(`image/${outputType}`);
			resolve(imgData);
		};
		img.onerror = () => {
			resolve(imgData);
		};
		img.src = imgData;
	});
};

/**
 * base64ToFile
 * @description base64转file
 * @param {String} base64Data
 * @param {String} filename
 * @returns {File} filename
 */
export const base64ToFile = (base64Data: string, filename: string = 'file'): File => {
	const arr: any = base64Data.split(',');
	const mime = arr[0].match(/:(.*?);/)[1];
	const bstr = window.atob(arr[1]);
	const u8arr = new Uint8Array();
	let length = bstr.length;
	while (length--) {
		u8arr[length] = bstr.charCodeAt(length);
	}
	return new File([u8arr], filename, { type: mime });
};
