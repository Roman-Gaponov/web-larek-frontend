import { Model } from "../base/model";
import { IAppData } from "../../types/components/model/appData";
import { IProduct, TOrderModel, FormErrors } from "../../types";

class AppData extends Model<IAppData> {
    catalog: IProduct[];
	basket: IProduct[] = [];
	//preview: IProduct | null = null;
    preview: string;
	order: TOrderModel = {
        items: [],
        email: '',
        phone: '',
        address: '',
        payment: 'card',
        total: 0,
    };
	formErrors: FormErrors = {};
	
	setCatalog(items: IProduct[]): void {
        this.catalog = items;
        this.events.emit('catalog:changed', {catalog: this.catalog});
    }

	setPreview(item: IProduct): void {
        this.preview = item.id;
        this.emitChanges('preview:changed', item);
    }

	setProductToBasket(item: IProduct): void {

    }

	setContactsField(field: keyof IOrder, value: string): void {

    }

	setOrderField(field: keyof IOrder, value: string): void {

    }

	setPaymentMethod(method: PaymentMethod): void {

    }

	setTotal(value: number): void {

    }

	removeProductFromBasket(item: IProduct): void {

    }

	clearBasket(): void {

    }

	validateOrder(): void {

    }

	validateContacts(): void {

    }

	isInBasket(item: IProduct): boolean {

    }

	getBasketList(): IProduct[] {

    }

	getTotal(): void {

    }
}



