<template>
  <select v-model="selectedValue" @change="changeOption">
    <option disabled value="">Choose from the list</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'my-select',
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedValue: this.modelValue,
    }
  },
  methods: {
    changeOption() {
      this.$emit('update:modelValue', this.selectedValue)
    },
    // changeOption(event) {
    //   this.$emit('update:modelValue', event.target.value)
    // },
  },
}
</script>

<style scoped></style>
