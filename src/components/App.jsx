import { Component } from "react";
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';

const CONTACTS = 'contacts';

export class App extends Component{
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  
  addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number
    }
    const noUniqueName = this.state.contacts
      .find(contact => contact.name.toLowerCase() === name.toLowerCase())

    if (noUniqueName) {
      return alert(`${name} is already in contacts`);
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  filterContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    const filter = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return filter;
  };

  removeContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  componentDidMount() {
    const dataFromLocalStorage = localStorage.getItem(CONTACTS);
    const contactFromLocalStorage = JSON.parse(dataFromLocalStorage);
    if (contactFromLocalStorage) { this.setState({ contacts: contactFromLocalStorage }) };
  };

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(CONTACTS, JSON.stringify(this.state.contacts));
    }
  }

  render() {

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        {this.state.contacts.length > 0 && <ContactList onRemoveContact={this.removeContact} contacts={this.filterContacts()}/>}
        
      </div>
      
    )
  }
};