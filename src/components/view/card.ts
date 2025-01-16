import { View } from '../base/view';
import { ICard, ICardActions } from '../../types/components/veiw/card';
import { IProduct } from '../../types';
import { ensureElement } from '../../utils/utils';

export class Card<Type> extends View<ICard> {
	protected _title: HTMLElement;
	protected _category: HTMLElement;
	protected _image: HTMLElement;
	protected _price: HTMLElement;
	protected _categoryColor = <Record<string, string>>{
		'софт-скил': 'soft',
		'хард-скил': 'hard',
		'кнопка': 'button',
		'дополнительное': 'additional',
		'другое': 'other',
	};

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);

    this._title = ensureElement<HTMLElement>('.card__title', container);
    this._category = ensureElement<HTMLElement>('.card__category', container);
    this._image = ensureElement<HTMLElement>('.card__image', container);
    this._price = ensureElement<HTMLElement>('.card__price', container);

    if (actions?.onClick) {
      container.addEventListener('click', actions.onClick);
    }
	}

  
}
