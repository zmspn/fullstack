const Header = ({course}) => <h1>{course}</h1>
const Part = ({name, amount}) => <p>{name} {amount}</p>

const Content = ({parts}) =>
    <div>
        {parts.map(single =>
            <Part
                key={single.id}
                name={single.name}
                amount={single.exercises}/>
        )}
    </div>
const Total = ({parts}) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0)
    return (
        <p><b>total of {total} exercises</b></p>
    )
}
const Course = ({courses}) => (
    <div>
        {courses.map(single =>
            <div key={single.id}>
                <Header course={single.name}/>
                <Content parts={single.parts}/>
                <Total parts={single.parts}/>
            </div>
        )}
    </div>
)
export default Course