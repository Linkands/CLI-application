const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const contactsPath = path.resolve('./db/contacts.json')

function listContacts() {
  fs.readFile(contactsPath, 'utf-8', (error, data) => {
    if (error) {
      return console.log(error)
    }
    const contacts = JSON.parse(data)
    console.table(contacts)
  })
}

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf-8', (error, data) => {
    if (error) {
      return console.log(error)
    }

    const contacts = JSON.parse(data)

    const contact = contacts.find((contact) => {
      if (contact.id === contactId) {
        console.log(`Get contact by ID ${contactId}:`)
        console.table(contact)
        return contact
      }
    })

    if (contact == null) {
      console.log(`Contact with ID "${contactId}" not found!`)
    }
  })
}

function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf-8', (error, data) => {
    if (error) {
      return console.log(error)
    }
    const contacts = JSON.parse(data)
    const newContact = contacts.filter((contact) => contact.id !== contactId)

    if (newContact.length === contacts.length) {
      console.log(
        `Contact with ID "${contactId}" not found. Please enter valid ID.`,
      )
      return
    }
    console.log('Contact deleted! New list: ')
    console.table(newContact)
    fs.writeFile(contactsPath, JSON.stringify(newContact), (error) => {
      if (error) {
        return console.log('error :', error)
      }
    })
  })
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, 'utf-8', (error, data) => {
    if (error) {
      return console.log(error)
    }
    const contacts = JSON.parse(data)

    contacts.push({
      id: uuidv4(),
      name: name,
      email: email,
      phone: phone,
    })

    console.log('Contacts added! New lists: ')
    console.table(contacts)

    fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
      if (error) {
        return console.log(error)
      }
    })
  })
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
