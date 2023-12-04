<template>
  <div class="tab-panel"
    role="tabpanel"
    v-show="isActive"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    isNew: Boolean
  },
  computed: {
    tabTitle() {
      return this.title
    },
    tabIsNew () {
      return this.isNew
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  methods: {
  }
}
</script>
