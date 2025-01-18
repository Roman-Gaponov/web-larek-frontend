import { View } from '../base/view';
import { IBasketView } from '../../types/components/veiw/basket';
import { IEvents } from '../../types/components/base/events';
import { createElement, ensureElement } from '../../utils/utils';

export class Basket extends View<IBasketView> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container, events);

		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		// this._list = this.container.querySelector('.basket__list');
		this._total = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.basket__button');

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('order:open');
			});
		}

		this.items = [];
	}

	protected setButtonState(state: boolean): void {
		this.setDisabled(this._button, !state);
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
			this.setButtonState(true);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
			this.setButtonState(false);
		}
	}

	set total(total: number) {
		this.setText(this._total, `${total} синапсов`);
	}
}
