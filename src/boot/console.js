import { store } from './store'
;(function () {
  var oldLog = console.log
  console.log = function (message) {
    store.logs.push(message)
    oldLog.apply(console, arguments)
  }
})()
