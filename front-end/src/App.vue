<template>
  <div>
    <TableTicket></TableTicket>
  </div>
</template>

<script>
import TableTicket from './Pages/TableTicket.vue';

export default {
  name: 'App',
  components: {
    TableTicket
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300&display=swap');
body {
  color: black !important;
  background-color: #DFDFDE !important;
  font-family: "JetBrains Mono", monospace !important;
  font-size: 16px !important;
}
</style>
