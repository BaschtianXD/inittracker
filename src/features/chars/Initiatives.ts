import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitiativeState {
    initiatives: (number | undefined)[]
}

const initialState: InitiativeState = { // TODO clean this up
    initiatives: []
}

interface SetInitiativePayload {
    characterIndex: number,
    initiative?: number
}

export const initiativeSlice = createSlice({
    name: 'initiative',
    initialState: initialState,
    reducers: {
        setInitiative: (state, action: PayloadAction<SetInitiativePayload>) => {
            state.initiatives[action.payload.characterIndex] = action.payload.initiative
        },
        clearInitiatives: (state) => {
            state.initiatives = []
        }
    },
})

// Action creators are generated for each case reducer function
export const { setInitiative, clearInitiatives } = initiativeSlice.actions

export default initiativeSlice.reducer