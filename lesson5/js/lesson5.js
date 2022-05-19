"use strict";

const mainPage = {
    template: "<div>Главная страница</div>"
};
const coursesPage = {
    template:
        `
            <div>
                <h2>Список курсов</h2>
                <div v-for="course in courses">
                    <h3>{{ course.title }}</h3>
                    <!-- маршрут с параметрами -->
                  <!-- <router-link :to="'/course/' + course.id">
                      Подробнее
                      </router-link>-->
                  <router-link :to="{name: 'course by id', params: {id: course.id}}">
                    Подробнее
                  </router-link>
                </div>
         </div>
`,
    data(){
        return {
            courses: [
                {id: 1, title: "JavaScript"},
                {id: 2, title: "Vue Js"},
                {id: 3, title: "React"},
            ]
        }
    }
};
const oneCourse = {
    template:
        ` 
        <div>
            <h2>Подробная информация о курсе {{ $route.params.id }}</h2>
            <div>
                <router-link :to="'/course/' + $route.params.id + '/reviews'">
                    Отзывы
                </router-link>
                <router-link :to="'/course/' + $route.params.id + '/works'">
                    Примеры работ выпускников
                 </router-link>
            </div>
            <router-view></router-view>
        </div>
        `
    // при обращении из методов, вычисляемых свойств и тд:
    // this.$route.param.id
};

const contactsPage = {
    template: "<div>Страница с контактной информацией</div>"
};

const notFound = {
    template: "<div>Страница не найдена</div>"
};

const reviews = {
    template: "<div>Отзывы</div>"
};

const works = {
    template: "<div>Работы выпускников</div>"
};

const app = Vue.createApp({});

// настройка и подключение маршрутизатора к vue

// 1. массив с маршрутами: связь между компонентамим и ссылками
const routes = [
    { // маршурт: связь между одной ссылкой и одним компонентом
        path: "/", // ссылка
        component: mainPage, // компонент, который должен быть подгружен
        // при переходе по ссылке из path
        alias: ["/home", "/main"],
        // имена маршрутов дб быть уникальными
        name: "main"
    },
    {
        path: "/courses",
        component: coursesPage,
        name: "all courses"
    },
    {
        path: "/contacts",
        component: contactsPage,
        name: "contacts"
    },
    { // маршрут с параметрами, динамические маршруты
        path: "/course/:id(\\d+)",
        component: oneCourse,
        name: "course by id",
        // вложенные маршруты
        children: [
            // значение атрибута to в router-link  /course/1/reviews
            {path: "reviews", component: reviews},
            // значение атрибута to в router-link  /course/1/works
            {path: "works", component: works}
        ]
    },
    {
        path: "/:pathMatch(.*)*", // 0 или несколько любых символов
        component: notFound
    }
];



// 2. создание экземпляра маршрутизатора
// createRouter принимает на вход объект с настройками
// и возвращает экземпляр (объект) маршрутизатора
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

router.beforeEach((to, from) => {
    // to, from - объекты маршрута с полной информацией об этом
    // маршруте, включая парамерты, имя
    // to - объект маршрута, к которому осуществляется переход
    console.log(to.name, from)
    // если функция вернет false, переход к to не будет выполнен
    // если функция вернет true, переход к to будет выполнен
    return true
})

/* router.beforeEach((to, from, next) => {
    // next - функция перехода, если не принимает
    // на вход аргументов, то переход к to маршруту,
    // если принимает, то к маршруту с указанным name, например, next({ name: 'Login' })
    if (условие) next({ name: 'Login' })
    else next()
}) */

// 3. связь маршрутизатора и vue
app.use(router); // до вызова метода mount

app.mount("#app");


