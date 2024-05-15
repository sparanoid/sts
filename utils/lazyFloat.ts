export default function lazyFloat(number: number, threshold = 10, toFixed = 2) {
  if (number > threshold) {
    return Math.round(number)
  } else {
    return parseFloat(number.toFixed(toFixed))
  }
}
