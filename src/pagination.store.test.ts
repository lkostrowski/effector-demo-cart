import { PaginationStore } from './pagination.store';

describe('PaginationStore', () => {
    let store: PaginationStore;

    beforeEach(() => {
        store = new PaginationStore();
    });

    it('Has deafult values for limit and page', () => {
        expect(store.limit$.getState()).toBe(20);
        expect(store.page$.getState()).toBe(1);
    });

    it('Computes offset by multiplying page and limit', () => {
        expect(store.offset$.getState()).toBe(20);
    });

    it('Will update page and offset, when page incremented and decremented', () => {
        store.incrementPage()

        expect(store.page$.getState()).toBe(2)
        expect(store.offset$.getState()).toBe(40)

        store.decrementPage()

        expect(store.page$.getState()).toBe(1)
        expect(store.offset$.getState()).toBe(20)
    });

    it('Updates limit and offset when limit changes', () => {
        store.setLimit(50)

        expect(store.limit$.getState()).toBe(50)
        expect(store.offset$.getState()).toBe(50)

        store.setLimit(20)

        expect(store.limit$.getState()).toBe(20)
        expect(store.offset$.getState()).toBe(20)
    })

    test('Pagination starts with page 1 and limit 20 and can be set to page 3 and limit 50. Offset will be set from 20 to 150', () => {
        expect(store.page$.getState()).toBe(1)
        expect(store.limit$.getState()).toBe(20)
        expect(store.offset$.getState()).toBe(20)

        store.incrementPage()
        store.incrementPage()
        store.setLimit(50)

        expect(store.page$.getState()).toBe(3)
        expect(store.limit$.getState()).toBe(50)
        expect(store.offset$.getState()).toBe(150)
    })
});
