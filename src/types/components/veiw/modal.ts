export interface IModal {
	content: HTMLElement;
	closeButton: HTMLButtonElement;
	open(): void;
	close(): void;
	render(data: HTMLElement): void;
}
