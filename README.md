# 📚 Vue Vmodel Mapper

vue-vmodel-mapper is a small helper to simplify the creation of custom v-model components that use object as value prop.

It's not straightforward to create custom v-model components that accepts value of type object as a prop.
The prop cannot be mutated and component must emit a new object on change of any nested value in the object.
This also makes it tricky to bind nested values in prop object using v-model inside your component.

vue-vmodel-mapper generates the boilerplate necessary to instrument a custom v-model component painlessly AND allow vmodel binding of nested values.

## Installation
```
npm i --save vue-vmodel-mapper
```

## Quick example
```
<template>
  <input v-model="firstname">
  <input v-model="lastname">
</template>
<script>
import vueVmodelMapper from 'vue-vmodel-mapper';

export default {
  name: 'CustomVmodel',
  prop: {
    // value is an object with { firstname, lastname }
    value: {
      type: Object
    }
  },
  computed: {
    ...vueVmodelMapper(['firstname', 'lastname'])
  }
}
</script>
```

## Customize vmodel event and prop name
Pass a second argument to `vue-vmodel-mapper` to customize prop and event name to match names used by your component

```
<template>
  <input v-model="firstname">
  <input v-model="lastname">
</template>
<script>
import vueVmodelMapper from 'vue-vmodel-mapper';

export default {
  name: 'CustomVmodel',
  model: {
    prop: 'customKeyName',
    event: 'customEventName'
  },
  prop: {
    // value is an object with { firstname, lastname }
    value: {
      type: Object
    }
  },
  computed: {
    ...vueVmodelMapper(
      ['firstname', 'lastname'],
      {
        vmodelProp: 'customKeyName',
        vmodelEvent: 'customEventName'
      }
    )
  }
}
</script>
```

## How it works

Example of prop mutation.
```
<template>
  <!-- cannot do this, will mutate nested prop object -->
  <input v-model="value.firstname">
  <input v-model="value.lastname">
</template>
<script>
export default {
  name: 'CustomVmodel',
  prop: {
    // value is a object with { firstname, lastname }
    value: {
      type: Object
    }
  },
}
</script>
```

### Solution
The solution is to create computed variables for every key in `this.value` with separate get and set functions.
Setting a computed variable will trigger an emit of a new object instead of mutating the existing `this.value` prop.

`vue-vmodel-mapper` is just a helper generates the computed variables below.
```
<template>
  <input v-model="firstname">
  <input v-model="lastname">
</template>
<script>
export default {
  name: 'CustomVmodel',
  prop: {
    value: {
      type: Object
    }
  },
  // boilerplate generated by vue-vmodel-mapper
  computed: {
    firstname: {
      get() {
        return this.value.firstname;
      },
      // setter to emit new object on change of firstname
      set(newValue) {
        this.$emit('input', {
          ...this.value,
          firstname: newValue,
        });
      }
    },
    lastname: {
      get() {
        return this.value.lastname;
      },
      // setter to emit new object on change of lastname
      set(newValue) {
        this.$emit('input', {
          ...this.value,
          lastname: newValue,
        });
      }
    }
  }
}
</script>
```


## Developer environment requirements

To run this project, you will need:

- Node.js >= v10.5.0, use nvm - [install instructions](https://github.com/creationix/nvm#install-script)
- Yarn >= v1.7.0 - [install instructions ("Alternatives" tab)](https://yarnpkg.com/en/docs/install#alternatives-rc)

## Running tests

```sh
npm i
npm test
npm run test:watch
```
