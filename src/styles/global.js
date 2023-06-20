import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

* {
    box-sizing: border-box;
}

body {
    background-color: ${({theme})=> theme.background};
    color: ${({theme}) => theme.textColor};
    margin: 0;
    padding: 0;
    transition: all 0.25s linear;
}

.canvas {
    display: grid;
    min-height: 100vh;
    grid-auto-flow: row;
    grid-template-rows: auto;
    gap: 0.5rem;
    padding: 2rem;
    width: 100vw;
    align-items: center;
}

.type-box {
    display: block;
    max-width: 1000px;
    height: 140px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
}

.words {
    font-size: 32px;
    display: flex;
    flex-wrap: wrap;
    colors: ${({theme}) => theme.typeBoxText};
}

.word {
    margin: 5px;
    padding-right: 2px;
}

.hidden-input {
    opacity: 0;
}

.current {
    border-left: 1px solid;
    animation: blinking 2s ease infinite;
}

@keyframes blinking {
    0%{border-left-color: #fff}
    25%{border-left-color: #000}
    50%{border-left-color: #fff}
    75%{border-left-color: #000}
    100%{border-left-color: #fff}
}

.current-right {
    border-right: 1px solid;
    animation: blinkingRight 2s ease infinite;
}

@keyframes blinkingRight {
    0%{border-right-color: #fff}
    25%{border-right-color: #000}
    50%{border-right-color: #fff}
    75%{border-right-color: #000}
    100%{border-right-color: #fff}
}

.correct {
    color: green;
}

.incorrect {
    color: red;
}

.upper-menu {
    display: flex;
    justify-content: space-between;
    width: 1000px;
    padding: 0.5rem;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.4rem;
}

.modes {
    display: flex;
    gap: 0.4rem;
}

.time-mode:hover {
    color: green;
    cursor: pointer;
}

.footer {
    width: 1000px;
    display: flex;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
}

.stats-box {
    display: flex;
    width: 1000px;
    height: auto;
    margin: 0 auto;
}

.left-stats {
    width: 30%;
    padding: 30px;
}

.right-stats {
    width: 70%;
}

.title {
    font-size: 20px;
}

.subtitle {
    font-size: 30px;
}

.header {
    display: flex;
    width: 1000px;
    margin: 0 auto;
    justify-content: space-between;
}

.user-profile {
    width: 1000px;
    margin: auto;
    display: flex;
    height: 15rem;
    background: ${({theme})=> theme.typeBoxText};
    padding: 1rem;
    justify-content: center;
}

.user {
    width: 50%;
    display: flex;
    margin-top: 30px;
    margin-bottm: 30px;
    font-size: 1.5rem;
    padding: 1rem;
    border-right: 2px solid;
}

.info {
    width: 60%;
    padding: 1rem;
    margin-top: 1rem;
}

.picture {
    width: 40%;
}

.total-tests {
    width: 50%;
    font-size: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.table, .graph-user-page {
    margin: auto;
    width: 1000px;
}

.center-of-screen {
    display: flex;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    
}

`