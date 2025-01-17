import { IProduct } from "../..";

export type TCard = Omit<IProduct, 'id'>;

export interface ICardActions {
    onClick: (event: MouseEvent) => void;
  }
