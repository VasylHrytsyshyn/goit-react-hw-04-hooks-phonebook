import { Component } from "react";
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css'

export class ContactForm extends Component {
    state = {
        name: '',
        number: '',    
    };

    handleChange = e => {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.reset();
    };
    reset = () => {
        this.setState({ name: '', number: '' });
    };    


    render() {
        return (
            <form className={styles.form} onSubmit={this.handleSubmit}>
                <label className={styles.label}>
                    Name
                    <input
                        onChange={this.handleChange}
                        value={this.state.name}
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
                        onChange={this.handleChange}
                        value={this.state.number}
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
};

ContactForm.propTypes = {
    onSubmit: PropTypes.func
}