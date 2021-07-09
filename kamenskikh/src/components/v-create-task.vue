<template>
  <div class="container">
    <button class="" v-on:click="openForm" v-show="!isCreating">
      Добавить
    </button>
    <div class="modal" v-show="isCreating">
      <form class="form" v-on:submit.prevent="onSubmit">
        <legend>Добавление задачи</legend>
        <div class="form__item">
          <label>Описание</label>
          <input
            v-model="titleText"
            type="text"
            ref="title"
            defaultValue=""
            required
            placeholder="Описание задачи"
          />
        </div>
        <div class="form__item">
          <label>Сложность задачи</label>
          <select v-model="level" required>
            <option disabled value="">Выберите важность задачи</option>
            <option>Не важно</option>
            <option>Важно</option>
            <option>Очень важно</option>
          </select>
        </div>
        <div class="form__buttons">
          <button class="" v-on:click="sendForm()" type="submit">
            Добавить
          </button>
          <button class="" v-on:click="closeForm()" type="submit">Закрыть</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleText: "",
      level: "",
      isCreating: false,
    };
  },
  methods: {
    openForm() {
      this.isCreating = true;
    },
    closeForm() {
      this.isCreating = false;
    },
    sendForm() {
      if (this.titleText.length > 0 && this.level != "") {
        const title = this.titleText;
        const level = this.level;
        this.$emit("create-todo", {
          title,
          level,
        });
        this.titleText = "";
        this.level = "";
        this.isCreating = false;
      }
    },
  },
};
</script>

<style>
#modal {
  position: absolute;
  text-align: center;
  top: 200px;
  display: flex;
  margin: auto;
  border: 1px solid var(--black-color);
  border-radius: 20px;
}
.container {
  padding: 15px;
  display: flex;
  justify-content: center;

  font-size: 1.5em;
}
button {
  height: 35px;
  width: 160px;
  border-radius: 20px;
  font-size: 1em;
  color: var(--black-color);
  background: var(--button);
}
.form {
  border: 1px solid var(--black-color);
  border-radius: 20px;
  padding: 10px;
}
.form__item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: left;
  margin: 5px;
}
.form__buttons {
  display: flex;
  margin: 0;
  justify-content: center;
}
.form__item input {
  width: 300px;
  height: 30px;
  background: #e9eff6;
  line-height: 40px;
  border-width: 0;
  border-radius: 20px;
  padding: 0 20px;
  margin: auto;
}
.form__item select {
  width: 300px;
  height: 30px;
  background: #e9eff6;
  line-height: 40px;
  border-width: 0;
  border-radius: 20px;
  padding: 0 20px;
  margin: auto;
}
.form__item label {
  color: var(--black-color);
}
legend {
  text-align: center;

  margin: 10px;
  color: var(--black-color);
}
@media screen and (max-width: 450px) {
  form {
    max-width: 400px;
  }
  .form__item {
    display: flex;
    flex-direction: column;
  }
  .form__item select {
    width: 150px;
  }
  .form__item input {
    width: 150px;
  }

}
</style>