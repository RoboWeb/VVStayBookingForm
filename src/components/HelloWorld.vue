
<template>
  <h1>{{ msg }}</h1>
  <button type="button" @click="count++">count is: {{ count }}</button>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'HelloWorld',
  props: { msg: String },
  setup() {
    const count = ref(0);

    return {
      count
    }
  }
}

</script>


<style scoped>
a {
  color: #42b983;
}
</style>
