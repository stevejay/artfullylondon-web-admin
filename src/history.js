import createHistory from 'history/createBrowserHistory'
const history = createHistory()

// history.listen((location, action) => {
//   console.log(
//     `The current URL is ${location.pathname}${location.search}${location.hash}. The last navigation action was ${action}`
//   )
// })

export default history
