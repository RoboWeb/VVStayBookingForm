import { mount } from "@vue/test-utils";
import Calendar from '@/components/Calendar';

describe('Calendar component', () => {
    let wrapper;
    const mockedProps = {
        page: {},
        reservation: {},
    }

    beforeEach(() => {
        wrapper = mount(Calendar, {
            props: mockedProps,
            global: {
                stubs: {iconChevron: true}
            }
        });
    });

    
});