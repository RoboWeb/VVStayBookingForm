import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld';

describe('HelloWorld component test', () => {

    it('renders a h1', () => {
        const wrapper = mount(HelloWorld, {
            props: {
                msg: 'Hello World'
            }
        })
 
        expect(wrapper.props().msg).toBe('Hello World');
    })
    
})
