import vueVmodelMapper from './main.js';
import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';

describe('vueVmodelMapper', () => {
  it('is a function', () => {
    expect(typeof vueVmodelMapper).toEqual('function');
  });

  it('returns an object', () => {
    const result = vueVmodelMapper();
    expect(typeof result === 'object').toEqual(true);
    expect(result).toEqual({});
  });

  describe('keys argument', () => {
    const keys = ['key1', 'key2'];
    const result = vueVmodelMapper(keys);

    it('returns object with keys matching keys argument', () => {
      expect(Object.keys(result)).toEqual(keys);
    });

    it('returns object with each key having get and set function', () => {
      keys.forEach(key => {
        expect(typeof result[key].get).toEqual('function');
        expect(typeof result[key].set).toEqual('function');
      })
    });
  });

  describe('vmodel prop and event argument', () => {
    it('defaults to value and input', () => {
      const Component = {
        props: ['value'],
        computed: {
          ...vueVmodelMapper(['key1']),
        },
        render(h) {
          h('h1', this.value.key1)
        }
      };

      const wrapper = shallowMount(Component, {
        propsData: {
          value: {
            key1: '',
          },
        },
      });
      wrapper.vm.key1 = 'hello';
      expect(wrapper.emitted().input).toBeTruthy();
    });

    it('accepts arguments to customise vmodel prop and event', () => {
      const Component = {
        model: {
          prop: 'customProp',
          event: 'customEvent',
        },
        props: ['customProp'],
        computed: {
          ...vueVmodelMapper(['key1'], { prop: 'customProp', event: 'customEvent' }),
        },
        render(h) {
          h('h1', this.customProp.key1)
        }
      };

      const wrapper = shallowMount(Component, {
        propsData: {
          customProp: {
            key1: '',
          },
        },
      });

      wrapper.vm.key1 = 'hello';
      expect(wrapper.emitted().customEvent).toBeTruthy();
    });


  });

});
