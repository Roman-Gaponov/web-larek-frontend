export interface IForm<Type> {
	onInputChange(field: keyof Type, value: string): void;
	render(state: Partial<Type> & IFormState): HTMLFormElement;
}

export interface IFormState {
	valid: boolean;
	errors: string[];
}
