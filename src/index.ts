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
import { IProduct } from './types';

const events = new EventEmitter();
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
const basket = new Basket(events);
const modal = new Modal(
	ensureElement<HTMLTemplateElement>('#modal-container'),
	events
);

// переиспользуемые части интерфейса
const orderForm = new OrderForm(cloneTemplate(orderTemplate), events);
const contactsForm = new OrderForm(cloneTemplate(contactsTemplate), events);
const success = new OrderSuccess(cloneTemplate(successTemplate), {
	onClick: () => modal.close(),
});

// бизнес-логика

events.on('items:chaged', (items: IProduct[]) => {
	page.catalog = items.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render(item);
	});
});

events.on('card:select', (item: IProduct) => {
	appData.setPreview(item);
});

//
events.on('preview:changed', (item: IProduct) => {
	const card = new CardPreview(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			if (appData.isInBasket(item)) {
				appData.removeProductFromBasket(item);
				card.deleteButton = 'В корзину';
			} else {
				appData.setProductToBasket(item);
				card.deleteButton = 'Удалить из корзины';
			}
		},
	});

	if (appData.isInBasket(item)) {
		card.button = 'Удалить из корзины';
	} else {
		card.button = 'В корзину';
	}

	modal.render({
		content: card.render(item),
	});
});

//
events.on('basket:changed', () => {
	page.counter = appData.basket.items.length;
	basket.items = appData.basket.items.map((id) => {
		const item = appData.items.find((item) => item.id === id);
		const card = new Card(cloneTemplate(cardBasketTemplate), {
			onClick: () => appData.removeProductFromBasket(item),
		});

		return card.render(item);
	});

	basket.total = appData.basket.total;
});

//
events.on('basket:open', () => {
	modal.render({
		content: basket.render(),
	});
});

//
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

//
events.on('order:submit', () => {
	appData.clearOrder();
	modal.render({
		content: orderForm.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on('contacts:submit', () => {
	api.postOrder({ ...appData.order, ...appData.basket }).then((data) => {
		modal.render({
			content: success,
		});
	});
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
