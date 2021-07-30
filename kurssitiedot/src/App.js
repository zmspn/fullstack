import React from 'react'
import * as ReactDOM from "react-dom";

const Header = (props) => {
    return (
        <h1>{props.course.name}</h1>
    )
}
const Part = (props) => {
    return (
        <p>{props.name} {props.exercises}</p>
    )
}
const Content = (props) => {
    const { parts } = props.parts
    return (
        <div>
            <Part name={parts[0].name} exercise={parts[0].exercises}/>
            <Part name={parts[1].name} exercise={parts[1].exercises}/>
            <Part name={parts[2].name} exercise={parts[2].exercises}/>
        </div>
    )
}

const Total = (props) => {
    const { parts } = props.parts;
    const total = parts[0].exercises + parts[1].exercises + parts[2].exercises
    return (
        <p>Number of exercises {total}</p>
    );
}
const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }
    return (
        <div>
            <Header course={course}/>
            <Content parts={course}/>
            <Total parts={course}/>
        </div>
    )
}
export default App
ReactDOM.render(<App/>, document.getElementById('root'))