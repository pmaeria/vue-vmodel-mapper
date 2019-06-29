export default function vueVmodelMapper(
  keys = [],
  { vmodelProp = 'value', vmodelEvent = 'input' } = {}
) {
  return keys.reduce((map, key) => {
    map[key] = {
      get() {
        return this[vmodelProp][key];
      },
      set(newValue) {
        this.$emit(vmodelEvent, {
          ...this[vmodelProp],
          [key]: newValue,
        });
      },
    };
    return map;
  }, {});
}
