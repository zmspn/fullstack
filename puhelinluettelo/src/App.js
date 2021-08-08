import React, {useEffect, useState} from 'react'
import PersonForm from "./components/AddPerson";
import Persons from "./components/Persons";
import personService from '../src/services/Persons'
import Notification from "./components/Notification";


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNumber] = useState('')
    const [allPersons, setAllPersons] = useState(persons)
    const [notification, setNotification] = useState(null)
    useEffect(() => {
        console.log("loading ")

        personService
            .getAllPersons()
            .then(r => {
                console.log("response", r)
                setPersons(r)
                setAllPersons(r)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        if (!allPersons.map(person => person.name).includes(newName)) {

            const personObject = {
                name: newName,
                number: newNumber,
            }
            personService
                .createPerson(personObject)
                .then(r => {
                    console.log(r)
                    setPersons(persons.concat(r))
                    setAllPersons(allPersons.concat(r))
                    setNotification("Success: user " + personObject.name + " has been added")
                    setTimeout(() => {
                        setNotification(null)
                    }, 3000)
                })

        } else {
            if (window.confirm(`${newName} is already added to phonebook, replace number with new one ?`)) {
                const personObject = {
                    name: newName,
                    number: newNumber,
                }
                const editPerson = allPersons.find(element => element.name === newName)
                personService
                    .editPerson(editPerson.id, personObject).then(r => {
                    setPersons(persons.map(person => person.name !== newName ? person : r))
                    setAllPersons(allPersons.map(person => person.name !== newName ? person : r))
                    setNotification("Success: user's" + personObject.name + " number changed")
                    setTimeout(() => {
                        setNotification(null)
                    }, 3000)
                })
            }
        }
    }
    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNumber(event.target.value)
    }
    const handleFilterChange = (event) => {
        const searchResults = () => allPersons.filter(person => person.name.toLocaleLowerCase().match(event.target.value))
        setPersons(searchResults())
    }
    const removePerson = personID => {
        const usr = persons.filter(person => person.id === personID)
        if (window.confirm('Delete user ' + usr[0].name + " ?")) {
            personService
                .deletePerson(personID)
                .then(r => {
                    console.log(r)
                    setNotification("Success: user " + usr[0].name + " has been deleted")
                    setTimeout(() => {
                        setNotification(null)
                    }, 3000)
                })
                .catch(err =>{
                    setNotification("Failure: user " + usr[0].name + " not found")
                })
            const filtered = persons.filter(person => person.id !== personID)
            setAllPersons(filtered)
            setPersons(filtered)

        }
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification}/>
            <form>
                <div>filter shown with<input onChange={handleFilterChange}/>
                </div>
            </form>
            <h2>add a new</h2>
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}/>
            <h2>Numbers</h2>
            <Persons persons={persons} removePerson={removePerson}/>
        </div>
    )
}
export default App