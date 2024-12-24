import { configureStore } from '@reduxjs/toolkit'
import characterReducer, { CharacterStateT } from '../features/chars/CharactersSlice'

function loadStore() {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        const parsed = CharacterStateT.parse(JSON.parse(serializedState))
        return parsed
    } catch (err) {
        console.error("Unable to parse stored data: " + JSON.stringify(err))
        return undefined;
    }
}

function saveStore(state: any) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        console.error("Unable to save store: " + JSON.stringify(err))
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