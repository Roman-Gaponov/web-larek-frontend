import { View } from '../base/view';
import {
	IOrderSuccess,
	IOrderSuccessActions,
} from '../../types/components/veiw/orderSuccess';
import { IEvents } from '../../types/components/base/events';
import { ensureElement } from '../../utils/utils';

export class OrderSuccess extends View<IOrderSuccess> {
	protected _total: HTMLElement;
	protected _close: HTMLElement;

	constructor(container: HTMLElement, actions: IOrderSuccessActions) {
		super(container);

		this._close = ensureElement<HTMLElement>(
			'.order-success__close',
			this.container
		);
		this._total = ensureElement<HTMLElement>(
			'.order-success__desctiption',
			this.container
		);

		if (actions.onClick) {
			this._close.addEventListener('click', actions.onClick);
		}
	}

	set total(value: string) {
		this._total.textContent = `Списано ${value} синапсов`;
	}
}
