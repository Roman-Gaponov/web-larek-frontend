//
interface IOrder {
    id: string;
    total: number;
} 

//
// interface IProduct {
//     id: string;
//     title: string;
// }

// 
interface IProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

// 
interface IBasketModel {
    items: Map<string, number>;
    add(id: string): void;
    remove(id: string): void;
}

//
interface CatalogModel {
    items: IProductItem[];
    setItems(items: IProductItem): void;
    getProduct(id:string): IProductItem;
}

export { IOrder, IProductItem }

