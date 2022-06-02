import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';

const CONTACTS = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('')
  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };
  
  const addContact = (name, number) => {

    const newContact = {
      id: nanoid(),
      name,
      number
    }
    const noUniqueName = contacts
      .find(contact => contact.name.toLowerCase() === name.toLowerCase())

    if (noUniqueName) {
      return alert(`${name} is already in contacts`);
    }

    setContacts(contacts => [...contacts, newContact])
    // this.setState(prevState => ({
    //   contacts: [...prevState.contacts, newContact],
    // }));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value)
    // this.setState({ filter: e.currentTarget.value });
  };
  
  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const filtered = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
    return filtered;
  };

  const removeContact = contactId => {

    setContacts(contacts => contacts.filter(({ id }) => id !== contactId))
    // this.setState(prevState => {
    //   return {
    //     contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    //   };
    // });
  };

  useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem(CONTACTS);
    const contactFromLocalStorage = JSON.parse(dataFromLocalStorage);
    if (contactFromLocalStorage) { setContacts(contacts => [...contacts,...contactFromLocalStorage]) };

  }, []);

  useEffect(() => {
    localStorage.setItem(CONTACTS, JSON.stringify(contacts))
  },[contacts])

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      {contacts.length > 0 && <ContactList onRemoveContact={removeContact} contacts={filterContacts()} />}
        
    </div>
      
  )
  
};