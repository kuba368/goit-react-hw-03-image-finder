import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';
import { Component } from 'react';

class ImageGalleryItem extends Component {
  render() {
    const { imageData, openModal } = this.props;
    const { webformatURL, tags, largeImageURL, id } = imageData;

    return (
      <li className={styles.ImageGalleryItem}>
        <img
          className={styles.ImageGalleryItemImage}
          key={id}
          src={webformatURL}
          alt={tags}
          onClick={() => openModal(largeImageURL, tags)}
        />
      </li>
    );
  }
}
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  imageData: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
};
