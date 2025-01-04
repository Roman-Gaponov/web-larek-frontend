type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};

type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export { ApiListResponse, ApiPostMethods }