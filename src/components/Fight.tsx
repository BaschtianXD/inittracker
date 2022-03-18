import { useState } from "react"
import { useAppSelector, useAppDispatch } from "../app/hooks"
import { clearInitiatives, setInitiative } from "../features/chars/Initiatives"
import { advanceTurn, resetTurn } from "../features/chars/TurnSlice"
import FightCharacter from "./FightCharacter"
import { VscPlay } from "react-icons/vsc";
import { PrimaryButton, SecondaryButton } from "./Buttons"

function Fight() {
    const chars = useAppSelector(state => state.characterReducer.currentParty?.characters)
    const inits = useAppSelector(state => state.initiavesReducer.initiatives)
    const currentTurn = useAppSelector(state => state.turnReducer.currentTurn)
    const [isInFight, setIsInFight] = useState(false)

    const dispatch = useAppDispatch()

    const toggleIsInFight = () => {
        if (isInFight) {
            dispatch(clearInitiatives())
            dispatch(resetTurn())
        }
        setIsInFight(!isInFight)
    }

    return (
        <div className="py-2 h-full">
            {chars && chars.length > 0 ?
                <div>
                    <div className='mx-4 flex flex-row justify-between'>
                        <p className="text-lg font-bold">Name</p>
                        <p className="text-lg font-bold">Initiative</p>
                    </div>
                    <div>
                        <div className='grow flex flex-col divide-y-2'>
                            {chars.map((char, index) => {
                                return {
                                    char: char,
                                    index: index
                                }
                            }).filter(char => !isInFight || inits[char.index] !== undefined)
                                .sort((a, b) => {
                                    if (isInFight) {
                                        return inits[b.index]! - inits[a.index]!
                                    } else {
                                        return 0
                                    }
                                }).map((char, index, arr) => <div>
                                    <FightCharacter
                                        character={char.char}
                                        initiative={inits[char.index]}
                                        inFight={isInFight}
                                        isCurrentTurn={index === (currentTurn % arr.length)}
                                        onInitiativeEntered={(num) => dispatch(setInitiative({ characterIndex: char.index, initiative: num }))} key={char.index}
                                    />
                                </div>)}
                        </div>
                        <div className="m-auto text-center mt-4">
                            {isInFight ?
                                <div className="flex flex-col items-center gap-2">
                                    <PrimaryButton text="Advance turn" onClick={() => dispatch(advanceTurn())} />
                                    <SecondaryButton text="Fight finished" onClick={(toggleIsInFight)} />
                                </div>
                                :
                                <div className="flex flex-col items-center gap-2">
                                    <PrimaryButton text="Start Fight" icon={<VscPlay />} onClick={toggleIsInFight} />
                                </div>
                            }
                        </div>
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