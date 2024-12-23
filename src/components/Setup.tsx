import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { addCharacter, addEmptyParty, duplicateParty, loadDemoParties, removeCharacter, removeParty, renameParty, setCurrentParty } from "../features/chars/CharactersSlice"
import { VscAdd, VscPerson, VscServerEnvironment, VscTrash } from "react-icons/vsc";
import { CharacterAllegiance, CharacterType } from "../features/shared";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "./ui/label";

function Setup() {

    const dispatch = useAppDispatch()
    const groups = useAppSelector(state => state.characterReducer.parties)
    const currentParty = useAppSelector(state => state.characterReducer.currentParty)
    const [expanded, setExpanded] = useState(undefined as number | undefined)
    const [newParty, setNewParty] = useState("")
    const [newCharacter, setNewCharacter] = useState("")
    const [rename, setRename] = useState("")

    const [newCharAllegiance, setNewCharAllegiance] = useState(CharacterAllegiance.Friendly)
    const [newCharType, setNewCharType] = useState(CharacterType.Pc)


    const closeNewCharacter = () => {
        setNewCharacter("")
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
            <div className="text-center flex flex-row justify-around mb-2">
                <span className="text-lg font-bold">Parties</span>
                <Dialog>
                    <DialogTrigger asChild className="relative right-2">
                        <Button variant={"outline"}>➕</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create new party</DialogTitle>
                            <DialogDescription>Give it a name and let's go</DialogDescription>
                        </DialogHeader>
                        <Label>Name</Label>
                        <Input type="text" value={newParty} onChange={event => setNewParty(event.target.value)} />
                        <DialogFooter>
                            <DialogTrigger asChild>
                                <Button onClick={() => dispatch(addEmptyParty(newParty))}>Create party</Button>
                            </DialogTrigger>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            {groups.length > 0 ?
                <div className="grow flex flex-col gap-1">
                    {groups.map((group, partyIndex) => (
                        <div key={group.name}>
                            {partyIndex === currentParty ?
                                <div className="bg-secondary rounded m-2 p-1 font-bold flex items-center gap-2" onClick={() => { setExpanded(expanded === partyIndex ? undefined : partyIndex); closeNewCharacter() }}><span>{group.name + " ✅"}</span></div>
                                :
                                <div className="bg-secondary rounded m-2 p-1" onClick={() => { setExpanded(expanded === partyIndex ? undefined : partyIndex); closeNewCharacter() }}>{group.name}</div>
                            }

                            {expanded === partyIndex ?
                                <div className="overflow-hidden">
                                    <div className="flex flex-col gap-2 ">
                                        <div className="flex flex-row gap-1 mx-2 flex-wrap">
                                            <Button onClick={() => dispatch(setCurrentParty(partyIndex))}>Set as current party</Button>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant={"outline"}>Add Character</Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                Add Character
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                Give your party a new ally or present them with a foe
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="flex flex-col m-2 gap-2">
                                                            <div className="flex flex-row gap-2">
                                                                <Label>Name</Label>
                                                                <Input className="grow rounded px-1 bg-secondary" value={newCharacter} type="text" onChange={event => setNewCharacter(event.target.value)} autoComplete="off" list="autocompleteOff" ></Input>
                                                            </div>
                                                            <div className="flex flex-row gap-2">
                                                                <Label>Allegiance</Label>
                                                                <select title="Character Allegiance" value={newCharAllegiance} onChange={event => setNewCharAllegiance(Number(event.target.value))} className="bg-secondary rounded">
                                                                    <option value={0}>Friendly</option>
                                                                    <option value={1}>Enemy</option>
                                                                    <option value={2}>Neutral</option>
                                                                </select>
                                                            </div>
                                                            <div className="flex flex-row gap-2">
                                                                <Label>Type</Label>
                                                                <select title="Character Player Type" value={newCharType} onChange={event => setNewCharType(Number(event.target.value))} className="bg-secondary rounded">
                                                                    <option value={0}>PC</option>
                                                                    <option value={1}>NPC</option>
                                                                </select>
                                                            </div>

                                                        </div>
                                                        <DialogFooter>
                                                            <DialogTrigger asChild>
                                                                <Button disabled={newCharacter === ""} onClick={() => {
                                                                    dispatch(addCharacter({
                                                                        partyIndex: partyIndex, character: {
                                                                            name: newCharacter,
                                                                            allegiance: newCharAllegiance,
                                                                            type: newCharType
                                                                        }
                                                                    }))
                                                                    closeNewCharacter()
                                                                }}>Add Character</Button>
                                                            </DialogTrigger>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </DialogContent>
                                            </Dialog>
                                            <Button variant={"outline"} onClick={() => dispatch(duplicateParty(partyIndex))}>Duplicate party</Button>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant={"outline"}>Rename party</Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Rename Party</DialogTitle>
                                                        <DialogDescription>Give your party a new name</DialogDescription>
                                                    </DialogHeader>
                                                    <Label>New Name</Label>
                                                    <Input value={rename} onChange={(event) => setRename(event.target.value)}></Input>
                                                    <DialogFooter>
                                                        <Button disabled={rename === ""} onClick={() => {
                                                            dispatch(renameParty({ partyIndex, newName: rename }))
                                                            setRename("")
                                                        }}>Rename</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant={"outline"}>Delete party</Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Delete party</DialogTitle>
                                                        <DialogDescription>Are you sure?</DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <DialogTrigger>
                                                            <Button variant={"destructive"} onClick={() => dispatch(removeParty(partyIndex))} >Delete party</Button>
                                                        </DialogTrigger>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>

                                        <div className="flex flex-col divide-y-2">
                                            {group.characters.map((char, charIndex) => (
                                                <div key={char.name} className="flex flex-row justify-between items-center">
                                                    <div className="flex flex-row items-center ml-2 gap-2">
                                                        {getCharacterIcon(char.allegiance, char.type)}
                                                        <p>{char.name}</p>
                                                    </div>

                                                    <Button variant={"outline"} className="mr-4 select-none" onClick={() => {
                                                        dispatch(removeCharacter({
                                                            partyIndex: partyIndex,
                                                            characterIndex: charIndex
                                                        }))
                                                    }} >🗑️</Button>
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
                        <p>or load our demo parties</p>
                        <Button onClick={() => dispatch(loadDemoParties())}>Load Demo Parties</Button>
                    </div>
                </div>
            }
        </div >
    )
}

export default Setup