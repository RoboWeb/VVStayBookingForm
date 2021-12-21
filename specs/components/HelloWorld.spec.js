import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld';

describe('HelloWorld component test', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = mount(HelloWorld, {
            props: {
                msg: 'Hello World'
            }
        })
    });

    it ('has prop msg equal to', () => {
        expect(wrapper.props().msg).toBe('Hello World');
    });

    it('render a h1', () => {
        const title = wrapper.get('h1');
        expect(title.text()).toEqual('Hello World');
    });
    
})
