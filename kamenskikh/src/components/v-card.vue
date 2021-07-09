<template>
  <div class="card" v-bind:class="[{one: this.level === 'Не важно'},{two: this.level === 'Важно'},{three: this.level === 'Очень важно'}]">
    <div class="content">
      <div class="title">
        {{ todo.title }}
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
      todo: [],
        level: String},
  data() {
    return {
        
    };
  },
  methods: {
    deleteTodo(todo) {
      this.$emit("delete-todo", todo);
    },
   
  }
};
</script>

<style>
/* .button[disabled] {
  cursor: not-allowed;
} */
.card {
  border: 1px solid var(--black-color);
  width: 400px;
  border-radius: 20px;
  padding: 10px;
  margin: auto;
  margin-bottom: 20px;
}
.title{
color: var(--text-color);
  white-space: normal;
    word-break: break-all;
    overflow: visible;
    text-overflow: clip;
    font-size: 1.5em;
    margin-bottom: 10px;
    font-weight: bold;
}

.one{
    width: 200px;
}
.two{
    width: 300px;
}
.three{
 width: 400px;
}
button{
    margin: auto;
}
.button{
    margin: auto;
}

</style>
