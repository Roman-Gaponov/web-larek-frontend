import { View } from '../base/view';
import { IPage } from '../../types/components/veiw/page';
import { IEvents } from '../../types/components/base/events';
import { ensureElement } from '../../utils/utils';

export class Page extends View<IPage> {
	protected _catalog: HTMLElement;
	protected _counter: HTMLElement;
	protected _basket: HTMLElement;
	protected _wrapper: HTMLElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

    this._catalog = ensureElement<HTMLElement>('.gallery');
    this._counter = ensureElement<HTMLElement>('.header__basket-counter');
    this._basket = ensureElement<HTMLElement>('.header__basket');
    this._wrapper = ensureElement<HTMLElement>('.header__wrapper');
	}

	set catalog(items: HTMLElement[]) {
		this._catalog.replaceChildren(...items);
	}

	set counter(value: number) {
		this.setText(this._counter, String(value));
	}

	set locked(value: boolean) {
		this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
	}
}
