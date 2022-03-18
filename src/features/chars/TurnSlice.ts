import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitiativeState {
    currentTurn: number
}

const initialState: InitiativeState = { // TODO clean this up
    currentTurn: 0
}

export const turnSlice = createSlice({
    name: 'turn',
    initialState: initialState,
    reducers: {
        advanceTurn: state => {
            state.currentTurn++
        },
        resetTurn: state => {
            state.currentTurn = 0
        }
    },
})

// Action creators are generated for each case reducer function
export const { advanceTurn, resetTurn } = turnSlice.actions

export default turnSlice.reducer