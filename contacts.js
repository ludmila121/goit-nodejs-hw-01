const fs = require("fs/promises");
const path = require("path");
const {nanoid}= require("nanoid");
const contactsPath = path.join(__dirname, "/db/contacts.json");

async function updateContacts(contacts) {
await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}
// TODO: задокументувати кожну функцію
  async function listContacts() {
    try{
      const contacts = await fs.readFile(contactsPath);
      return JSON.parse(contacts);
} catch (error){
  console.log(error.message);
}
} 
 async function getContactById(contactId) {
  try{
    const contacts = await listContacts();
    const result = contacts.find(({id}) => id === contactId);
    if(!result) {
        return null;
    }  return result;
  } catch (error) { 
    console.log(error.message);
  }}

  
   async function removeContact(contactId) {
    try{
      const contacts = await listContacts();
      const idx = contacts.findIndex(({id}) => id === contactId);
      if (idx === -1) {
          return null;
      }
      const [removeContact] = contacts.splice(idx,1);
      updateContacts(contacts);
      return removeContact;
    } catch (error){
      console.log(error.message);
    }
  } 

  
  async function addContact(name, email, phone) { 
    try {
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
    } catch (error){
      console.log(error.message);
    }

  } 
  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  } 