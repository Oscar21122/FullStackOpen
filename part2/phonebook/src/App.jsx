import { useState, useEffect } from 'react'
import phoneService from './services/phones'

import axios from 'axios'

const Filter = ({persons, filterValue, onChangeFilter}) => {
  return (
    <div>
      filter shown with <input value={filterValue} onChange={onChangeFilter}/>
      {filterValue === "" ? null : <Persons persons={persons} />}
    </div>
  )
}

const PersonForm = ({onSubmit, nameValue, numberValue, onChangeName, onChangeNumber}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={nameValue} onChange={onChangeName}/>
        </div>
        <div>
          number: <input value={numberValue} onChange={onChangeNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({persons, onDelete}) => {
  return (
    <div>
      {persons.map(person => <Person key={person.id} name={person.name} number={person.number} onDelete={() => onDelete(person.id)}></Person>)}
    </div>
  )
}

const Person = ({name, number, onDelete}) => {
  return (
    <div>
      {name} {number} <button onClick={onDelete} type="submit">delete</button>
    </div>
  )
}

const FailedNotification = ({ message }) => {
  const error = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (message === null) {
    return null
  }

  return (
    <div style={error}>
      {message}
    </div>
  )
}


const SuccededNotification = ({ message }) => {
  const succeded = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (message === null) {
    return null
  }

  return (
    <div style={succeded}>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [succededMessage, setSuccededMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log("button clicked", event.target)
    const nameObject = {
      name: newName,
      number: newNumber
    }
    let already = 0
    for (const person of persons) {
      if (person.name === newName) {
        already = 1
        if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          phoneService
            .update(person.id, nameObject)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id === person.id ? returnedPerson : p))
              setSuccededMessage(
                `Updated ${newName}`
              )
              setTimeout(() => {
                setSuccededMessage(null)
              }, 5000)
            })
            .catch(error => {
              setErrorMessage(
                `Information of ${newName} has already been removed from the server`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
        }
      } 
    }

    if (already === 0) {
    phoneService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setSuccededMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setSuccededMessage(null)
        }, 5000)
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      phoneService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }    
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().startsWith(filter.toLowerCase()))

  useEffect(() => {
    phoneService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccededNotification message={succededMessage} />
      <FailedNotification message={errorMessage} />
      <Filter persons={filteredPersons} filterValue={filter} onChangeFilter={handleFilter}></Filter>
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} nameValue={newName} numberValue={newNumber} onChangeName={handleNameChange} onChangeNumber={handleNumberChange}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons} onDelete={deletePerson}></Persons>
    </div>
  )
}

export default App