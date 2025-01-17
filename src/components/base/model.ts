import { IEvents } from '../../types/components/base/events';

// базовый абстрактный класс модели, объединяющий данные неявного типа и привязывающий события.
export abstract class Model<Type> {
	constructor(data: Partial<Type>, protected events?: IEvents) {
		Object.assign(this, data);
	}

	protected emitChanges?(event: string, data?: object):void {
		this.events.emit(event, data ?? {});
	}
}
