import {
    combine,
    createEvent,
    createStore,
    merge,
    createEffect,
} from 'effector-logger';
import { products$ } from './products.store';

export const CartEvents = {
    productAddedToCart: createEvent<{ id: string }>(),
    productRemovedFromCart: createEvent<{ id: string }>(),
};

type ProductsInCartRecord = {
    [productID: string]: number;
};

const cartProducts$ = createStore<ProductsInCartRecord>({})
    .on(CartEvents.productAddedToCart, (state, payload) => {
        return {
            ...state,
            [payload.id]: state[payload.id] ? state[payload.id] + 1 : 1,
        };
    })
    .on(CartEvents.productRemovedFromCart, (state, payload) => {
        const newState = { ...state };
        delete newState[payload.id];

        return newState;
    });

const Effects = {
    addProductFx: createEffect(async (id: string) => {
        // Fetch POST

        await new Promise((res) => setTimeout(res, 1000));
    }),

    removeProductFx: createEffect(async (id: string) => {
        // Fetch DELETE
        await new Promise((res) => setTimeout(res, 1000));
    }),
};

CartEvents.productAddedToCart.watch((payload) =>
    Effects.addProductFx(payload.id),
);
CartEvents.productRemovedFromCart.watch((payload) =>
    Effects.removeProductFx(payload.id),
);

const cartProductsArray$ = cartProducts$.map((productsRecord) =>
    Object.entries(productsRecord).map(([productID, productCount]) => {
        return {
            id: productID,
            count: productCount,
        };
    }),
);

const pendingEffectsCombined = merge([
    Effects.addProductFx,
    Effects.removeProductFx,
]);
const doneEffectsCombined = merge([
    Effects.addProductFx.finally,
    Effects.removeProductFx.finally,
]);

// Views

export const loading$ = createStore(false)
    .on(pendingEffectsCombined, () => true)
    .on(doneEffectsCombined, () => false);

export const cartProductsView$ = combine(
    {
        allProducts: products$,
        cartProductsArr: cartProductsArray$,
    },
    ({ cartProductsArr, allProducts }) => {
        return cartProductsArr.map((cartProduct) => ({
            ...cartProduct,
            ...allProducts.find((p) => p.id === cartProduct.id)!,
        }));
    },
);

export const totalPrice$ = cartProductsView$.map((products) =>
    products.reduce(
        (price, product) => price + product.price * product.count,
        0,
    ),
);
