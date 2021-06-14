<template>
  <div class="todo">
    <div class="todo__head">{{ head }}</div>
    <div class="todo__form">
      <div class="form__topic">
        <div class="topic__title">
          <p>Описание</p>
        </div>
        <div class="topic__text">
          <p>{{ description }}</p>
        </div>
      </div>
      <div class="form__topic">
        <div class="topic__title">
          <p>Дата и время начала</p>
        </div>
        <div class="topic__text">
          <p>{{ time_start.toLocaleString() }}</p>
        </div>
      </div>
      <div v-if="col === 2" class="form__topic">
        <div class="topic__title">
          <p>Ушло времяни</p>
        </div>
        <div class="topic__text">
          <p>{{ getDurrationText() }}</p>
        </div>
      </div>
      <div class="form__topic">
        <div class="topic__title">
          <p>Ответственный</p>
        </div>
        <div class="topic__text">
          <p>{{ owner }}</p>
        </div>
      </div>
    </div>
    <div class="todo__buttons">
      <img @click="$emit('editTask', col,index)" src="../assets/i2.png"  alt="edit task" width="35"/>
      <img @click="$emit('deleteTask', col,index)" v-if="col == 2" src="../assets/i3.png"  alt="edit task" width="35"/>
      <img @click="$emit('moveToLastColumn', col,index)" v-else src="../assets/i1.png"  alt="edit task" width="35"/>
    </div>
  </div>
</template>

<script>

export default {
  name: "Task",
  props: {
    id: {
      type: Number,
      default: -1,
    },
    head: {
      type: Number,
      default: "template head",
    },
    index: Number,
    owner: {
      type: String,
      default: "owner",
    },
    time_start: {
      type: Date,
      default: null,
    },
    description: {
      type: String,
      default: "description",
    },
    time_end: {
      type: Date,
      default: null,
    },
    col: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    getStartTime: function () {
      return this.time_start.toLocaleString();
    },
    getDurrationText: function () {
      var mills;
      console.log(this.time_end);

      if (this.time_end === null) mills = new Date() - this.time_start;
      else mills = this.time_end - this.time_start;

      var sec = Math.floor(mills / 1000);
      var min = Math.floor(sec / 60);
      var hours = Math.floor(min / 60);
      var days = Math.floor(hours / 24);
      sec = sec - min * 60;
      min = min - hours * 60;
      hours = hours - days * 24;
      return `Дни: ${days}, часы: ${hours}, минуты: ${min}, секунды: ${sec}`;
    },
  },
};
</script>

<style>
.todo {
  color: var(--text-color-secondary-white);
  background-color: var(--back-color-secondary);
  border: 1px solid var(--border-color-green);
  padding: 10px;
  min-height: 400px;
  max-width: 100%;
  display: flex;
  border-radius: 15px;
  flex-direction: column;
  justify-content: space-between;
}
.todo:hover{
  background-color: var(--hover);
}
.todo__head {
  font-weight: bold;
  font-size: 24px;
  text-transform: uppercase;
  color: inherit;
  padding: 0;
  max-width: 150px;
  word-wrap: break-word;
}
.todo__form {
  height: 100%;
}
.topic__title{
  font-weight: bold;
}
.topic__text{
  margin-left: 10px;
}
.todo__buttons{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 10px;
}
</style>