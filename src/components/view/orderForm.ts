import { Form } from "./form";
// import { IContactsForm } from "../../types/components/veiw/contactsForm";
import { TOrderForm } from "../../types";
import { IEvents } from "../../types/components/base/events";
import { ensureElement } from "../../utils/utils";

export class OrderForm extends Form<TOrderForm> {
  protected _paymentCard: HTMLButtonElement;
  protected _paymentCash: HTMLButtonElement;
  protected _address: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
  }
  
  
}
