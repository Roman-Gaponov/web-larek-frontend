import { View } from '../base/view';
import {
	IOrderSuccess,
	IOrderSuccessActions,
} from '../../types/components/veiw/orderSuccess';
import { ensureElement } from '../../utils/utils';

export class OrderSuccess extends View<IOrderSuccess> {
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: IOrderSuccessActions) {
		super(container);

		this._button = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			this.container
		);
		this._total = ensureElement<HTMLElement>(
			'.order-success__desctiption',
			this.container
		);

		if (actions.onClick) {
			this._button.addEventListener('click', actions.onClick);
		}
	}

	set total(value: string) {
		this._total.textContent = `Списано ${value} синапсов`;
	}
}
