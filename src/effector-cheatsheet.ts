// import { createEvent, createEffect, createStore, combine } from 'effector';
//
// const event = createEvent();
// const effectFX = createEffect(async () => {});
// const store$ = createStore(1);
//
// store$.on(event, (state, payload) => state + 1);
//
// store$.on(effectFX, (state, payload) => {});
// store$.on(effectFX.done, (state, payload) => {});
// store$.on(effectFX.fail, (state, payload) => {});
//
// const times2store$ = store$.map((state) => state * 2);
//
// event.watch(() => {
//     event();
// });
//
// store$.watch(() => {});
//
// const combinedStore$ = combine(
//     {
//         first: store$,
//         second: times2store$,
//     },
//     ({ second, first }) => {
//         return first + second;
//     },
// );
