import { z } from "zod"

export const CharacterAllegianceT = z.enum(["Friendly", "Enemy", "Neutral"])

export type CharacterAllegiance = z.infer<typeof CharacterAllegianceT>

export const CharacterTypeT = z.enum(["Pc", "Npc"])

export type CharacterType = z.infer<typeof CharacterTypeT>

export const CharacterT = z.object({
    name: z.string(),
    allegiance: CharacterAllegianceT,
    type: CharacterTypeT
})

export type Character = z.infer<typeof CharacterT>

export const PartyT = z.object({
    name: z.string(),
    characters: z.array(CharacterT)
})

export type Party = z.infer<typeof PartyT>