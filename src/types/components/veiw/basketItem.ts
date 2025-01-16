export interface IBasketItem {
	index: HTMLElement;
	title: HTMLElement;
	price: HTMLElement;
	deleteButton: HTMLElement;
}

export interface IBasketItemActions {
	onClick: (event: MouseEvent) => void;
}