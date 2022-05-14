"use strict"
const itemCard = {
    template: /* внешний вид компонента - html теги */
        `
           <div :style="{'background-color': background}">
                <h2>{{ info.title }}</h2>
                <p>{{ info.description }}</p>
                <a :href="info.link">Подробнее</a>
           </div> 
        `,
    props: { // атрибуты компонента, свойства, которые передаются из
            // родительского компонента
        // имя атрибута: тип данных атрибута
        info: Object,
        background: String
    }
    // props: ["info", "background"]
};


// компоненты и обработка событий
const buttons = {
    template: `
        <div>
            <p>{{ inner }}</p>
             <button @click="inner = 'Внутренние данные'">
                Добавить данные в компонент
             </button>     
        </div>
    `,
    data() {
        return {
            inner: ""
        };
    }
};

const outerButton = {
    emits: ["showPrise"], // перечисляем события, которые генерирует
    // текущий компонент
    // при клике на кнопке компонент генерирует событие
    // с названием showPrise и передает в родительский компонент
    // значение свойства prise
    template: `<button @click="$emit('showPrise', prise)">
                  Отобразить данные
               </button>`,
    data(){
        return{
            prise: "Карандаш"
        }
    },
};

const ads = {
    template: // если в компоненте есть <slot>, значит в компонент
    // можно вложить теги или текст
        `
            <h3>Объявление</h3>
            <slot>Разместите здесь свое объявление</slot>
        `
};

let app = Vue.createApp({
    // локальная регистрация компонентов - компоненты будут
    // доступны только в текущем компоненте
    components: {
      // имя компонента: объект компонента
        "v-ads": ads
    },
    data(){
        return {
            service: {
                title: "Женская стрижка на длинные волосы",
                description: "Краткое описание услуги",
                link: "/service/1"
            },
            books: [
                {title: "JavaScript", description: "Краткое описание книги JavaScript", link: "/javascript"},
                {title: "CSS 3", description: "Краткое описание книги CSS 3", link: "/css3"},
                {title: "VUE JS 3", description: "Краткое описание книги VUE JS 3", link: "/vuejs3"}
            ],
            currentPrise: "Приз еще не получен"
        }
    },
    methods: {
        show(value){ // value - данные, которые передает дочерний компонент,
            // в данном случае - значение свойства prise компонента outerButton
            this.currentPrise = value;
        }
    }
});

// глобальная регистрация компонентов -
// компонент доступен любому компоненту приложения
// app.component('имя-компонента', объект);
// инлайновые компоненты (создаются в .js файлах):
// 1. имя в 2 слова в кебаб-case нотации
// 2. только парный тег: <имя-компонента></имя-компонента>
app.component("item-card", itemCard);
app.component("v-buttons", buttons);
app.component("outer-button", outerButton);
app.mount("#lesson4");


// однофайловые компоненты (создаются в .vue файлах)