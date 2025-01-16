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

const events = new EventEmitter();
const api = new ApiExtended(CDN_URL, API_URL);

// мониторинг событий в консоли для отладки
events.onAll(({ eventName, data }) => {
  console.log(eventName, data);
})

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
const modal = new Modal(ensureElement<HTMLTemplateElement>('#modal-container'), events);

// переиспользуемые части интерфейса
const basket = new Basket(events);
const orderForm = new OrderForm(cloneTemplate(orderTemplate), events);
const contactsForm = new OrderForm(cloneTemplate(contactsTemplate), events);


// бизнес-логика
