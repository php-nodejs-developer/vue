"use strict";

Vue.createApp({
    data(){
        return {
            // список компаний - данные для создания option
            companiesList: [
                // id - значение атрибута value
                // name - информация для пользователя
                {id: 1, name: "Riva"},
                {id: 2, name: "Custom Line"},
                {id: 3, name: "Company 3"},
            ],
            // значения по умолчанию для элементов формы
            // адаются в js через data(){}
            userChoice: {
                name: "",
                email: "",
                phone: "",
                companies: [1], // тк select multiple
                price: 10000,
                deckCount: 1,
                comment: "",
                contacts: ["call"], // тк работаем с группой чекбоксов
                agree: true
            }
        }
    },
    methods: {
        sendRequest(){
            console.log(this.userChoice);
        }
    }

}).mount("#app");