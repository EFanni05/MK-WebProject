export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}

<iframe src="https://docs.google.com/forms/d/e/1FAIpQLScgabUkRZxMRG8V5-8sdOI5YPbkwtVKDzUuHtldg-YAluLBew/viewform?embedded=true" width="640" height="386" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
