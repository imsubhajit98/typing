import { createRef, useEffect, useMemo, useRef, useState } from 'react'
import randomwords from 'random-words'
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../Context/TestModeContext";
import Stats from "./Stats";

const TypingBox = () => {

    const inputRef = useRef(null);
    const { testTime } = useTestMode();
    const [countDown, setCountDown] = useState(testTime);
    const [intervalId, setIntervalId] = useState(null);
    const [testStart, setTestStart] = useState(false);
    const [testEnd, setTestEnd] = useState(false);
    const [correctChars, setCorrectChars] = useState(0);
    const [incorrectChars, setIncorrectChars] = useState(0);
    const [missedChars, setMissedChars] = useState(0);
    const [correctWords, setCorrectWords] = useState(0);
    const [extraChars, setExtraChars] = useState(0);

    const [wordsArray, setWordsArray] = useState(() => {
        return randomwords(50);
    });

    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currCharIndex, setCurrentCharIndex] = useState(0);
    const [graphData, setGraphData] = useState([]);

    const wordsSpanRef = useMemo(() => {
        return Array(wordsArray.length).fill(0).map(i => createRef(null));
    }, [wordsArray])

    const startTimer = () => {

        const intervalId = setInterval(timer, 1000);
        setIntervalId(intervalId);

        function timer() {
            setCountDown((latestCountDown) => {
                setCorrectChars((correctChars)=> {
                    setGraphData((graphData)=> {

                        return [...graphData, [
                            testTime - latestCountDown + 1,
                            (correctChars/5)/((testTime-latestCountDown+1)/60)
                        ]];
                    })

                    return correctChars;
                })
                if (latestCountDown === 1) {
                    setTestEnd(true);
                    clearInterval(intervalId);
                    inputRef.current.blur();
                    return 0;
                }
                return latestCountDown - 1
            });
        }

    }

    const resetTest = () => {
        clearInterval(intervalId);
        setCountDown(testTime);
        setCurrentWordIndex(0);
        setCurrentCharIndex(0);
        setTestStart(false);
        setTestEnd(false);
        setWordsArray(randomwords(50));
        resetWordSpanRefClassname();
        focusInput();
    }

    const resetWordSpanRefClassname = () => {
        wordsSpanRef.map(i => {
            return Array.from(i.current.childNodes).map(j => {
                return j.className = "";
            })
        });
        wordsSpanRef[0].current.childNodes[0].className = "current";
    }

    const handleUserInput = (e) => {

        if (!testStart) {
            startTimer();
            setTestStart(true);
        }

        const allCurrChars = wordsSpanRef[currentWordIndex].current.childNodes;

        // logic for space key
        if (e.keyCode === 32) {

            let correctCharsInWord = wordsSpanRef[currentWordIndex].current.querySelectorAll(".correct");

            if (correctCharsInWord.length === allCurrChars.length) {
                setCorrectWords(correctWords + 1);
            }

            if (currCharIndex === allCurrChars.length) {
                // remove cursor from last place in a word
                allCurrChars[currCharIndex - 1].classList.remove("current-right");
            } else {
                // remove cursor from in between of a word
                setMissedChars(missedChars + allCurrChars.length - currCharIndex);
                allCurrChars[currCharIndex].classList.remove("current");

            }


            wordsSpanRef[currentWordIndex + 1].current.childNodes[0].className = "current";
            setCurrentWordIndex(currentWordIndex + 1);
            setCurrentCharIndex(0);
            return;
        }

        // logic for backspace
        if (e.keyCode === 8) {
            if (currCharIndex !== 0) {

                if (allCurrChars.length === currCharIndex) {

                    if (allCurrChars[currCharIndex - 1].className.includes("extra")) {
                        allCurrChars[currCharIndex - 1].remove();
                        allCurrChars[currCharIndex - 2].className += " current-right"
                    } else {
                        allCurrChars[currCharIndex - 1].className = "current";
                    }

                    setCurrentCharIndex(currCharIndex - 1);
                    return;
                }

                allCurrChars[currCharIndex].className = "";
                allCurrChars[currCharIndex - 1].className = "current";
                setCurrentCharIndex(currCharIndex - 1);
            }
            return;
        }

        if (currCharIndex === allCurrChars.length) {
            let newSpan = document.createElement("span");
            newSpan.innerText = e.key;
            newSpan.className = "incorrect extra current-right";
            allCurrChars[currCharIndex - 1].classList.remove("current-right");
            wordsSpanRef[currentWordIndex].current.append(newSpan);
            setCurrentCharIndex(currCharIndex + 1);
            setExtraChars(extraChars + 1);
            return;
        }


        if (e.key === allCurrChars[currCharIndex].innerText) {
            allCurrChars[currCharIndex].className = "correct";
            setCorrectChars(correctChars + 1);
        } else {
            allCurrChars[currCharIndex].className = "incorrect";
            setIncorrectChars(incorrectChars + 1);
        }

        if (currCharIndex === allCurrChars.length - 1) {
            allCurrChars[currCharIndex].className += " current-right"
        } else {
            allCurrChars[currCharIndex + 1].className = "current";
        }

        setCurrentCharIndex(currCharIndex + 1);
    }

    // calculate wpm
    const calculateWPM = () => {
        return Math.round((correctChars / 5) / (testTime / 60));
    }

    // calculate accuracy
    const calculateAcc = () => {
        return Math.round((correctWords / currentWordIndex) * 100) || 0;
    }

    const focusInput = () => {
        inputRef.current.focus();
    }

    useEffect(() => {
        resetTest();
    }, [testTime])

    useEffect(() => {
        focusInput();
        wordsSpanRef[0].current.childNodes[0].className = "current";
    }, [])

    return (
        <div>
            {!testEnd && <UpperMenu countDown={countDown} />}
            {testEnd
                ?
                (<Stats
                    wpm={calculateWPM()}
                    accuracy={calculateAcc()}
                    correctWords={correctWords}
                    correctChars={correctChars}
                    incorrectChars={incorrectChars}
                    missedChars={missedChars}
                    extraChars={extraChars}
                    graphData={graphData}
                />)
                :
                (<div className="type-box" onClick={focusInput}>
                    <div className="words">
                        {
                            wordsArray.map((word, index) => (
                                <span className="word" ref={wordsSpanRef[index]}>
                                    {word.split("").map((char) => (
                                        <span>{char}</span>
                                    ))}
                                </span>
                            ))
                        }
                    </div>
                </div>)}
            <input
                type="text"
                className="hidden-input"
                ref={inputRef}
                onKeyDown={handleUserInput}
            />
        </div>
    )
}

export default TypingBox