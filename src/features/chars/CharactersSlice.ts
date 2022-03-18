import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Character, CharacterAllegiance, CharacterType, Party } from '../shared'

interface CharacterState {
    currentParty?: Party,
    parties: Party[]
}

const testState: CharacterState = { // TODO clean this up
    currentParty: {
        name: "Pathfinder 1",
        characters: [
            {
                name: "Erokthan",
                allegiance: CharacterAllegiance.Friendly,
                type: CharacterType.Player
            },
            {
                name: "Lini",
                allegiance: CharacterAllegiance.Friendly,
                type: CharacterType.Player
            },
            {
                name: "Seoni",
                allegiance: CharacterAllegiance.Friendly,
                type: CharacterType.Player
            },
            {
                name: "Ayva",
                allegiance: CharacterAllegiance.Friendly,
                type: CharacterType.Player
            },
            {
                name: "Frederich",
                allegiance: CharacterAllegiance.Friendly,
                type: CharacterType.Player
            },
            {
                name: "Diederich",
                allegiance: CharacterAllegiance.Friendly,
                type: CharacterType.Player
            },
            {
                name: "Gegner",
                allegiance: CharacterAllegiance.Enemy,
                type: CharacterType.Npc
            },
        ]
    },
    parties: [
        {
            name: "Pathfinder 1",
            characters: [
                {
                    name: "Erokthan",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Lini",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Seoni",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Ayva",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Frederich",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Diederich",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Gegner",
                    allegiance: CharacterAllegiance.Enemy,
                    type: CharacterType.Npc
                },
            ]
        },
        {
            name: "Pathfinder 2",
            characters: [
                {
                    name: "Erokthan",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Lini",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Seoni",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Ayva",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Frederich",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Diederich",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
            ]
        },
        {
            name: "Test Many",
            characters: [
                {
                    name: "Erokthan",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Lini",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Seoni",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Ayva",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Frederich",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Diederich",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Döner",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Döner mit Käse",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Großer Döner",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Großer Döner mit Käse",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Börek",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Falaffeldöner",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Großer Falaffeldöner",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Lahmacum",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Lahmacum mit Käse",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Grillteller",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Überbackes Lammfilet mit Metaxasauce",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Halbes Hähnchen",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Gyros",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                },
                {
                    name: "Überbackenes Gyros",
                    allegiance: CharacterAllegiance.Friendly,
                    type: CharacterType.Player
                }
            ]
        },
    ]
}

const initialState: CharacterState = { // TODO clean this up
    currentParty: undefined,
    parties: []
}

export const characterSlice = createSlice({
    name: 'characters',
    initialState: testState,
    reducers: {
        setCurrentParty: (state, action: PayloadAction<number>) => {
            if (state.parties[action.payload]) {
                state.currentParty = state.parties[action.payload]
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
            state.parties.slice(action.payload, 1)
        }
    },
})

// Action creators are generated for each case reducer function
export const { setCurrentParty, addCharacter, removeCharacter, addEmptyParty, duplicateParty } = characterSlice.actions

export default characterSlice.reducer