<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      items: [],
      description: " ",
      editedDescription: " ",
      selected: {},
    };
  },
};
</script>

<style>
#app,body,html {
  height: 100%;
}
</style>
