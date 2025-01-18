/* ОБЩИЕ ИНТЕРФЕЙСЫ И ТИПИЗАЦИЯ */

// общий интерфейс для данных по товару
interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

// общий интерфейс заказа
interface IOrder {
	id: string;
	items: string[];
	email: string;
	phone: string;
	address: string;
	payment: PaymentMethod;
	total: number;
}

// тип данных корзины для модели
type TBasketModel = Pick<IOrder, 'items' | 'total'>;

// более гибкий тип для использования в модели данных
type TOrderModel = Partial<IOrder>;

// тип для использования в форме заказа
type TOrderForm = Pick<IOrder, 'payment' | 'address'>;

// тип для использования в форме контактов
type TContactsForm = Pick<IOrder, 'email' | 'phone'>;

// тип для ответа сервера при отправки сформированного заказа
type TOrderResult = Pick<IOrder, 'id' | 'total'>;

// тип выбора метода оплаты
type PaymentMethod = 'card' | 'cash';

// тип ошибок формы
type FormErrors = Partial<Record<keyof IOrder, string>>;

export {
	IProduct,
	IOrder,
	TBasketModel,
	TOrderModel,
	TOrderForm,
	TContactsForm,
	TOrderResult,
	PaymentMethod,
	FormErrors,
};
