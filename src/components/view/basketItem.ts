import { View } from '../base/view';
import { IBasketItem } from '../../types/components/veiw/basketItem';
import { IBasketItemActions } from '../../types/components/veiw/basketItem';
import { ensureElement } from '../../utils/utils';

export class BasketItem extends View<IBasketItem> {
	protected _index: HTMLElement;
	protected _tilte: HTMLElement;
	protected _price: HTMLElement;
	protected _deleteButton: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: IBasketItemActions) {
		super(container);

		this._tilte = ensureElement<HTMLElement>('.card__title', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._index = ensureElement<HTMLElement>('.basket__item-index', container);
		this._deleteButton = container.querySelector('.card__button');

		if (actions.onClick) {
			if (this._deleteButton) {
				container.removeEventListener('click', actions.onClick);
				this._deleteButton.addEventListener('click', actions.onClick);
			}
		}
	}

	set index(value: number) {
		this.setText(this._index, String(value));
	}

	set title(value: string) {
		this.setText(this._tilte, value);
	}

	set price(value: number | null) {
		if (value === null) {
			this.setText(this._price, 'Бесценно');
		} else {
			this.setText(this._price, `${value} синапсов`);
		}
	}
}
