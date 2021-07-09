<template>
  <div class="card">
    <div class="content">
      <div class="title">
        {{ todo.title }}
      </div>
      <div class="level">
        {{ todo.level }}
      </div>
      <div class="button">
        <button v-on:click="deleteTodo(todo)">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
      todo: Array,
        level: String},
  data() {
    return {
        
    };
  },
  methods: {
    deleteTodo(todo) {
      this.$emit("delete-todo", todo);
    },
   
  }, created(){
        console.log(this.level);
        if(this.level==="Очень важно"){
             document.documentElement.style.setProperty("--width", "600px");
        }
    }
};
</script>

<style>
/* .button[disabled] {
  cursor: not-allowed;
} */
.card {
  border: 1px solid var(--black-color);
  width: var(--width);
  border-radius: 20px;
  padding: 10px;
  margin: auto;
  margin-bottom: 20px;
}
.title{
color: var(--text-color);
}
.title{
    color: var(--text-color);
}

</style>
