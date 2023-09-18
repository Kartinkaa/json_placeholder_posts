import {
  PropType,
  defineProps,
  defineEmits,
  ref,
  watchEffect,
  onMounted,
} from 'vue'

export default {
  props: {
    show: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const emit = defineEmits()
    const showDialog = ref(props.show)

    watchEffect(() => {
      showDialog.value = props.show
    })

    const hideDialog = () => {
      emit('update:show', false)
    }

    onMounted(() => {
      console.log('mixin mounted')
    })

    // ...

    return {
      showDialog,
      hideDialog,
      // ...
    }
  },
}
