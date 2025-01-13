export interface IModal {
	content: HTMLElement;
	open(): void;
	close(): void;
	render(data: IModalData): HTMLElement;
}

export interface IModalData {
	content: HTMLElement;
}
