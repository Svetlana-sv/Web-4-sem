<template>
  <div class='ui centered card'>
    <div class="content">
      <div class='title'>
          {{ todo.title }}
      </div>
      <div class='level'>
          {{ todo.level }}
      </div>
    </div>   
    
  </div>
</template>

<script>
export default {
  props: ["todo"],
  data() {
    return {
     
    };
  },
  methods: {
  }
};
</script>

<style>
/* .button[disabled] {
  cursor: not-allowed;
} */

</style>
