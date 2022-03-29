export type Character = {
    name: string,
    allegiance: CharacterAllegiance,
    type: CharacterType
}

export enum CharacterAllegiance {
    Friendly,
    Enemy,
    Neutral
}

const foo = Object.entries(CharacterAllegiance)

export enum CharacterType {
    Pc,
    Npc
}

export interface Party {
    name: string,
    characters: Character[]
}