// Make Enzyme functions available in all test files without importing:
import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

global.shallow = shallow
global.render = render
global.mount = mount

Enzyme.configure({ adapter: new Adapter() })

// Fail tests on any warning:
console.error = message => {
  throw new Error(message)
}

process.env.WEBSITE_ENTITY_IMAGES_ROOT_URL = 'https://images.test.com'
process.env.WEBSITE_SITE_IMAGES_ROOT_URL = 'https://siteimages.test.com'
process.env.WEBSITE_API_HOST_URL = 'https://api.test.com'
process.env.ENTITY_CACHE_TTL_SECONDS = JSON.stringify(10)
process.env.RELATED_EVENTS_CACHE_TTL_SECONDS = JSON.stringify(15)
