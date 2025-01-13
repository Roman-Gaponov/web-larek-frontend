import { IProduct, TBasketModel, TOrderModel, TContactsForm, TOrderForm, PaymentMethod, FormErrors } from '../..';

export interface IAppData {
	catalog: IProduct[];
	//preview: IProduct | null;
	preview: string;
	basket: TBasketModel;
	order: TOrderModel;
	formErrors: FormErrors;
	
	setCatalog(items: IProduct[]): void;
	setPreview(item: IProduct): void;
	setProductToBasket(item: IProduct): void;
	setContactsField(field: keyof TContactsForm, value: string): void;
	setOrderField(field: keyof TOrderForm, value: string): void;
	setPaymentMethod(method: PaymentMethod): void;
	setTotal(value: number): void;
	removeProductFromBasket(item: IProduct): void;
	clearBasket(): void;
	clearOrder(): void;
	validateOrder(): boolean;
	validateContacts(): boolean;
	isInBasket(item: IProduct): boolean;
	getBasketList(): IProduct[];
	getTotal(): number;
}
