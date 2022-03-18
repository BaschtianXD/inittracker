export type Character = {
    name: string,
    allegiance: CharacterAllegiance,
    type: CharacterType
}

export enum CharacterAllegiance {
    Friendly,
    Enemy
}

export enum CharacterType {
    Player,
    Npc
}

export interface Party {
    name: string,
    characters: Character[]
}