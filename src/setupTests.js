import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-enzyme";
import { toMatchImageSnapshot } from "jest-image-snapshot";

expect.extend({ toMatchImageSnapshot });

process.env.REACT_APP_ENTITY_IMAGES_ROOT_URL = "https://images.root";
process.env.REACT_APP_MAPBOX_ACCESS_KEY = "AAAA";

configure({ adapter: new Adapter() });
