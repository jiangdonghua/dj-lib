export const restrictToBounds = (value: number, min: number, max: number) => {
  if (min !== null && value < min) {
    return min
  }
  if (max !== null && max < value) {
    return max
  }
  return value
}
