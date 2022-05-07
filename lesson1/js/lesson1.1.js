"use strict";
let cats = [
    {
        name: "Люся",
        age: "1 год",
        color: "трехцветная",
        img: "https://picsum.photos/id/219/1000/1000"
    },
    {
        name: "Макс",
        age: 4,
        color: "серый",
        img: "https://picsum.photos/id/1074/1000/1000"
    },
    {
        name: "Василий",
        age: 1,
        color: "трехцветный",
        img: "https://picsum.photos/id/593/1000/1000"
    }
];
// 1. параметры инициализации компонента,
// объявления свойств, за значениями которых будет следить
// система реактивности vue, методы - обработчики событий и тд
let rootComponentOption = {
    // в компоненте data - метод, который возвращает объект
    // свойства, перечисленные в объекте попадают в систему
    // реактивности vue
    data(){
        return {
            userInput: "",
            book: {
                title: "vue js",
                author: "js developer",
                otherAuthors: ["junior1", "junior2"],
                img: "https://picsum.photos/id/44/200/300"
            },
            cats
        }
    },
    computed: { /* вычисляемые свойства */
        userOutput(){ // метод, который возвращает значение свойства userOutput
            // this - ссылка на текущий компонент!
            // обращаться к свойствам из data нужно через this
            return this.userInput.length < 1 ? "Вы ничего не ввели" : this.userInput;
        },
        userHtmlOutput(){
            let res = this.userInput.length < 1 ? "Вы ничего не ввели" : this.userInput;
            return `<span>${res}</span>`;
        }
    }
};

// создание приложения vue
// фабричный метод createApp создает экземпляр vue (new Vue)
let app = Vue.createApp(rootComponentOption);

// монтирование приложения в html,
// метод mount возвращает ссылку на корневой компонент приложения,
// который и является связующим звеном между js и html (ViewModel)
let vm = app.mount("#application");

// Vue.createApp({
//    настройки корневого компонента
//
// }).mount("#application");