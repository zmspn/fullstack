import React, {useState} from 'react'

const Header = props => <h1>{props.header}</h1>
const Button = ({handleClick, text}) => (<button onClick={handleClick}>{text}  </button>)

const TopAnectode = ({anecdotes, votes}) => {
    const topVotes = Math.max(...votes)

    const winnerIndex = votes.indexOf(Math.max(topVotes))
    const winner = anecdotes[winnerIndex]
    if (topVotes < 1){
        return (
            <div>
                <p>no votes</p>
            </div>
        )
    }
    return (
        <div>
            <p>{winner}</p>
            <p>has {topVotes} votes</p>
        </div>
    )
}
const AnecdoteLine = ({text, value}) => {
    return (
        <div>
            <p>
                {text}
            </p>
            <p>
                {value} votes.
            </p>
        </div>
    )
}
const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

    const nextAnectode = () => {
        const index = Math.floor(Math.random() * anecdotes.length)
        setSelected(index)
    }

    const vote = () => {
        const copy = [...votes]
        copy[selected]++
        setVotes(copy)
        console.log(copy)
    }

    return (
        <div>
            <Header header="Anecdote of the day"/>
            <AnecdoteLine text={anecdotes[selected]} value={votes[selected]}/>
            <Button handleClick={vote} text='vote'/>
            <Button handleClick={nextAnectode} text='next anecdote'/>
            <Header header="Anecdote with most votes"/>
            <TopAnectode anecdotes={anecdotes} votes={votes}/>
        </div>
    )
}

export default App