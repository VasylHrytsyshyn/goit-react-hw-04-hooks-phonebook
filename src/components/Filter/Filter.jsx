import PropTypes from 'prop-types';
import styles from './Filter.module.css';

export const Filter = ({ value, onChange }) => {
  return (
    <label className={styles.label} htmlFor="">
      <p>Find contacts by name</p>
      <input type="text" value={value} onChange={onChange} />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}