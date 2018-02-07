import About from '_src/pages/About'
import Terms from '_src/pages/Terms'
import Privacy from '_src/pages/Privacy'

module.exports = {
  childRoutes: [
    {
      path: 'about',
      component: About
    },
    {
      path: 'terms',
      component: Terms
    },
    {
      path: 'privacy',
      component: Privacy
    }
  ]
}
