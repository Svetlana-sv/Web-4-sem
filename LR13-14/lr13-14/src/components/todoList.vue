<template>
  <div class="todoList text">
        <div class="todo__title">
            {{head}}
        </div>
      <slot></slot>
  </div>
</template>

<script>
export default {
    name: 'todoList',
    props: [
        'head'
    ],
    date() {
        return {
        }
    },
}
</script>

<style>
    .todo__title{
        font-weight: bold;
        font-size: 26px;
        padding-left: 10px;
        color: var(--text-color-secondary-primary);
    }
</style>