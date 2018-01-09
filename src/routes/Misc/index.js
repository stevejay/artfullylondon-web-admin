import About from '_admin/pages/About'
import Terms from '_admin/pages/Terms'
import Privacy from '_admin/pages/Privacy'

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
