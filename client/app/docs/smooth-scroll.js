/* @flow */

var time = 0
export function smoothScrollTo(name: string) {
  var el = document.getElementById(name)
  window.requestAnimationFrame(function () {
    time = Date.now()
    animate(window.pageYOffset, el.offsetTop - 20, 0, 500)
  })
}

function animate(curHeight, desiredHeight, dTime, totalTime) {
  var newTime = Date.now()
  var dt = newTime - time
  time = newTime
  var TIME = dTime + dt
  var y = easeInOutQuad(TIME, 0, desiredHeight - curHeight, totalTime)
  if (TIME < totalTime) {
    window.requestAnimationFrame(function () {
      animate(curHeight, desiredHeight, TIME, totalTime)
    })
  }
  window.scrollTo(0, curHeight + y)
}

function easeInOutQuad(t, b, c, d) {
  t /= d / 2
  if (t < 1) {
    return c / 2 * t * t + b
  }
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}
