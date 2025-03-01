# Проектная работа "WEB-ларёк"

Проектная работа представляет собой интернет-магазин с товарами для веб-разработчиков. 
В нём можно посмотреть каталог товаров, добавить товары в корзину и сделать заказ. 

**Стек:** HTML, SCSS, TS, Webpack

**Структура проекта:**
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

**Важные файлы:**
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура

В проекте используется архитектура MVP (Model-View-Presenter), которая разделяет приложение на три основных слоя: модель (бизнес-логика приложения, реализующая хранение и изменение данных), отображение (реализует вывод данных пользователю) и брокер событий (презентер). 
Данная архитектура строится на событийно-ориентированном подходе к проектированию, который предполагает, что брокер событий связывает между собой модель и отображение, обрабатывая события и передавая данные между ними.

### UML-схема

![UML](https://github.com/Roman-Gaponov/web-larek-frontend/blob/main/project-uml.jpg)

## Базовый код

### Брокер событий

#### Класс `EventEmitter`

Классическая реализация брокера событий. Обеспечивает работу событий, утанавливает или снимает слушатели событий, 
вызывает слушатели при возникновении событий.

**Конструктор**

`constructor()`

- иницализирует брокер событий.

**Поля**

`_events` - тип `Map`, включающий в себя события и "подписчиков" на эти события (компоненты модели или отображения).

**Методы**

- `on` - подписка на событие;
- `off` - отписка от события;
- `emit` - инициализация события;
- `onAll` - подписка на все события;
- `offAll` - сброс всех подписок;
- `trigger` - генератор события с заданными аргументами, что позволяет передавать его в качестве обработчика события в другие классы.


### Модель

#### Класс `Api`

Базовый класс для работы с сервером проекта.

**Конструктор**

`constructor(baseUrl: string, options: RequestInit = {})` 

- принимает в качестве аргументов url сервера и дополнительные опции для запросов в виде объекта.

**Поля**

- `baseUrl` - адрес сервера;
- `options` - объект с дополнительными опциями к запросу.

**Методы**

- `handleResponse` - обработчик ответа сервера;
- `get` - выполняет GET запрос на сервер;
- `post` - по умолчанию выполняет POST запрос на сервер (может быть переопределён).


#### Класс `ApiExtended`

Расширяет возможности базового класса Api. 

**Конструктор**

`constructor(cdn: string, baseUrl: string, options?: RequestInit)` 

- дополнительно принимает в качестве аргумента url с контентом для проекта.

**Поля**

- `cdn` - url с контентом.

**Методы**

- `getProduct` - получить данные о товаре по его id;
- `getListOfProducts` - получить список всех товаров;
- `postOrder` - отправить сформированный заказ на сервер.


#### Абстрактный класс `Model<Type>`

Базовый класс модели, объединяющий данные неявного типа и привязывающий события. 

**Конструктор**

`constructor(data: Partial<Type>, events?: IEvents)` 

- принимает в качестве аргументов данные неявного типа и объект события.

**Методы**

- `emitChanges` - привязывает входящее событие к брокеру событий;


#### Класс `AppData`

Реализует основную бизнес-логику приложения и хранение данных.  

**Поля**

- `catalog` - массив данных товаров в каталоге;
- `preview` - данные для товара, открытого в превью;
- `basket` - массив данных товаров в корзине;
- `order` - данные для заказа;
- `formErrors` - данные ошибок валидации.

**Методы**

- `setCatalog` - установить новый каталог товаров;
- `setPreview` - установить данные товара для превью;
- `setProductToBasket` - поместить продукт в корзину;
- `setContactsField` - установить поле контактов;
- `setOrderField` - установить поле заказа;
- `setPaymentMethod` - установить метод оплаты заказа;
- `setTotal` - установить количество товаров в корзине;
- `removeProductFromBasket` - удалить товар из корзины;
- `clearBasket` - очистить данные корзины;
- `validateOrder` - валидировать данные заказа;
- `validateContacts` - валидировать данные контактов пользователя;
- `isInBasket` - проверить находится ли товар в козине;
- `getBasketList` - получить массив товаров в корзине;
- `getTotal` - получить количество товаров в корзине.


### Отображение


#### Абстрактный класс `View<Type>`

Базовый класс для создания и отображения компонентов пользовательского интерфейса.
Содержит основные методы для работы с компонентами отображения. 

**Конструктор**

`constructor(container: HTMLElement, events?: IEvents)` 

- принимает в качестве аргументов элемент контейнера, в который будет помещён компонент и объект брокера событий.

**Методы**

- `setText` - установить текст;
- `setImage` - установить изображение и альтернативный текст;
- `toggleClass` - переключить класс элемента;
- `setDisabled` - установить состояние элемента;
- `setHidden` - скрыть элемент;
- `setVisible` - отобразить элемент;
- `render` - отобразить элемент с переданными параметрами.


#### Класс `Page`

Отображает главную страницу.

**Конструктор**

`constructor(container: HTMLElement, events: IEvents)` 

- принимает в качестве аргументов DOM-элемент главной страницы и объект брокера событий.

**Поля**

- `catalog` - элемент каталога;
- `counter` - элемент счётчика товаров в корзине;
- `basket` - элемент корзины;
- `wrapper` - обёртка страницы.


**Методы**

- `set catalog` - сеттер, устанавливающий массив товаров в каталоге страницы;
- `set counter` - сеттер, устанавливающий значение счётчика товаров в корзине;
- `set locked` - сеттер, устанавливающий блокировку прокрутки страницы.


#### Класс `Basket`

Реализует отображение корзины в модальном окне. 

**Конструктор**

`constructor(container: HTMLElement, events: IEvents)` 

- принимает в качестве аргументов элемент корзины и объект брокера событий.

**Поля**

- `list` - элемент списка товаров в корзине;
- `total` - элемент суммы цены товаров;
- `button` - элемент кнопки перехода на оформление заказа.

**Методы**

- `setButtonState` - установить состояние кнопки перехода на оформление заказа;
- `set items` - сеттер, устанавливающий массив товаров в элемент `list`;
- `set total` - сеттер, устанавливающий сумму цены товаров в элемент `total`.


#### Класс `BasketItem`

Реализует отображение данных карточки товара в корзине. 

**Конструктор**

`constructor(container: HTMLElement, actions?: IBasketItemActions)` 

- принимает в качестве аргумента элемент карточки товара в корзине и опциональный объект событий.

**Поля**

- `index` - элемент индекса товара в корзине;
- `title` - элемент наименования товара;
- `price` - элемент цены товара;
- `deleteButton` - элемент кнопки удаления товара.

**Методы**

- `set index` - сеттер, устанавливающий индекс товара;
- `set title` - сеттер, устанавливающий наименование товара;
- `set price` - сеттер, устанавливающий цену товара.


#### Класс `Card`

Реализует отображение карточки товара в каталоге. 

**Конструктор**

`constructor(container: HTMLElement, actions?: ICardActions)` 

- принимает в качестве аргумента DOM-элемент карточки на базе шаблона.

**Поля**

- `title` - элемент заголовка карточки;
- `category` - элемент категории карточки;
- `image` - элемент изображения;
- `price` - элемент цены.

**Методы**

- `set title` - сеттер, устанавливающий заголовок карточки;
- `set category` - сеттер, устанавливающий категорию;
- `set image` - сеттер, устанавливающий изображение.


#### Класс `CardPreview`

Реализует отображение карточки в превью. 

**Конструктор**

`constructor(container: HTMLElement, actions?: ICardActions)` 

- принимает в качестве аргумента DOM-элемент карточки на базе шаблона и опциональный объект событий.

**Поля**

- `description` - элемент описания товара;
- `button` - элемент кнопки в превью.

**Методы**

- `setNotForSale` - если товар не имеет цены, то установить на кнопку текст "не продаётся" и заблокировать кнопку
- `set description` - сеттер, устанавливающий описание товара в превью;
- `set button` - сеттер, устанавливающий текст на кнопке в превью.


#### Класс `Modal`

Реализует модальное окно. 

**Конструктор**

`constructor(container: HTMLElement, events: IEvents)` 

- принимает в качестве аргументов DOM-элемент модального окна на базе шаблона и объект брокера событий.

**Поля**

- `content` - элемент с содержимым модального окна;
- `closeButton` - элемент кнопки закрытия модального окна.

**Методы**

- `set content` - сеттер, устанавливающий содержимое модального окна;
- `open` - открыть модальное окно;
- `close` - закрыть модальное окно.
- `render` - отобразить модальное окно с переданным содержимым.


#### Класс `Form<Type>`

Общий класс для форм. 
Предоставляет общие инструменты для работы с отображением элементов формы.

**Конструктор**

`constructor(container: HTMLFormElement, events: IEvents)` 

- принимает в качестве аргументов форму и объект брокера событий.

**Поля**

- `submit` - элемент кнопки сабмита формы;
- `errors` - элемент сообщений об ошибке валидации формы.

**Методы**

- `onInputChange` - проверка изменения инпута формы;
- `set valid` - сеттер, устанавливающий состояние кнопки сабмита;
- `set errors` - сеттер, устанавливающий сообщения об ошбиках валидации;
- `render` - отобразить форму с заданным состоянием.


#### Класс `ContactsForm`

Реализует форму ввода контактов пользователя. 

**Конструктор**

`constructor(container: HTMLFormElement, events: IEvents)` 

- принимает в качестве аргументов форму и объект брокера событий.

**Поля**

- `email` - элемент ввода электронной почты;
- `phone` - элемент ввода телефона.

**Методы**

- `set email` - сеттер, устанавливающий данные в поле `email`;
- `set phone` - сеттер, устанавливающий данные в поле `phone`.


#### Класс `OrderForm`

Реализует форму отправки заказа. 

**Конструктор**

`constructor(container: HTMLFormElement, events: IEvents)` 

- принимает в качестве аргументов форму и объект брокера событий.

**Поля**

- `paymentCard` - элемент кнопки выбора оплаты картой;
- `paymentCash` - элемент кнопки выбора оплаты при получении заказа;
- `address` - элемент ввода адреса.

**Методы**

- `set payment` - сеттер, устанавливающий классы для кнопок `paymentCard` и `paymentCash`;
- `set address` - сеттер, устанавливающий данные в поле `addreess`.


#### Класс `OrderSuccess`

Реализует отображение успешного оформления заказа в модальном окне. 

**Конструктор**

`constructor(container: HTMLElement, actions: IOrderSuccessActions)` 

- принимает в качестве аргумента DOM-элемент окна на базе шаблона и опциональный объект событий.

**Поля**

- `total` - элемент общей суммы заказа;
- `button` - элемент кнопки закрытия.

**Методы**

- `set total` - сеттер, устанавливающий общую сумму заказа.
