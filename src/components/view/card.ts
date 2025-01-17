import { View } from '../base/view';
import { TCard, ICardActions } from '../../types/components/veiw/card';
import { ensureElement } from '../../utils/utils';
import { categories } from '../../utils/constants';

export class Card<Type> extends View<TCard> {
	protected _title: HTMLElement;
	protected _category?: HTMLElement;
	protected _image: HTMLImageElement;
	protected _price: HTMLElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);

		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._category = ensureElement<HTMLElement>('.card__category', container);
		this._image = ensureElement<HTMLImageElement>('.card__image', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);

		if (actions.onClick) {
			container.addEventListener('click', actions.onClick);
		}
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set category(value: string) {
		this.setText(this._category, value);
		if (this._category) {
			this._category.classList.add(
				`card__category_${categories[value] ?? 'other'}`
			);
		}
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}
}
