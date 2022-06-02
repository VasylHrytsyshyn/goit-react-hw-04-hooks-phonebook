import { useState } from "react";
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css'

export const ContactForm = ({onSubmit}) => {
    const [name, setName] = useState('');
    const [number, setNamber] = useState('');

    const handleChange = e => {
        const { name, value } = e.currentTarget;

        if (name === "name") {
            setName(value);
        };
        if (name === "number") {
            setNamber(value);
        };
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(name, number);
        reset();
    };

    const reset = () => {
        setName('');
        setNamber('');
        // this.setState({ name: '', number: '' });
    };    
   
        return (
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Name
                    <input
                        onChange={handleChange}
                        value={name}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                    />
               </label>
                <label className={styles.label}>
                    Number
                    <input
                        onChange={handleChange}
                        value={number}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                    />
                </label>
               <button className={styles.button} type="submit">
                   Add Contact
                </button>
            </form>
        );
    
};

ContactForm.propTypes = {
    onSubmit: PropTypes.func
}