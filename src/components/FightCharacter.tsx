import { useState } from 'react'
import { Character, CharacterAllegiance } from '../features/shared'

type FightCharacterProps = {
    character: Character
    initiative?: number
    inFight: boolean
    isCurrentTurn?: boolean
    onInitiativeEntered: (num: number | undefined) => void
}

function FightCharacter(props: FightCharacterProps) {

    const [inpValue, setInpValue] = useState(0)
    const [editMode, setEditMode] = useState(false)

    var className = "flex flex-row justify-between p-2 m-1 rounded"

    className += props.inFight && props.isCurrentTurn && !editMode ? " bg-secondary" : ""

    return (
        <div className={className} draggable={props.inFight && props.isCurrentTurn} >
            <p onClick={_ => {
                props.inFight ? setEditMode(!editMode) : undefined
                console.log("Edit mode" + !editMode)
            }}>{props.character.name}</p>
            {props.inFight && !editMode ?
                <p>{props.initiative}</p> :
                <input type="number" min={1} autoComplete="off" pattern="\d*" onBlur={event => props.onInitiativeEntered(Number(event.target.value) || undefined)} className="bg-secondary rounded px-1 w-20" defaultValue={props.initiative} onClick={event => event.preventDefault()} />
            }
        </div>
    )
}

export default FightCharacter
