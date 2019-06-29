'use strict';

function vueVmodelMapper(
  keys = [],
  { prop = 'value', event = 'input' } = {}
) {
  return keys.reduce((map, key) => {
    map[key] = {
      get() {
        return this[prop][key];
      },
      set(newValue) {
        this.$emit(event, {
          ...this[prop],
          [key]: newValue,
        });
      },
    };
    return map;
  }, {});
}

module.exports = vueVmodelMapper;
