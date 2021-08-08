import React from 'react'

const Person = ({person, removePerson}) => {
    return (
        <li key={person.id}> {person.name} {person.number}
            <button onClick={() => removePerson(person.id)}>delete</button>
        </li>
    )
}

export default Person