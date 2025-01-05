import { IProduct } from '../..';

export interface ICardPreview {
	description: HTMLElement;
	button: HTMLButtonElement;

	isNotForSale(item: IProduct): boolean;
}
