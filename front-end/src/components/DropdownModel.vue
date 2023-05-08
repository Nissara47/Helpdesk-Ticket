<template>
  <!-- dropdown -->
  <div class="dropdown">
    <button class="dropdown-toggle" data-bs-toggle="dropdown">
      {{ toggle }}
    </button>
    <ul class="dropdown-menu">
      <li v-for="(item, index) in menu" :key="index">
        <a class="dropdown-item" @click="selectItem(item)">{{ item }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DropdownModel",
  props: ["toggle", "menu"],
  methods: {
    selectItem(item) {
      this.$emit("item-selected", item);
    },
  },
};
</script>

<style scoped>
button {
  border: none;
  border-radius: 6px;
}
</style>
