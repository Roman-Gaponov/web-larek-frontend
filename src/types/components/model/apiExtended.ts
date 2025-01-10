import { IProduct, IOrder, TOrderResult } from '../..';

export interface IApiExtended {
	readonly cdn: string;
	getProduct(id: string): Promise<IProduct>;
	getProductList(): Promise<IProduct[]>;
	postOrder(order: IOrder): Promise<TOrderResult>;
}
