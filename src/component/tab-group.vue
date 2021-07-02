<template>
  <div class="tab-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'c-tab-group',
  props: {},
  data() {
    return {
      group: {},
    };
  },
  created() {
    this.group = new Map();
  },
  updated() {
    this.init();
  },
  destroyed() {
    this.group = undefined;
  },
  methods: {
    init() {
      this.$nextTick(() => {
        if (!this.$slots.default) return;
        const tabs = this.getTabs();
        tabs.forEach((tab) => {
          if (this.group.has(tab.componentInstance.$attrs.name)) {
            return;
          }
          this.group.set(tab.componentInstance.$attrs.name, this.group.size);
          const tabInstances = tab.componentInstance;
          // 子组件添加click 监听
          tabInstances.$on('click', () => {
            this.addClickListener(tab);
          });
          tabInstances.$on('close', () => {
            this.addCloseListener(tab);
          });
        });
      });
    },
    addCloseListener(tab) {
      const tabs = this.getTabs();
      const key = tab.componentInstance.$attrs.name || 0;
      const index = this.group.get(key);
      // 本tab 如果activity，上一个tab 设置为activity
      if (tab.componentInstance.activity && tabs.length && tabs[index - 1]) {
        const preTab = tabs[index - 1];
        preTab.componentInstance.$emit('update:activity', true);
      }
      this.$emit('tab-close', { name: key });
      this.group.delete(key);
    },
    addClickListener(tab) {
      // 其他组件置灰
      const tabs = this.getTabs();
      for (let innerTab of tabs) {
        if (
          innerTab.componentInstance.$attrs.name ===
          tab.componentInstance.$attrs.name
        ) {
          innerTab.componentInstance.$emit('update:activity', true);
        } else {
          innerTab.componentInstance.$emit('update:activity', false);
        }
      }
    },
    getTabs() {
      return this.$slots.default.filter((tab) => {
        return (
          tab.componentInstance &&
          tab.componentInstance.$options.name === 'c-tab'
        );
      });
    },
  },
};
</script>
