import { configureStore } from '@reduxjs/toolkit'
import characterReducer from '../features/chars/CharactersSlice'
import initiavesReducer from "../features/chars/Initiatives"
import turnReducer from "../features/chars/TurnSlice"

export const store = configureStore({
    reducer: { characterReducer, initiavesReducer, turnReducer },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch