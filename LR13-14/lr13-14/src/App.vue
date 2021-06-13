<template>
  <body>
    <header>
      <h1>Канбан</h1>
      <div class="header__theme-form">
        <p class="theme-form__text">Темная тема</p>
        <toggle-button
          :value="true"
          class="theme-form__toggle-button"
          :labels="{ checked: 'on', unchecked: 'off' }"
          @change="onChangeEventHandler()"
        />
      </div>
    </header>
    <div class="body__create-task">
      <p class="create-task__text">Добавить новую задачу</p>
      <div class="create-task__form">
        <input id="description" placeholder="Описание" />
        <button class="form__submit" @click="createTask()">&#128929;</button>
      </div>
    </div>
    <main>
      <todo-list
        :head="`${list.name} (${list.items.length})`"
        :key="index"
        v-for="(list, index) in lists"
      >
        <draggable
          class="todoList__draggable-item"
          :list="list.items"
          group="canban-lists"
          ghostClass="dragging"
        >
          <task
            @moveToLastColumn="moveToLastColumn"
            @deleteTask="deleteTask"
            @editTask="editTask"
            :key="index_t"
            :head="task.head"
            :index="index_t"
            :id="task.id"
            :col="list.id"
            :time_start="task.time_start"
            :owner="task.owner"
            :time_end="task.time_end"
            :description="task.description"
            v-for="(task, index_t) in list.items"
          />
        </draggable>
      </todo-list>
    </main>
    <Form
      @save="save"
     />
      <footer>
    <a href="https://github.com/Svetlana-sv/Web-4-sem/tree/project">GitHub</a>
  </footer>
  </body>
 
</template>

<script>
import Task from "./components/Task.vue";
import todoList from "./components/todoList.vue";
import draggable from "vuedraggable";
import Form from "./components/Form.vue";
import { ToggleButton } from "vue-js-toggle-button";

export default {
  name: "App",
  components: { Task, todoList, draggable, Form, ToggleButton },
  data() {
    return {
      card_count: 0,
      editIndex: -1,
      editColumn: -1,
      edittask: null,
      theme_switch: false,
      lists: [
        {
          id: 0,
          name: "План",
          items: [],
        },
        {
          id: 1,
          name: "В работе",
          items: [],
        },
        {
          id: 2,
          name: "Готово",
          items: [],
        },
      ],
    };
  },
  methods: {
    createTask: function () {
      var text = document.getElementById("description").value;
      var time = new Date();

      if (text === '')
        text = `${this.card_count}`;

      this.lists[0].items.push({
        id: this.card_count,
        head: text,
        time_start: time,
        description: "description",
        owner: "owner",
      });
      this.card_count++;
    },
    deleteTask(col,index){
        this.$delete(this.lists[col].items,index);
    },
    editTask(col,index){
      document.getElementById("myForm").style.display = "block";
      this.editIndex = index;
      this.editColumn = col;
      var task = this.lists[col].items[index];
      document.getElementById('discription_id').value = task.description;
      if (col==0)
        document.getElementById('dropdown_text__name').innerHTML = 'План';
      else if (col==1)
        document.getElementById('dropdown_text__name').innerHTML = 'В работе';
      else
        document.getElementById('dropdown_text__name').innerHTML = 'Готово';

      document.getElementById('owner_input').value = task.owner;
      document.getElementById('date_start_input').value = this.parseDate(task.time_start);
       try{
        document.getElementById("date_end_input").value = this.parseDate(task.time_end);
      }catch(e){
        document.getElementById("date_end_input").value = '';
      }
    },
    onChangeEventHandler() {
      if (this.theme_switch) {
        document.documentElement.style.setProperty(
          "--back-color-primary",
          "white"
        );
        document.documentElement.style.setProperty(
          "--back-color-secondary",
          "#75c791"
        );
        document.documentElement.style.setProperty(
          "--border-color-green",
          "green"
        );
        document.documentElement.style.setProperty(
          "--text-color-primary-black",
          "black"
        );
        document.documentElement.style.setProperty(
          "--text-color-secondary-white",
          "white"
        );
      } else {
        document.documentElement.style.setProperty(
          "--back-color-primary",
          "black"
        );
        document.documentElement.style.setProperty(
          "--back-color-secondary",
          "black"
        );
        document.documentElement.style.setProperty(
          "--border-color-green",
          "white"
        );
        document.documentElement.style.setProperty(
          "--text-color-primary-black",
          "white"
        );
        document.documentElement.style.setProperty(
          "--text-color-secondary-white",
          "white"
        );
      }
      this.theme_switch = !this.theme_switch;
    },
    moveToLastColumn(col,index){
      console.log(col,index);
      this.lists[2].items.push(this.lists[col].items[index])
      this.$delete(this.lists[col].items, index)
    },
    dropTask: function (index) {
      console.log(index);
      this.$delete(this.complete, index);
      this.card_count--;
    },
    taskToEnd: function (index, column) {
      console.log(index);
      if (column === 0) {
        this.complete.push(this.planning[index]);
        this.$delete(this.planning, index);
      } else {
        this.complete.push(this.inProgress[index]);
        this.$delete(this.inProgress, index);
      }
    },
    parseDate: function(date){
      var dd = date.getDate();
      var mm = date.getMonth() + 1; 
      var yyyy = date.getFullYear();
      var minutes = date.getMinutes();
      var hour = date.getHours();
      if(dd < 10){
        dd='0' + dd
      } 
      if(mm < 10){
        mm='0' + mm
      }
      if(hour < 10){
        hour='0' + hour
      }
      if(minutes < 10){
        minutes='0' + minutes
      }

      date = yyyy + '-' + mm + '-' + dd + 'T' + hour + ':' + minutes;
      return date
    },
    save :function(toEdit){
      console.log(toEdit);
      var task = this.lists[this.editColumn].items[this.editIndex];
      console.log(task);
      this.$delete(this.lists[this.editColumn].items, this.editIndex);
      task.owner = toEdit[3];
      task.description = toEdit[4];
      task.time_start = new Date(toEdit[1]);
      if (toEdit[2] != '')
        task.time_end = new Date(toEdit[2]);

      console.log(task);
      this.lists[toEdit[0]].items.push(task);
    }
  },
};
</script>

