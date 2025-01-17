import { Api } from '../base/api';
import { ApiListResponse } from '../../types/components/base/api';
import { TOrderModel, IProduct, TOrderResult } from '../../types';
import { IApiExtended } from '../../types/components/model/apiExtended';

export class ApiExtended extends Api implements IApiExtended {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

  // получить данные о товаре по его id
	getProduct(id: string): Promise<IProduct> {
		return this.get(`/product/${id}`).then((item: IProduct) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

  // получить список всех товаров
	getProductList(): Promise<IProduct[]> {
		return this.get(`/product/`).then((data: ApiListResponse<IProduct>) =>
			data.items.map((item: IProduct) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

  //отправить сформированный заказ на сервер
	postOrder(order: TOrderModel): Promise<TOrderResult> {
		return this.post('/order', order).then((data: TOrderResult) => data);
	}
}
