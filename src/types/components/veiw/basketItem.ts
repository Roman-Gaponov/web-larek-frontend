export interface IBasketItem {
	index: number;
	title: string;
	price: number;
}

export interface IBasketItemActions {
	onClick: (event: MouseEvent) => void;
}
