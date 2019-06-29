(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.vueVmodelMapper = factory());
}(this, function () { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function vueVmodelMapper() {
    var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$prop = _ref.prop,
        prop = _ref$prop === void 0 ? 'value' : _ref$prop,
        _ref$event = _ref.event,
        event = _ref$event === void 0 ? 'input' : _ref$event;

    return keys.reduce(function (map, key) {
      map[key] = {
        get: function get() {
          return this[prop][key];
        },
        set: function set(newValue) {
          this.$emit(event, _objectSpread({}, this[prop], _defineProperty({}, key, newValue)));
        }
      };
      return map;
    }, {});
  }

  return vueVmodelMapper;

}));
