import { useState } from 'react'
import { Character, CharacterAllegiance } from '../features/shared'
import { Input } from './ui/input'

type FightCharacterProps = {
    character: Character
    initiative?: number
    inFight: boolean
    isCurrentTurn?: boolean
    onInitiativeEntered: (num: number | undefined) => void
    index?: React.Key
}

function FightCharacter(props: FightCharacterProps) {

    const [editMode, setEditMode] = useState(false)

    var className = "flex flex-row justify-between p-2 m-1 rounded"

    className += props.inFight && props.isCurrentTurn && !editMode ? " bg-slate-200" : ""

    return (
        <li className={className} draggable={props.inFight && props.isCurrentTurn} key={props.index} >
            <p onClick={_ => {
                props.inFight ? setEditMode(!editMode) : undefined
            }}>{(props.isCurrentTurn && props.inFight ? "➡️ " : "") + props.character.name}</p>
            {props.inFight && !editMode ?
                <p>{props.initiative}</p> :
                <Input type="number" min={1} autoComplete="off" pattern="\d*" onBlur={event => props.onInitiativeEntered(Number(event.target.value) || undefined)} className="bg-secondary rounded px-1 w-20" defaultValue={props.initiative} onClick={event => event.preventDefault()} />
            }
        </li>
    )
}

export default FightCharacter
