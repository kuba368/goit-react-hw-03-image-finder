import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
import { nanoid } from 'nanoid';

class Searchbar extends Component {
  render() {
    const { onSubmit } = this.props;
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={onSubmit}>
          <button className={styles.SearchFormButton} type="submit">
            <span className={styles.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={styles.SearchFormInput}
            key={nanoid()}
            name="queryInput"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
