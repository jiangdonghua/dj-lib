/**
 * @description 转换promise请求
 * @param promise
 * @param errorContext
 * @returns
 */
export const to = async <T, U = Error>(promise: Promise<T>, errorContext = {}): Promise<[U, undefined] | [null, T]> => {
  try {
    const data = await promise
    const result: [null, T] = [null, data]
    return result
  } catch (err: any) {
    const result: [U, undefined] = [Object.assign({}, err, errorContext), undefined]
    return result
  }
}
