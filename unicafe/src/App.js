import React, { useState } from 'react'

const Header = props => <h1>{props.header}</h1>
const Button = ({ handleClick, text }) => (  <button onClick={handleClick}>{text}  </button>)


const StatisticLine  = ({text, value}) => {
    switch (text) {
        case "positive":
            return (
                <tr>
                    <td>
                        {text}
                    </td>
                    <td>
                        {value} %
                    </td>
                </tr>
            )
        default:
            return (
                <tr>
                    <td>
                        {text}
                    </td>
                    <td>
                        {value}
                    </td>
                </tr>
            )
    }
}
// oikea paikka komponentin määrittelyyn
const Statistics = ({clicks: props}) => {
    const all = props.good + props.neutral + props.bad
    const good = props.good * (100/all)
    const average = (props.good + props.bad) / all

    if (all < 1) {
        return (
            <div>no feedback given</div>
        )
    }

    return (
        <div>
            <table>
                <tbody>
                <StatisticLine  text="good" value={props.good} />
                <StatisticLine  text="neutral" value={props.neutral} />
                <StatisticLine  text="bad" value={props.bad} />
                <StatisticLine  text="all" value={all} />
                <StatisticLine  text="average" value={average} />
                <StatisticLine  text="positive" value={good} />
                </tbody>
            </table>
        </div>
    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [clicks, setClicks] = useState({
        good: 0, neutral: 0, bad: 0
    })

    const handleGoodClick = () =>
        setClicks({...clicks, good: clicks.good + 1})

    const handleNeutralClick = () =>
        setClicks({...clicks, neutral: clicks.neutral + 1})

    const handleBadClick = () =>
        setClicks({...clicks, bad: clicks.bad + 1})

    return (
        <div>
            <Header header= "give feedback"/>
            <Button handleClick={handleGoodClick} text='good' />
            <Button handleClick={handleNeutralClick} text='neutral' />
            <Button handleClick={handleBadClick} text='bad' />
            <Header header= "statistics"/>
            <Statistics clicks={clicks} />
        </div>
    )
}

export default App