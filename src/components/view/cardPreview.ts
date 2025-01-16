import { Card } from './card';
import { ICardPreview } from '../../types/components/veiw/cardPreview';
import { ICardActions } from '../../types/components/veiw/card';
import { ensureElement } from '../../utils/utils';

export class CardPreview extends Card<ICardPreview> {
	protected _text: HTMLElement;
	protected _button: HTMLElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container, actions);

		this._text = ensureElement<HTMLElement>('.card__text', container);
		this._button = container.querySelector('.card__button');

		if (actions.onClick) {
			if (this._button) {
				container.removeEventListener('click', actions.onClick);
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set text(value: string) {
		this.setText(this._text, value);
	}
}
