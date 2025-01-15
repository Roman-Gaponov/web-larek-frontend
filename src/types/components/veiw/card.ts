export interface ICard {
    title: HTMLElement;
    category?: HTMLElement;
    image: HTMLElement;
    price: HTMLElement;
}

export interface ICardActions {
    onClick: (event: MouseEvent) => void;
  }
