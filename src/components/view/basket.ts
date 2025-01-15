import { View } from '../base/view';
import { IBasketView } from '../../types/components/veiw/basket';
import { IEvents } from '../../types/components/base/events';
import { cloneTemplate, createElement, ensureElement } from '../../utils/utils';

export class Basket extends View<IBasketView> {
	static template = ensureElement<HTMLTemplateElement>('#basket');

	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLElement;

	constructor(protected events: IEvents) {
		super(cloneTemplate(Basket.template), events);

		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.basket__button');

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('order:open');
			});
		}

		this.items = [];
	}

	toggleButton(state: boolean) {
		this.setDisabled(this._button, !state);
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
			this.toggleButton(true);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
			this.toggleButton(false);
		}
	}

	set total(total: number) {
		this.setText(this._total, `${total} синапсов`);
	}
}
