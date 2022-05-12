"use strict";
// js не менять, все обработчики событий добавлять непосредственно в html
Vue.createApp({
    data(){
        return {
            letters: "абвгдеёжзийклмнопрстуфхцчшщъыьэюя",
            text: ""
        }
    }
}).mount("#lesson-task");