import PropTypes from 'prop-types';
import styles from './ContactList.module.css'

export const ContactList = (refs) => {
  const { contacts, onRemoveContact } = refs;
  return (
    <ul className={styles.ul}>
      {contacts.map(contact => {
        return (
          <li className={styles.li} key={contact.id} >
            <span>{contact.name}: {contact.number}</span>
            <button
              key={contact.id}
              name={contact.name}
              type="button"
              onClick={() => onRemoveContact(contact.id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array,
  onRemoveContact: PropTypes.func
}