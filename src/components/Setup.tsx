import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { setCurrentParty } from "../features/chars/CharactersSlice"
import { VscAdd } from "react-icons/vsc";

function Setup() {

    const dispatch = useAppDispatch()
    const groups = useAppSelector(state => state.characterReducer.parties)
    const [expanded, setExpanded] = useState(undefined as number | undefined)


    return (
        <div className="mt-2">
            <div className="text-center flex flex-row justify-around ">
                <p className="text-lg font-bold">Parties</p>
                {/* <FontAwesomeIcon icon={faPlus} className="absolute top-3 right-4" /> */}
                <VscAdd className="absolute right-4 scale-125" />
            </div>
            <div className=" grow flex flex-col gap-1">
                {groups.map((group, index) => (
                    <div key={group.name}>
                        <div className="bg-secondary rounded m-2 p-1" onClick={() => { setExpanded(expanded === index ? undefined : index) }}>{group.name}</div>
                        {expanded === index ?
                            <div className="overflow-hidden">
                                <div className="flex flex-col gap-2 transition-[max-height] duration-1000">
                                    <div className="flex flex-row gap-1 mx-2">
                                        <button className="bg-primary p-1 rounded select-none" onClick={() => dispatch(setCurrentParty(index))}>Set as current party</button>
                                        <button className="bg-secondary p-1 rounded select-none">Add character</button>
                                        <button className="bg-secondary p-1 rounded select-none">Duplicate party</button>
                                        <button className="bg-secondary p-1 rounded border-solid border-4 border-red-600 select-none">Delete party</button>
                                    </div>
                                    <div className="flex flex-col gap-2 divide-y-2">
                                        {group.characters.map(char => (
                                            <div key={char.name} className="flex flex-row justify-between">
                                                <p className="ml-4">{char.name}</p>
                                                <button className="mr-4 select-none">Delete</button>
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
        </div>
    )
}

export default Setup