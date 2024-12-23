import { configureStore } from '@reduxjs/toolkit'
import characterReducer from '../features/chars/CharactersSlice'

function loadStore() {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}

function saveStore(state: any) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // do nothing
    }
}

export const store = configureStore({
    reducer: characterReducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: loadStore()
})

store.subscribe(() => {
    saveStore(store.getState())
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch