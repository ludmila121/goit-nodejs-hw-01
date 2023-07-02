const fs = require("fs/promises");
const path = require("path");
const {nanoid}= require("nanoid");
const contactsPath = path.join(__dirname, "/db/contacts.json");

async function updateContacts(contacts) {
await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}
// TODO: задокументувати кожну функцію
 async function listContacts() {
   const contacts = await fs.readFile(contactsPath);
   return JSON.parse(contacts);
}
  async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(({id}) => id === contactId);
    if(!result) {
        return null;
    }
    return result;
  }
  
  async function removeContact(contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(({id}) => id === contactId);
    if (idx === -1) {
        return null;
    }
    const [removeContact] = contacts.splice(idx,1);
    updateContacts(contacts);
    return removeContact;
  }
  
  async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
       id: nanoid(),
       name,
       email,
       phone, 
    };
    contacts.push(newContact);
    updateContacts(contacts);
    return newContact;
  }
  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };