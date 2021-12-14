import { createStore } from 'effector';
import { times, random } from 'lodash';

type Product = {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
};

const productType = ['jeans', 'coffee', 'flower', 'car'];

const genProducts = (count: number): Product[] => {
    return times(count).map(
        (index): Product => ({
            id: `${index}`,
            imageUrl: `https://loremflickr.com/g/320/240/${productType[index]}`,
            price: random(50, 150),
            name: `Product ${productType[index]}`,
        }),
    );
};

export const products$ = createStore<Product[]>(genProducts(4));

