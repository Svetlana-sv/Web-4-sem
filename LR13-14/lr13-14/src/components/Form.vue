<template>
  <div id="myForm" class="theme-border">
    <div class="block1">
      <button class="exit" @click="exit()">&#9932;</button>
    </div>
    <form>
      <div class="item">
        <p class="item__title text">Описание</p>
        <input
          id="discription_id"
          class="item__container input_style"
          type="text"
          placeholder="Lorem ipsum"
          name="user_name"
        />
      </div>
      <div class="item">
        <p class="item__title text">Статус</p>
        <div
          class="item__container dropdown unselectable input_style"
          @click="open_dropdown()"
        >
          <div id="menu_text" class="container__dropbtn text_2">
            <p id="menu_text__name">План</p>
            <p id="menu_text__arrow">˅</p>
          </div>
          <div>
            <div id="myDropdown" class="dropdown_content_light_mode">
              <div
                class="menu_content_text input_style"
                @click="setDropDownText('План')"
              >
                План
              </div>
              <div
                class="menu_content_text input_style"
                @click="setDropDownText('В работе')"
              >
                В работе
              </div>
              <div
                class="menu_content_text input_style"
                @click="setDropDownText('Готово')"
              >
                Готово
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <p class="item__title text">Ответственный</p>
        <input
          id="owner_input"
          class="item__container input_style"
          type="text"
          placeholder="Введите имя"
          name="user_name"
        />
      </div>
      <div class="item">
        <p class="item__title text">Дата и время начала</p>
        <input
          id="date_start_input"
          class="item__container input_style"
          type="datetime-local"
          name="user_name"
        />
      </div>
      <div class="item">
        <p class="item__title text">Дата и время завершения</p>
        <input
          id="date_end_input"
          class="item__container input_style"
          type="datetime-local"
          name="user_name"
        />
      </div>
      <div class="item_button input_style" @click="save1()">➔</div>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    open_dropdown: function () {
      document.getElementById("myDropdown").classList.toggle("show");
    },

    setDropDownText: function (val) {
      document.getElementById("menu_text__name").innerHTML = val;
    },
    save1: function () {
      var start = document.getElementById("date_start_input").value;
      var end = document.getElementById("date_end_input").value;
      var owner = document.getElementById("owner_input").value;
      var description = document.getElementById("discription_id").value;
      var status = document.getElementById("menu_text__name").innerHTML;
      var n;
      if (status==='План')
        n = 0
      else if (status==='Готово')
        n= 2
      else
        n= 1

      this.$emit("save", [
        n,
        start,
        end,
        owner,
        description,
      ]);
      document.getElementById("myForm").style.display = "none";
    },
    exit: function () {
      document.getElementById("myForm").style.display = "none";
    },
    
  },
};
</script>

<style>
#myForm {
  position: fixed;
  display: none;
  top: 50%;
  border-radius: 20px;
  left: 0;
  width: 40%;
  height: 600px;
  margin-right: 30%;
  margin-left: 30%;
  margin-top: -300px;
  background-color: inherit;
}
.block1 {
  padding-top: 5px;
  padding-right: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  padding-left: 10%;
  padding-right: 10%;
  margin-top: 20px;
}
.exit{
  margin-right: 10px;
  margin-top: 10px;
  outline: none;
  width: 30px;
  color: white;
  height: 30px;
  border: 1px solid var(--border-color-green);
  background-color: var(--back-color-secondary);
  border-radius: 30px;
}
.container__dropbtn {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0;
  margin: 0;
}
form p {
  margin: 0px;
  margin-top: 10px;
  padding: 0;
}
.item__title {
  font-weight: bold;
}
.item__container {
  background-color: inherit;
  border-radius: 10px;
  border: 1px solid #219afb;
  font-size: 0.7rem;
  color: inherit;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: bold;
}
.item {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.item_button {
  width: 85%;
  text-align: center;
  border-radius: 5px;
  color: white;
  font-size: 0.7rem;
  padding: 8px;
  font-weight: lighter;
}


input:focus {
  outline: 0;
}
.menu_content_text {
  padding: 10px;
}

.menu_content_text:hover {
  color: white;
  background-color: var(--hover);
}
/* Dropdown button on hover & focus */
.container__dropbtn:hover,
.dropbtn:focus {
}
.unselectable {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                    not supported by any browser */
}
/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown_content_dark_mode {
  display: none;
  position: absolute;
  background-color: black;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.dropdown_content_light_mode {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: inherit;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: var(--hover);
}
form p {
  margin: 0;
  padding: 0;
}
/* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
</style>