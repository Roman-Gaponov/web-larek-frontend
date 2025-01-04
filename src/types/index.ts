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
interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

// 
interface IBasket {
    items: Map<string, number>;
    add(id: string): void;
    remove(id: string): void;
}

//
interface CatalogModel {
    items: IProduct[];
    setItems(items: IProduct): void;
    getProduct(id:string): IProduct;
}

export { IOrder, IProduct }

