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
	items?: string[];
	email?: string;
	phone?: string;
	address?: string;
	payment?: PaymentMethod;
	total?: number;
}

// тип для ответа сервера при отправки сформированного заказа
type TOrderResult = Omit<IOrder, 'id' | 'total'>;

// тип выбора метода оплаты
type PaymentMethod = 'card' | 'cash';

// тип ошибок формы
type FormErrors = Partial<Record<keyof IOrder, string>>;

export { IProduct, IOrder, TOrderResult, PaymentMethod, FormErrors };
