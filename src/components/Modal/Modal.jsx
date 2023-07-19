import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import { Component } from 'react';

class Modal extends Component {
  handleOverlayClick = e => {
    const overlay = e.currentTarget;
    if (e.target === overlay) {
      this.props.closeModal();
    }
  };

  handleCloseOnEsc = e => {
    if (e.key === 'Escape') {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleCloseOnEsc);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleCloseOnEsc);
  }

  render() {
    const { src, alt } = this.props;
    return (
      <div className={styles.Overlay} onClick={this.handleOverlayClick}>
        <div className={styles.Modal}>
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
}
export default Modal;

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
