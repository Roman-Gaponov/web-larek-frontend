import { Card } from './card';
import { ICardPreview } from '../../types/components/veiw/cardPreview';
import { ICardActions } from '../../types/components/veiw/card';
import { IProduct } from '../../types';
import { ensureElement } from '../../utils/utils';

export class CardPreview extends Card<ICardPreview> {
	protected _description?: HTMLElement;
	protected _button?: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container, actions);

		this._description = ensureElement<HTMLElement>('.card__text', container);
		this._button = container.querySelector('.card__button');

		if (actions.onClick) {
			if (this._button) {
				container.removeEventListener('click', actions.onClick);
				this._button.addEventListener('click', actions.onClick);
			}
		}
	}

	setNotForSale(item:IProduct) {
		if(!item.price) {
			this.button = 'Не продаётся';
			this._button.setAttribute('disabled', 'true');
		}
  }

	set description(value: string) {
		this.setText(this._description, value);
	}

	set button(value: string) {
		this.setText(this._button, value);
	}
}
