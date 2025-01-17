import { Card } from './card';
import { ICardPreview } from '../../types/components/veiw/cardPreview';
import { ICardActions } from '../../types/components/veiw/card';
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
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set button(value: string) {
		this.setText(this._button, value);
	}
}
