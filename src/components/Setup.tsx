import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { addCharacter, addEmptyParty, duplicateParty, removeCharacter, removeParty, setCurrentParty } from "../features/chars/CharactersSlice"
import { VscAdd, VscPerson, VscServerEnvironment, VscTrash } from "react-icons/vsc";
import { CharacterAllegiance, CharacterType } from "../features/shared";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function Setup() {

    const dispatch = useAppDispatch()
    const groups = useAppSelector(state => state.characterReducer.parties)
    const [expanded, setExpanded] = useState(undefined as number | undefined)
    const [newParty, setNewParty] = useState(undefined as string | undefined)
    const [newCharacter, setNewCharacter] = useState(undefined as string | undefined)
    const [deleteConfirm, setDeleteConfirm] = useState(false)

    const [newCharAllegiance, setNewCharAllegiance] = useState(CharacterAllegiance.Friendly)
    const [newCharType, setNewCharType] = useState(CharacterType.Pc)


    const closeNewCharacter = () => {
        setNewCharacter(undefined)
        setNewCharAllegiance(0)
        setNewCharType(0)
    }

    const getCharacterIcon = (allegiance: CharacterAllegiance, type: CharacterType) => {
        const color = allegiance === CharacterAllegiance.Friendly ? "text-green-500" : allegiance === CharacterAllegiance.Neutral ? "text-neutral-900" : "text-red-700"
        if (type === CharacterType.Pc) {
            return (
                <VscPerson className={color} />
            )
        } else {
            return (
                <VscServerEnvironment className={color} />
            )
        }
    }


    return (
        <div className="flex flex-col h-full">
            <div className="text-center flex flex-row justify-around ">
                <p className="text-lg font-bold">Parties</p>
                <VscAdd className="absolute right-4 scale-125" onClick={event => {
                    setNewParty(newParty !== undefined ? undefined : "")
                }} />
            </div>
            {newParty !== undefined ?
                <div className="flex flex-row content-evenly m-2">
                    <Input className="grow rounded px-1 bg-secondary mr-4" value={newParty} type="text" onChange={event => setNewParty(event.target.value)}></Input>
                    <Button onClick={() => {
                        dispatch(addEmptyParty(newParty))
                        setNewParty(undefined)
                    }}>Create</Button>
                </div>
                :
                <></>
            }
            {groups.length > 0 ?
                <div className="grow flex flex-col gap-1">
                    {groups.map((group, partyIndex) => (
                        <div key={group.name}>
                            <div className="bg-secondary rounded m-2 p-1" onClick={() => { setExpanded(expanded === partyIndex ? undefined : partyIndex); setDeleteConfirm(false); closeNewCharacter() }}>{group.name}</div>
                            {expanded === partyIndex ?
                                <div className="overflow-hidden">
                                    <div className="flex flex-col gap-2 ">
                                        {!deleteConfirm && newCharacter === undefined ?
                                            <div className="flex flex-row gap-1 mx-2 flex-wrap">
                                                <Button onClick={() => dispatch(setCurrentParty(partyIndex))}>Set as current party</Button>
                                                <Button variant={"outline"} onClick={() => setNewCharacter(newCharacter !== undefined ? undefined : "")}>Add character</Button>
                                                <Button variant={"outline"} onClick={() => dispatch(duplicateParty(partyIndex))}>Duplicate party</Button>
                                                <Button variant={"outline"} disabled>Rename party</Button>
                                                <Button variant={"outline"} onClick={() => setDeleteConfirm(true)}>Delete party</Button>
                                            </div>
                                            :
                                            <></>
                                        }
                                        {deleteConfirm ?
                                            <div className="flex flex-row gap-1 mx-2 justify-evenly">
                                                <Button variant={"outline"} onClick={() => setDeleteConfirm(false)}>Do not delete party</Button>
                                                <Button onClick={() => { dispatch(removeParty(partyIndex)); setDeleteConfirm(false); setExpanded(undefined) }}>Delete party</Button>
                                            </div>
                                            :
                                            <></>
                                        }
                                        {newCharacter !== undefined ?
                                            <div className="flex flex-col m-2 gap-2">
                                                <div className="flex flex-row gap-2">
                                                    <label>Name</label>
                                                    <Input className="grow rounded px-1 bg-secondary" value={newCharacter} type="text" onChange={event => setNewCharacter(event.target.value)} autoComplete="off" list="autocompleteOff" ></Input>
                                                </div>
                                                <div className="flex flex-row gap-2">
                                                    <label>Allegiance</label>
                                                    <select title="Character Allegiance" value={newCharAllegiance} onChange={event => setNewCharAllegiance(Number(event.target.value))} className="bg-secondary rounded">
                                                        <option value={0}>Friendly</option>
                                                        <option value={1}>Enemy</option>
                                                        <option value={2}>Neutral</option>
                                                    </select>
                                                </div>
                                                <div className="flex flex-row gap-2">
                                                    <p>Type</p>
                                                    <select title="Character Player Type" value={newCharType} onChange={event => setNewCharType(Number(event.target.value))} className="bg-secondary rounded">
                                                        <option value={0}>PC</option>
                                                        <option value={1}>NPC</option>
                                                    </select>
                                                </div>
                                                <div className="flex flex-row gap-2">
                                                    <Button onClick={() => {
                                                        dispatch(addCharacter({
                                                            partyIndex: partyIndex, character: {
                                                                name: newCharacter,
                                                                allegiance: newCharAllegiance,
                                                                type: newCharType
                                                            }
                                                        }))
                                                        closeNewCharacter()
                                                    }}>Add Character</Button>
                                                    <Button variant={"outline"} onClick={closeNewCharacter}>Cancel</Button>
                                                </div>
                                            </div>
                                            :
                                            <></>
                                        }
                                        <div className="flex flex-col divide-y-2">
                                            {group.characters.map((char, charIndex) => (
                                                <div key={char.name} className="flex flex-row justify-between items-center">
                                                    <div className="flex flex-row items-center ml-2 gap-2">
                                                        {getCharacterIcon(char.allegiance, char.type)}
                                                        <p>{char.name}</p>
                                                    </div>

                                                    <Button variant={"destructive"} className="mr-4 select-none" onClick={() => {
                                                        dispatch(removeCharacter({
                                                            partyIndex: partyIndex,
                                                            characterIndex: charIndex
                                                        }))
                                                    }} ><VscTrash /></Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                :
                                <></>
                            }

                        </div>
                    ))}
                </div>
                :
                <div className="grow flex flex-col items-center justify-center h-full">
                    <div className="flex flex-row items-center justify-center">
                        <p>Press</p>
                        <VscAdd className="mx-1" />
                        <p>to add a new party</p>
                    </div>
                </div>
            }
        </div >
    )
}

export default Setup