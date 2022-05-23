import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import Die from './components/Die';
import ReactConfetti from 'react-confetti';
export default function App() {



    const [allDice, setAllDice] = useState(generateAllDice);
    const [tenzies, setTenzies] = useState(false);

    function generateAllDice() {
        let temp = [];
        for (let i = 0; i < 10; i++) {
            temp.push({
                id: nanoid(),
                value: Math.ceil(Math.random() * 6),
                isChecked: false
            })
        }
        return temp
    }

    useEffect(() => {
        setTenzies(allDice.every(die => die.isChecked))
    }, [allDice])

    function rollDice() {
        if (tenzies) {
            setAllDice(generateAllDice)
        }
        setAllDice(prevAllDice => prevAllDice.map(die => {
            return !die.isChecked ? { ...die, value: Math.ceil(Math.random() * 6) } : die
        }))
    }

    function checkDice(id) {
        setAllDice(prevAllDice => prevAllDice.map(die => {
            return die.id === id ? { ...die, isChecked: !die.isChecked } : die
        }))
    }


    const diceRendered = allDice.map(die => <Die checkDice={() => checkDice(die.id)} key={die.id} {...die} />)

    return (
        <main className="bg-[#0b2434] w-full h-screen font-karla">
            {tenzies && <ReactConfetti />}
            <div className="text-[#0b2434] bg-[#f5f5f5] rounded-xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-12 text-center w-[90%]">
                <div className="">
                    <h1 className="font-bold text-4xl mb-2">
                        Tenzies
                    </h1>
                    <p className="">
                        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
                    </p>
                </div>
                <div className="grid grid-cols-5 gap-8 mt-8 place-items-center">
                    {diceRendered}
                </div>
                <button className="text-[#f5f5f5] bg-[#5035ff] px-8 py-2 mt-8 rounded-md font-bold" onClick={rollDice}>
                    {tenzies ? 'Reset Game' : 'Roll'}
                </button>
            </div>
        </main>
    )
}
