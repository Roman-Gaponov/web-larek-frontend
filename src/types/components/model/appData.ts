import { IProduct, IOrder, PaymentMethod, FormErrors } from '../..';

export interface IAppData {
	catalog: IProduct[];
	basket: IProduct[];
	//preview: IProduct | null;
	preview: string;
	order: IOrder;
	formErrors: FormErrors;
	
	setCatalog(items: IProduct[]): void;
	setPreview(item: IProduct): void;
	setProductToBasket(item: IProduct): void;
	setContactsField(field: keyof IOrder, value: string): void;
	setOrderField(field: keyof IOrder, value: string): void;
	setPaymentMethod(method: PaymentMethod): void;
	setTotal(value: number): void;
	removeProductFromBasket(item: IProduct): void;
	clearBasket(): void;
	validateOrder(): void;
	validateContacts(): void;
	isInBasket(item: IProduct): boolean;
	getBasketList(): IProduct[];
	getTotal(): void;
}
