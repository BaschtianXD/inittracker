import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Character, PartyT } from '../shared'
import { z } from 'zod'

export const CharacterStateT = z.object({
    currentParty: z.number().optional(),
    parties: z.array(PartyT)
})
type CharacterState = z.infer<typeof CharacterStateT>

const demoState: CharacterState = {
    currentParty: 0,
    parties: [
        {
            name: "5 Friends Base",
            characters: [
                {
                    name: "Erokthan",
                    allegiance: "Friendly",
                    type: "Pc"
                },
                {
                    name: "Lini",
                    allegiance: "Friendly",
                    type: "Pc"
                },
                {
                    name: "Seoni",
                    allegiance: "Friendly",
                    type: "Pc"
                },
                {
                    name: "Ayva",
                    allegiance: "Friendly",
                    type: "Pc"
                },
                {
                    name: "Frederich",
                    allegiance: "Friendly",
                    type: "Pc"
                },
            ]
        },
        {
            name: "5 Friends Fight 1",
            characters: [
                {
                    name: "Erokthan",
                    allegiance: "Friendly",
                    type: "Pc"
                },
                {
                    name: "Lini",
                    allegiance: "Friendly",
                    type: "Pc"
                },
                {
                    name: "Seoni",
                    allegiance: "Friendly",
                    type: "Pc"
                },
                {
                    name: "Ayva",
                    allegiance: "Friendly",
                    type: "Pc"
                },
                {
                    name: "Frederich",
                    allegiance: "Friendly",
                    type: "Pc"
                },
                {
                    name: "Troll 1",
                    allegiance: "Enemy",
                    type: "Npc"
                },
                {
                    name: "Troll 2",
                    allegiance: "Enemy",
                    type: "Npc"
                },
                {
                    name: "Mage",
                    allegiance: "Enemy",
                    type: "Npc"
                }
            ]
        }
    ]
}

const initialState: CharacterState = { // TODO clean this up
    currentParty: undefined,
    parties: []
}

export const characterSlice = createSlice({
    name: 'characters',
    initialState: initialState,
    reducers: {
        setCurrentParty: (state, action: PayloadAction<number>) => {
            if (state.parties[action.payload]) {
                state.currentParty = action.payload
            }
        },
        addCharacter: (state, action: PayloadAction<{ partyIndex: number, character: Character }>) => {
            state.parties[action.payload.partyIndex]?.characters.push(action.payload.character)
        },
        removeCharacter: (state, action: PayloadAction<{ partyIndex: number, characterIndex: number }>) => {
            state.parties[action.payload.partyIndex]?.characters.splice(action.payload.characterIndex, 1)
        },
        addEmptyParty: (state, action: PayloadAction<string>) => {
            state.parties.push({
                name: action.payload,
                characters: []
            })
        },
        duplicateParty: (state, action: PayloadAction<number>) => {
            const oldParty = state.parties[action.payload]
            const party = {
                name: "Copy of " + oldParty.name,
                characters: oldParty.characters.map(oldChar => {
                    return {
                        ...oldChar
                    }
                })
            }
            state.parties.push(party)
        },
        removeParty: (state, action: PayloadAction<number>) => {
            if (action.payload === state.currentParty) {
                state.currentParty = undefined
            }
            state.parties.splice(action.payload, 1)
        },
        renameParty: (state, action: PayloadAction<{ partyIndex: number, newName: string }>) => {
            const party = state.parties[action.payload.partyIndex]
            if (party) {
                party.name = action.payload.newName
            }
        },
        loadDemoParties: (state) => {
            state.currentParty = 1
            state.parties = demoState.parties
        }
    },
})

// Action creators are generated for each case reducer function
export const { setCurrentParty, addCharacter, removeCharacter, addEmptyParty, duplicateParty, removeParty, renameParty, loadDemoParties } = characterSlice.actions

export default characterSlice.reducer