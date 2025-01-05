export interface IForm {
    submit: HTMLButtonElement;
    errors: HTMLElement;

    isInputChanged(field: any): void;
    render(): void;
}
