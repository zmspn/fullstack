import axios from "axios";

const personURL  = 'http://localhost:3001/persons/'

const getAllPersons = () => {
    const request = axios.get(personURL)
    return request.then(r => r.data)
}
const createPerson = personObject => {
    const request = axios.post(personURL, personObject)
    return request.then(r => r.data)
}
const deletePerson = personID => {
    console.log("deleted person with id" + personID)
    const request = axios.delete(personURL + personID)
    return request.then(r => r.data)
}
const editPerson = (personID, personObject)=>{
    const request = axios.put(personURL + personID, personObject)
    return request.then(response => response.data)
}

const exportedObject = {
    getAllPersons,
    createPerson,
    deletePerson,
    editPerson
}
export default exportedObject