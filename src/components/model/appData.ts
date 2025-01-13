import { EMAIL_REGEXP, PHONE_REGEXP } from '../../utils/constants';
import { Model } from '../base/model';
import { IAppData } from '../../types/components/model/appData';
import {
	IProduct,
	TBasketModel,
	TOrderModel,
	FormErrors,
	TContactsForm,
	TOrderForm,
	PaymentMethod,
} from '../../types';

class AppData extends Model<IAppData> {
	catalog: IProduct[];
	//preview: IProduct | null = null;
	preview: string;
	basket: TBasketModel = {
		items: [],
		total: 0,
	};
	order: TOrderModel = {
		items: [],
		email: '',
		phone: '',
		address: '',
		payment: 'card',
		//total: 0,
	};
	formErrors: FormErrors = {};

	setCatalog(items: IProduct[]): void {
		this.catalog = items;
		this.events.emit('catalog:changed', { catalog: this.catalog });
	}

	setPreview(item: IProduct): void {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	setProductToBasket(item: IProduct): void {
		this.basket.items.push(item.id);
	}

	setContactsField(field: keyof TContactsForm, value: string): void {
		this.order[field] = value;
	}

	setOrderField(field: keyof TOrderForm, value: string): void {
		if (field === 'payment') {
			this.setPaymentMethod(value as PaymentMethod);
		} else {
			this.order[field] = value;
		}
	}

	setPaymentMethod(method: PaymentMethod): void {
		this.order.payment = method;
	}

	setTotal(value: number): void {
		this.order.total = value;
	}

	removeProductFromBasket(item: IProduct): void {
		this.basket.items = this.basket.items.filter((id) => id !== item.id);
		this.basket.total -= item.price;
		this.events.emit('basket:changed', this.basket);
	}

	clearBasket(): void {
		this.basket.items = [];
		this.basket.total = 0;
		this.events.emit('basket:changed');
	}

	clearOrder(): void {
		this.order = {
			email: '',
			phone: '',
			address: '',
			payment: 'card',
		};
	}

	validateOrder(): boolean {
		const errors: typeof this.formErrors = {};
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		this.formErrors = errors;
		this.events.emit('orderFormErrors:changed', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	validateContacts(): boolean {
		const errors: typeof this.formErrors = {};
		if (!this.order.address) {
			errors.email = 'Необходимо указать email';
		} else if (!EMAIL_REGEXP.test(this.order.email)) {
			errors.email = 'Неправильно указан email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		} else if (!PHONE_REGEXP.test(this.order.phone)) {
			errors.phone = 'Неправильно указан телефон';
		}
		this.formErrors = errors;
		this.events.emit('contactsFormErrors:changed', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	isInBasket(item: IProduct): boolean {
		return this.basket.items.includes(item.id);
	}

	//getBasketList(): IProduct[] {}

	getTotal(): number {
		return this.basket.total;
	}
}
