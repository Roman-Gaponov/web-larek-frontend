/* ИМПОРТЫ */

import './scss/styles.scss';

import { AppData } from './components/model/appData';
import { ApiExtended } from './components/model/apiExtended';
import { EventEmitter } from './components/base/events';
import { Page } from './components/view/page';
import { Modal } from './components/view/modal';
import { Card } from './components/view/card';
import { CardPreview } from './components/view/cardPreview';
import { Basket } from './components/view/basket';
import { BasketItem } from './components/view/basketItem';
import { OrderForm } from './components/view/orderForm';
import { ContactsForm } from './components/view/contactsForm';
import { OrderSuccess } from './components/view/orderSuccess';

import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { IProduct, TOrderForm, TContactsForm } from './types';

/* НАСТРОЙКИ */

// обработчик событий
const events = new EventEmitter();

// для работы с сервером
const api = new ApiExtended(CDN_URL, API_URL);

// мониторинг событий в консоли для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// шаблоны
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

// модель данных
const appData = new AppData({}, events);

// глобальные контрейнеры
const page = new Page(document.body, events);
const modal = new Modal(
	ensureElement<HTMLTemplateElement>('#modal-container'),
	events
);

// переиспользуемые части интерфейса
const basket = new Basket(
	cloneTemplate<HTMLTemplateElement>(basketTemplate),
	events
);
const orderForm = new OrderForm(
	cloneTemplate<HTMLFormElement>(orderTemplate),
	events
);
const contactsForm = new ContactsForm(
	cloneTemplate<HTMLFormElement>(contactsTemplate),
	events
);
const success = new OrderSuccess(
	cloneTemplate<HTMLTemplateElement>(successTemplate),
	{
		onClick: () => modal.close(),
	}
);

/* БИЗНЕС-ЛОГИКА */

// изменились элементы каталога
events.on('catalog:change', (items: IProduct[]) => {
	page.catalog = items.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render(item);
	});
});

// выбрана карточка для превью
events.on('card:select', (item: IProduct) => {
	appData.setPreview(item);
});

// отобразить данные карточки в модальном окне
events.on('preview:change', (item: IProduct) => {
	const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			if (appData.isInBasket(item)) {
				appData.removeProductFromBasket(item);
				cardPreview.button = 'Купить';
			} else {
				appData.setProductToBasket(item);
				cardPreview.button = 'Убрать';
			}
			setTimeout(() => {modal.close()}, 300);
		},
	});

	if (appData.isInBasket(item)) {
		cardPreview.button = 'Убрать';
	} else {
		cardPreview.button = 'Купить';
	}

	cardPreview.setNotForSale(item);
	
	modal.render({
		content: cardPreview.render(item),
	});
});

// изменились данные в корзине
events.on('basket:change', () => {
	page.counter = appData.basket.items.length;
	let i = 1;
	basket.items = appData.basket.items.map((id) => {
		const item = appData.catalog.find((item) => item.id === id);
		const basketItem = new BasketItem(cloneTemplate(cardBasketTemplate), {
			onClick: () => appData.removeProductFromBasket(item),
		});
		return basketItem.render({
			title: item.title,
			price: item.price,
			index: i++,
		});
	});
	basket.total = appData.getTotal();
});

// открыта корзина
events.on('basket:open', () => {
	modal.render({
		content: basket.render(),
	});
});

// открыть форму заказа
events.on('order:open', () => {
	appData.clearOrder();
	modal.render({
		content: orderForm.render({
			payment: 'card',
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

// отправить форму заказа
events.on('order:submit', () => {
	modal.render({
		content: contactsForm.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
});

// отправить форму с контактными данными и оформленный заказ на сервер
events.on('contacts:submit', () => {
	api
		.postOrder({ ...appData.order, ...appData.basket })
		.then((data) => {
			console.log(data);
			modal.render({
				content: success.render({ total: appData.getTotal() }),
			});
			appData.clearBasket();
			appData.clearOrder();
		})
		.catch((err) => console.error(err));
});

// изменилось одно из полей формы заказа
events.on(
	/^order\..*:change$/,
	(data: { field: keyof TOrderForm; value: string }) => {
		appData.setOrderField(data.field, data.value);
		appData.validateOrder();
	}
);

// изменилось одно из полей формы контактных данных
events.on(
	/^contacts\..*:change$/,
	(data: { field: keyof TContactsForm; value: string }) => {
		appData.setContactsField(data.field, data.value);
		appData.validateContacts();
	}
);

// изменилось состояние валидации формы заказа
events.on('orderFormErrors:change', (error: TOrderForm) => {
	const { payment, address } = error;
	const formIsValid = !payment && !address;
	orderForm.valid = formIsValid;
	
	if (!formIsValid) {
		orderForm.errors = address;
	} else {
		orderForm.errors = '';
	}
});

// изменилось состояние валидации формы контактных данных
events.on('contactsFormErrors:change', (error: TContactsForm) => {
	const { email, phone } = error;
	const formIsValid = !email && !phone;
	contactsForm.valid = formIsValid;

	if (!formIsValid) {
		contactsForm.errors = email || phone;
	} else {
		contactsForm.errors = '';
	}
});

// блокируем прокрутку страницы, если отрыто модальное окно
events.on('modal:open', () => {
	page.locked = true;
});

// снимаем блокировку прокрутки страницы при закрытии модального окна
events.on('modal:close', () => {
	page.locked = false;
});

// получаем каталог товаров с сервера
api
	.getProductList()
	.then(appData.setCatalog.bind(appData))
	.catch((err) => console.error(err));
