"use strict";

let books =  [
    {
        title: "Колобок",
        description: "Сказка, знакомая каждому взрослому, придется по душе и маленьким детям. " +
            "Они быстро учат простые слова песенки Колобка и с удовольствием подпевают родителям.",
        cover: "1.jpg",
        inList: false,
    },
    {
        title: "Репка",
        description: "Репка — русская народная сказка, которая знакома каждому ребенку с малых лет. " +
            "«Репка» имеет цепочные действия, ясные даже малышу, поэтому можно читать сказку с раннего возраста.",
        cover: "2.jpg",
        inList: false,
    },
    {
        title: "Три медведя",
        description: "Народная сказка с английскими корнями, знакомая каждая ребёнку с детства. " +
            "В ней говорится о приключениях девочки, которая пошла в лес, заблудилась и набрела на дом трёх медведей.",
        cover: "3.jpeg",
        inList: false,
    },
    {
        title: "Красная шапочка",
        description: "В ней показана жизнь простой девочки, Красной Шапочки. " +
            "Однажды ее бабушка заболела, и внучка отправилась ее навестить по наказу матери.",
        cover: "4.jpg",
        inList: false,
    },
];

Vue.createApp({
    data(){
        return {
            tabTitles: ["Все книги", "Мой список"],
            currentTab: "Все книги",
            userList: [],
            books
            /* allBooks: books */
        }
    },
    // для вывода отфильтрованных или отсортированных данных
    // используются вычисляемые свойства
    computed: {
        sortedByTitle(){
            // геттер для свойства sortedByTitle, который возвращает
            // значение этого свойства:
            return this.userList.sort(
                (b1, b2) => b1.title.localeCompare(b2.title)
            );
        }
    },
    methods: { // обработчики событий, можно хранить и вспомогательные методы
        addToList(book){
            book.inList = true;
            this.userList.push(book);
        },
        deleteFromList(book){
            book.inList = false;
            this.userList = this.books.filter(b => b.inList);
        }
    }
}).mount("#app");
