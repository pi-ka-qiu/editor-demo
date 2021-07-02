<template>
  <div class="c-tab" :class="{ 'c-tab--activity': activity }" @click="onClick">
    <slot></slot>
    <slot name="closable">
      <div class="c-tab-close" @click="onClose">x</div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'c-tab',
  props: {
    closable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activity: false,
    };
  },
  methods: {
    onClick() {
      this.activity = true;
      this.$emit('click', this.$attrs);
    },
    onClose() {
      alert('close');
      this.$emit('close', this.$attrs);
      this.$destroy();
      this.$el.remove();
    },
  },
  created() {
    this.$on('update:activity', (value) => {
      this.activity = value;
    });
  },
  mounted() {},
};
</script>

<style scoped>
.c-tab {
  display: inline-block;
  padding: 16px 8px;
  background-color: #eee;
  user-select: none;
}

.c-tab--activity {
  background-color: #fff;
}
</style>
