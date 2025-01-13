import { IEvents } from '../../types/components/base/events';

// базовый абстрактный класс для создания и отображения компонентов пользовательского интерфейса.
// содержит основные методы для работы с компонентами отображения.
export abstract class View<Type> {
	constructor(protected readonly container: HTMLElement, protected readonly events?: IEvents) {}

	// установить текст
	protected setText(element: HTMLElement, value: string): void {
		element.textContent = value;
	}

	// установить изображение и альтернативный текст
	protected setImage(
		element: HTMLImageElement,
		src: string,
		alt: string
	): void {
		element.src = src;
		element.alt = alt;
	}

	// переключить класс элемента
	toggleClass(element: HTMLElement, className: string, force?: boolean): void {
		element.classList.toggle(className, force);
	}

	// установить состояние элемента
	setDisabled(element: HTMLElement, state?: boolean): void {
		if (state) {
			element.setAttribute('disabled', 'disabled');
		} else {
			element.removeAttribute('disabled');
		}
	}

	// скрыть элемент
	setHidden(element: HTMLElement): void {
		element.style.display = 'none';
	}

	// отобразить элемент
	setVisible(element: HTMLElement): void {
		element.style.removeProperty('display');
	}

	// отобразить элемент с переданными параметрами
	render(data?: Partial<Type>): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}
}
