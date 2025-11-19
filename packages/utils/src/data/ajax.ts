import { getCookie } from '../dom'

export interface XhrError extends Error {
  code: number
  status?: number
  method?: string
  url?: string
}

export interface XhrOptions {
  method: 'get' | 'post'
  headers?: Record<string, any>
  data?: Record<string, any>
  file: File
  filename: string
  url: string
  onProgress?(e: any): void
  onSuccess?(e: any): void
  onError?(e: any): void
  withCredentials?: boolean
  responseType: string
}

function getBody(xhr: XMLHttpRequest) {
  const text = xhr.responseText || xhr.response
  if (!text) {
    return text
  }

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

export const ajax = function (option: XhrOptions) {
  if (typeof XMLHttpRequest === 'undefined') {
    return
  }

  const xhr = new XMLHttpRequest()
  const url = option.url

  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e: any) {
      if (e.total > 0) {
        e.percent = (e.loaded / e.total) * 100
      }
      option.onProgress?.(e)
    }
  }

  const formData = new FormData()

  if (option.data) {
    Object.keys(option.data).forEach(key => {
      formData.append(key, option.data![key])
    })
  }
  if (option.file) {
    formData.append(option.filename, option.file, option.file.name)
  }

  xhr.onerror = function error(e) {
    option.onError?.(e)
  }

  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError?.(getBody(xhr))
    }

    option.onSuccess?.(getBody(xhr))
  }

  xhr.open(option.method, url, true)

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true
  }

  const headers = option.headers || {}
  for (const item in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, item) && headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item])
    }
  }
  const csrfToken = getCookie('csrf-token')
  if (csrfToken) {
    xhr.setRequestHeader('csrf-token', csrfToken)
  }
  const secToken = window.localStorage.getItem('sec-token')
  if (secToken) {
    xhr.setRequestHeader('x-sec-token', secToken)
  }
  xhr.send(formData)
  return xhr
}
