import { useState } from "react"
import { useAppSelector, useAppDispatch } from "../app/hooks"
import FightCharacter from "./FightCharacter"
import { VscPlay } from "react-icons/vsc";
import { PrimaryButton, SecondaryButton } from "./Buttons"
import { Character } from "../features/shared"
import { setTurn } from "../features/chars/TurnSlice";

function Fight() {
    const chars = useAppSelector(state => state.characterReducer.currentParty?.characters)
    const [inits, setInits] = useState(new Map() as Map<Character, number>)
    const [currentTurn, setCurrentTurn] = useState(0)
    const [isInFight, setIsInFight] = useState(false)

    const dispatch = useAppDispatch()

    const toggleIsInFight = () => {
        console.log("Starting fight")
        if (isInFight) {
            setInits(new Map())
            setTurn(0)
        }
        setIsInFight(!isInFight)
    }
    const benched = chars?.map((char, index) => { return { char: char, index: index } }).filter(char => inits.get(char.char) === undefined)
    const upperChars = chars?.filter((char, index) => !isInFight || inits.get(char) !== undefined)
        .map((char, index) => { return { char: char, init: inits.get(char), index: index } })
        .sort((a, b) => {
            if (isInFight) {
                return b.init! - a.init!
            } else {
                return 0
            }
        })

    return (
        <div className="py-2 h-full">
            {upperChars && upperChars.length > 0 ?
                <div>
                    <div className='mx-4 flex flex-row justify-between'>
                        <p className="text-lg font-bold">Name</p>
                        <p className="text-lg font-bold">Initiative</p>
                    </div>
                    <div>
                        <div className='grow flex flex-col divide-y-2'>
                            {upperChars
                                .map((char, index, arr) => <div>
                                    <FightCharacter
                                        character={char.char}
                                        initiative={char.init}
                                        inFight={isInFight}
                                        isCurrentTurn={index === (currentTurn % arr.length)}
                                        onInitiativeEntered={(newInit) => {
                                            if (newInit) {
                                                const oldInit = inits.get(char.char)!
                                                const currentInit = inits.get(upperChars[currentTurn].char)!
                                                if (newInit === oldInit) return
                                                if ((oldInit > currentInit && newInit < currentInit) || (oldInit < currentInit && newInit > currentInit)) {
                                                    if (oldInit > newInit) {
                                                        setCurrentTurn(currentTurn - 1)
                                                    } else {
                                                        setCurrentTurn(currentTurn + 1)
                                                    }
                                                }
                                                setInits(new Map(inits.set(char.char, newInit)))
                                            } else {
                                                if (inits.delete(char.char)) { setInits(new Map(inits)) }

                                            }
                                        }
                                        }
                                        key={char.char.name}
                                    />
                                </div>)}
                        </div>
                        <div className="m-auto text-center mt-4">
                            {isInFight ?
                                <div className="flex flex-col items-center gap-2">
                                    <PrimaryButton text="Advance turn" onClick={() => setCurrentTurn((currentTurn + 1) % inits.size)} />
                                    <SecondaryButton text="Fight finished" onClick={(toggleIsInFight)} />
                                </div>
                                :
                                <div className="flex flex-col items-center gap-2 text-xl">
                                    <PrimaryButton text="Start Fight" icon={<VscPlay />} onClick={toggleIsInFight} />
                                </div>
                            }
                        </div>

                        {isInFight && benched && benched.length > 0 ?
                            <div className="mt-6">
                                <p className="text-lg font-bold text-center">Not participating</p>
                                <div className="grow flex flex-col divide-y-2">
                                    {benched.map(char => (
                                        <FightCharacter
                                            character={char.char}
                                            initiative={inits.get(char.char)}
                                            inFight={false}
                                            onInitiativeEntered={(num) => {
                                                if (num) {
                                                    setInits(new Map(inits.set(char.char, num)))
                                                    const currInit = Array.from(inits).sort((a, b) => a[1] - b[1])[currentTurn][1]
                                                    if (currInit < num) {
                                                        setCurrentTurn(currentTurn + 1)
                                                    }
                                                } else {
                                                    if (inits.delete(char.char)) { setInits(new Map(inits)) }
                                                }
                                            }}
                                            key={char.index}
                                        />
                                    ))}
                                </div>
                            </div>
                            :
                            <></>
                        }
                    </div>
                </div>
                :
                <div className="absolute top-1/2 w-full text-center">
                    <p>Go to setup and select a party</p>
                </div>
            }
        </div>
    )
}

export default Fight