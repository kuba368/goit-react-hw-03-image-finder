import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';
import { nanoid } from 'nanoid';
import { Component } from 'react';

class ImageGallery extends Component {
  render() {
    const { imagesData, openModal } = this.props;
    return (
      <ul className={styles.ImageGallery}>
        {imagesData.map(imageData => (
          <ImageGalleryItem
            key={nanoid()}
            imageData={imageData}
            openModal={openModal}
          />
        ))}
      </ul>
    );
  }
}
export default ImageGallery;

ImageGallery.propTypes = {
  imagesData: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};
