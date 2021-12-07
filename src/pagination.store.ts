import { combine, createDomain, Domain, restore, Event, Store } from 'effector';
import { useStore } from 'effector-react';

export class PaginationStore {
    private domain: Domain;

    decrementPage: Event<void>;
    incrementPage: Event<void>;
    setLimit: Event<number>;

    page$: Store<number>;
    limit$: Store<number>;
    offset$: Store<number>;

    constructor(name = 'Generic pagination') {
        this.domain = createDomain(name);

        this.decrementPage = this.domain.createEvent('Decrement Page');
        this.incrementPage = this.domain.createEvent('Increment Page');
        this.setLimit = this.domain.createEvent<number>('Set Limit');

        this.page$ = this.domain
            .createStore(1, { name: 'Page' })
            .on(this.incrementPage, (current) => {
                return current + 1;
            })
            .on(this.decrementPage, (current) => {
                return Math.max(current - 1, 1);
            });

        this.limit$ = restore(this.setLimit, 20);

        this.offset$ = combine(
            {
                page: this.page$,
                limit: this.limit$,
            },
            ({ page, limit }) => {
                return page * limit;
            },
        );
    }

    use() {
        const page = useStore(this.page$);
        const limit = useStore(this.limit$);
        const offset = useStore(this.offset$);

        return {
            page,
            limit,
            offset,
            incrementPage: this.incrementPage,
            decrementPage: this.decrementPage,
            setLimit: this.setLimit,
        };
    }
}
