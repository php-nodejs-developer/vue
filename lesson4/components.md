## [Компоненты Vue](https://v3.ru.vuejs.org/ru/guide/component-basics.html)

Компоненты — переиспользуемые экземпляры со своим именем, например `'animal-card'` или `'simple-gallery'`. Компонент
можно использовать как тег в корневом экземпляре.

У компонента могут быть те же опции, что и у корневого экземпляра: data, computed, watch, methods, хуки жизненного
цикла.

## Регистрация компонентов

Чтобы использовать компоненты, сначала их нужно зарегистрировать глобально или локально.

1) При глобальной регистрации компоненты будут доступны всем остальным
   компонентам:`app.component('имя-компонента', {описание компонента});`

2) При локальной регистрации компоненты будут доступны только текущему экземпляру. Локальная регистрация осуществляется
   через свойство `components` текущего компонента: `components: {'имя-компонента': {описание компонента}}`

## Имена компонентов

Имя компонента зависит от того, где он будет использоваться:

1. при использовании непосредственно в DOM для имен допустим только стиль kebab-case `animal-card`
2. при описании компонентов в строковых шаблонах или однофайловых компонентах для имен допустимы
   kebab-case `animal-card` и PascalCase стили `AnimalCard`


## Шаблон компонента `template`

template - строковый шаблон для создания разметки компонента. Любая другая разметка внутри элемента для монтирования 
будет проигнорирована, за исключением случаев, когда в шаблоне были указаны слоты. Если в опциях Vue присутствует 
render-функция, то шаблон будет проигнорирован.


      const someComponent = {
               template: `<div>
                     <h2></h2>
                     <img src="">
                  </div>`
         };

         Vue.createApp({
            components: { someComponent }
         }).mount("#app");


         <div id="app">
            <some-component title="Some Text"></some-component>
         </div>


## Передача данных в дочерние компоненты

Передача данных в дочерние компоненты осуществляется через входные параметры. Дочерний компонент принимает данные через
свойство `props`. Входные параметры — атрибуты, которые указываются на компоненте. Можно передать столько входных
параметров, сколько потребуется.



         const someComponent = {
               props: ["title", "image"],
               template: `<div>
                     <h2>{{ title }}</h2>
                     <img :src="image">
                  </div>`
         };

         Vue.createApp({
            components: { someComponent }
         }).mount("#app");


         <div id="app">
            <some-component title="Some Text" image="picture.png"></some-component>
         </div>


### Перечисление параметров в свойстве props
1. Перечисление в массиве: `["title", "articles"]`
2. Указание типа входных параметров: 


      props: {
         title: String,
         articles: Array
      }

3. Расширенная настройка
   
      

         props: {
            title: {
               type: String,
               require: false,
               default: ""
            },
            articles: {
               type: Array,
               require: true,
               validator(value) {
                  return value.length > 0;
               }
            },
         }



### Именование входных параметров
1. При использовании шаблонов в DOM, входные параметры должны быть указаны в kebab-case 
   

      props: {
         shortDescription: String,
      }

      <some-component short-description="Some Text"></some-component>
      
2. При использовании строковых шаблонов можно использовать camelCase и kebab-case


### Передача статических и динамических значений
1. Статические значения: `<some-component short-description="Some Text"></some-component>`. При этом передача статических значений не строкового типа
   должно передаваться через `v-bind:` или `:`, как динамических
2. Динамические значения: 
   

         const someComponent = {
               props: ["title", "image"],
               template: `<div>
                     <h2>{{ title }}</h2>
                     <img :src="image">
                  </div>`
         };

         Vue.createApp({
            components: { someComponent },
            data(){
               return {
                  user:{
                     name: "Alex",
                     photo: "alex.png"
                  }
               }
            }
         }).mount("#app");


         <div id="app">
            <some-component :title="user.name" :image="user.photo"></some-component>
         </div>



## Прослушивание событий из дочерних компонентов в родительских компонентах 

Прослушивание событий из дочерних компонентов в родительских компонентах используется, когда необходимо передавать данные обратно в родительский
компонент или просто нужно сообщать родительскому компоненту, что требуется сделать, например, при нажатии на кнопку.
Родительский компонент может прослушивать любые события на экземпляре дочернего компонента с помощью `v-on` или `@`. А чтобы сгенерировать
событие, дочерний компонент может воспользоваться встроенным методом `$emit`, передавая в него аргументом имя события.
Все генерируемые дочерним компонентом события можно указать в опции `emits`.


         const someComponent = {
               emits: ["showImage"],
               data(){
                  return {
                     image: "https://picsum.photos/1000"
                  }
               }
               template: "<button v-on:click="$emit('showImage', image)">Установить фоновое изображение</button>"
         };

         Vue.createApp({
            components: { someComponent },
            data(){
               return {
                  mainPhoto: ""
               }
            },
            methods: {
               takePhoto(value) {
                  this.mainPhoto = value;
               }
            }
         }).mount("#app");


         <div id="app">
               таким образом родительский компонент сможет прослушать событие дочернего компонента,
               при клике на some-component в value метода takePhoto 
               окажутся данные из дочернего компонента ("https://picsum.photos/1000") 
            <some-component v-on:show-image="takePhoto"></some-component>
         </div>


### Именование событий
1. При использовании шаблонов в DOM имена событий должны быть указаны в kebab-case


      emits: ["showImage"],

      <some-component v-on:show-image="takePhoto"></some-component>

2. При использовании строковых шаблонов можно использовать camelCase и kebab-case



### [Использование v-model на компонентах](https://v3.ru.vuejs.org/ru/guide/component-basics.html#%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-v-model-%D0%BD%D0%B0-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%B0%D1%85)

## Слоты
Используется для передачи содержимого в компонент.


      <form-message>Данные успешно отправлены</form-message>


Для этого в дочернем компоненте необходимо определить `<slot></slot>` - место, куда будет подставляться контент.


      const message = {
         template: `
            <h3>Уважаемый пользователь</h3>
            <slot></slot>` <- на место слота будут подставлен текст "Данные успешно отправлены"
      };

### Именованные слоты

      <form-message>
         <template v-slot:person> <!-- <slot name="person"></slot> -->
            <h3>Уважаемый пользователь!</h3>
         </template>

         <template v-slot:message> <!-- <slot name="message"></slot> -->
            <p>Данные успешно отправлены</p>
         </template>
      </form-message>


Для этого в дочернем компоненте необходимо определить `<slot></slot>` - место, куда будет подставляться контент.


      const message = {
         template: `
            <slot name="person"></slot> <- на место слота будут подставлен текст "Уважаемый пользователь!"
            <slot name="message"></slot> <- на место слота будут подставлен текст "Данные успешно отправлены"
            ` 
      };


