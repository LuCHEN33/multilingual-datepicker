import { mount } from '@vue/test-utils';
import { test, expect, describe } from 'vitest';
import MultilingualDatepicker from './MultilingualDatepicker.vue';

describe('MultilingualDatepicker', () => {
    test('renders correctly with default props', () => {
        const wrapper = mount(MultilingualDatepicker);
        expect(wrapper.exists()).toBe(true);
        // Add more expectations as needed
    });

});
