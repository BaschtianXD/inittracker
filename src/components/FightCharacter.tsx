import { useState } from 'react'
import { Character, CharacterAllegiance } from '../features/shared'

type FightCharacterProps = {
    character: Character
    initiative?: number
    inFight: boolean
    isCurrentTurn: boolean
    onInitiativeEntered: (num: number) => void
}

function FightCharacter(props: FightCharacterProps) {

    const [inpValue, setInpValue] = useState(0)

    var className = "flex flex-row justify-between p-2 m-1 rounded"

    className += props.inFight && props.isCurrentTurn ? " bg-secondary" : ""

    return (
        <div className={className} draggable={props.inFight && props.isCurrentTurn}>
            <p>{props.character.name}</p>
            {props.inFight ?
                <p>{props.initiative}</p> :
                <input type="number" min={1} autoComplete="off" pattern="\d*" onChange={event => props.onInitiativeEntered(Number(event.target.value) || 0)} className="bg-secondary rounded px-1 w-20" />
            }
        </div>
    )
}

export default FightCharacter
