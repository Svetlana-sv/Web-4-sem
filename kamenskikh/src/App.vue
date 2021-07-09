<template>
  <body>
    <header class="header">
      <div class="header__inner">
        <div class="header__logo">
          <img
            srcset="
              ./assets/logo-256.png 1200w,
              ./assets/logo-64.png   600w,
              ./assets/logo-16.png   300w
            "
            sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
            src="./assets/logo-256.png"
            alt="Logo ToDo List"
          />
        </div>
        <div class="header__name">Kamenskikh</div>
        <div class="header__theme">
          <toggle-button
            :value="true"
            class="theme"
            :labels="{ checked: 'on', unchecked: 'off' }"
            @change="ChangeTheme()"
          />
        </div>
      </div>
    </header>
    <div>
      <vCreateTask v-on:create-todo="addTodo" />
      <div class="container_cards">
        <vCard
          v-on:delete-todo="deleteTodo"
          v-for="(todo, index) in todos"
          v-bind:todo="todo"
          :level="todo.level"
          v-bind:key="index"
        />
      </div>
      <footer class="footer">
        Каменских Светлана Сергеевна, группа 191-361, 09.07.2021
      </footer>
    </div>
  </body>
</template>

<script>
import vCreateTask from "./components/v-create-task.vue";
import vCard from "./components/v-card.vue";
import { ToggleButton } from "vue-js-toggle-button";

export default {
  name: "App",
  components: {
    ToggleButton,
    vCreateTask,
    vCard,
  },
  data() {
    return {
      theme_switch: true,
      todos: [],
    };
  },
  methods: {
    deleteTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos.splice(todoIndex, 1);
    },
    ChangeTheme() {
      if (this.theme_switch) {
        document.documentElement.style.setProperty("--header-color", "#000000");
        document.documentElement.style.setProperty("--black-color", "#ffffff");
        document.documentElement.style.setProperty("--backg-color", "rgb(43, 42, 44)");
         document.documentElement.style.setProperty("--button", "rgb(30, 30, 30)");
      } else {
        document.documentElement.style.setProperty("--header-color", "#02a6e2");
        document.documentElement.style.setProperty("--black-color", "#000000");
        document.documentElement.style.setProperty("--backg-color", "#ffffff");
         document.documentElement.style.setProperty("--button", "rgb(233, 231, 231)");
      }
      this.theme_switch = !this.theme_switch;
    },
    addTodo(todo) {
      this.todos.push(todo);
    },
  },
};
</script>

<style>
:root {
  --header-color: #02a6e2;
  --black-color: rgb(0, 0, 0);
  --backg-color: white;
  --button: rgb(233, 231, 231);
  --width: 200px;
}
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--black-color);
  margin-top: 60px;
}
body {
  background-color: var(--backg-color);
}

.header {
  left: 0;
  top: 0;
  width: 100%;
  min-height: 80px;
  background: var(--header-color);
  align-items: center;
  display: flex;
  z-index: 100;
  padding: 10px 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.header__logo {
  padding: 0;
}

.header__inner {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  margin: auto;
  padding: 0;
}
.header__name {
  color: var(--black-color);
  font-size: 1.5em;
  display: flex;
  flex-direction: row;
  vertical-align: middle;
}
.header__theme {
}
.footer{
  left: 0;
  bottom: 0;
  width: 100%;
  min-height: 80px;
  position: fixed;
  justify-content: center;
  background: var(--header-color);
  align-items: center;
  display: flex;
  z-index: 100;
  padding: 10px 10px;
}
.container_cards {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: center;
}

@media screen and (max-width: 400px) {
  .header__inner {
    flex-direction: column;
    justify-content: center;
    margin: auto;
    padding: 0;
  }
  .header__name {
    flex-direction: column;
    vertical-align: middle;
  }
}
@media screen and (max-width: 700px) {
  .header__inner {
    flex-direction: column;
    justify-content: center;
    margin: auto;
    padding: 10px;
  }
  .header__logo {
    margin-bottom: 0.5em;
  }
  .header__name {
    margin-bottom: 0.5em;
  }
  .header__theme {
    margin-bottom: 0.5em;
  }
}
</style>
