import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Set enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make shallow, render and mount global so we don't have to import those in test files
global.shallow = shallow;
global.render = render;
global.mount = mount;