<style>
:root {
  --back-color-primary: white;
  --back-color-secondary: #75c791;
  --border-color-green: green;
  --hover: green;
  --text-color-primary-black: black;
  --text-color-secondary-white: white;
}
body {
  margin: 0;
  padding: 0;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  background-color: var(--back-color-primary);
}
header {
  padding: 50px 60px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  vertical-align: middle;
}
.theme-form__toggle-button {
  margin-top: 50px;
}
h1 {
  font-size: 3em;
  color: var(--text-color-primary-black);
}
.body__create-task {
  padding-left: 80px;
  margin-bottom: 40px;
  margin-top: 30px;
}
.create-task__text {
  font-weight: bold;
  color: var(--text-color-primary-black);
}
.body__create-task input {
  padding: 10px;
  border-radius: 5px;
  outline: none;
  color: var(--text-color-secondary-white);
  border: 1px solid var(--border-color-green);
  background-color: var(--back-color-secondary);
  font-weight: bold;
}
.header__theme-form {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
input::placeholder {
  color: white;
  font-weight: bold;
}
.create-task__form {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
.form__submit {
  width: 45px;
  height: 45px;
  border-radius: 25px;
  border: 0px;
  font-size: 1.5rem;
  outline: none;
  background-color: var(--back-color-secondary);
  color: white;
  font-weight: bold;
  border: 1px solid var(--border-color-green);
}
.theme-form__text {
  margin-top: 50px;
}

.todoList {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color-green);
  width: 100%;
  border-radius: 5px;
  padding: 10px 10px;
  gap: 20px;
  height: auto;
  color: var(--text-color-primary-black);
}
main {
  margin-top: 50px;
  padding-left: 15%;
  padding-right: 15%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  gap: 10%;
  max-width: 70%;
}
.dragging {
  background-color: var(--hover);
  z-index: 10;
}
.input_style:hover{
   background-color: var(--hover);
}
#description:hover{
   background-color: var(--hover);
}
button:hover{
   background-color: var(--hover);
}
.todoList__draggable-item {
  display: flex;
  flex-direction: column;
  gap: 30px;
  min-height: 100%;
}
.task__edit-form {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 5px;
}
input:focus {
  outline: 0;
}
input::placeholder {
  color: var(--text-color-secondary-white);
}
.input_style {
  border: 1px solid var(--border-color-green);
  color: var(--text-color-secondary-white);
  background-color: var(--back-color-secondary);
}
.theme_submit {
  color: white;
  background-color: #219afb;
}
.theme_1 {
  background-color: var(--back-color-other);
  color: white;
}
.text {
  color: var(--text-color-primary-black);
}
.text_2 {
  color: var(--text-color-secondary-white);
}
.show {
  display: block;
}
.theme-border {
  border: 1px solid var(--text-color-primary-black);
}
footer {
  position: fixed;
  opacity: 0.5;
  margin-top: 70px;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 40px;
  text-align: center;
  vertical-align: middle;
  background: #75c791;
}
a{
  color: #000000;
  font-size: 2em;
  text-decoration: none;
}

@media (max-width: 1000px) and (min-width: 600px) {
  main {
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    column-gap: 12%;
    row-gap: 50px;
    justify-content: center;
    padding: 0;
    margin-left: 15%;
  }
}
@media (max-width: 600px) and (min-width: 530px) {
  main {
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    column-gap: 12%;
    row-gap: 50px;
    justify-content: center;
    padding: 0;
    margin-left: 10%;
  }
}
@media (max-width: 530px) {
  main {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(3, 1fr);
    row-gap: 50px;
    max-width: 84%;
    padding-right: 2%;
    padding-left: 2%;
    margin-left: 2%;
  }
  input {
    width: 70%;
  }
  .header__head {
    height: 100px;
  }
}
</style>
