import { Component } from 'react';
import styles from './App.module.css';
import fetchImages from '../services/PixabayAPI';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const INITIAL_STATE = {
  query: '',
  images: [],
  page: 1,
  numberOfHits: 0,
  showModal: false,
  isLoading: false,
  errorMsg: '',
  modalImageSrc: '',
  modalImageAlt: '',
};

class App extends Component {
  state = { ...INITIAL_STATE };

  setErrorMsg = errorMsg =>
    this.setState(prevState => ({ ...prevState, errorMsg: errorMsg }));

  setIsLoading = isLoading => {
    this.setState(prevState => ({ ...prevState, isLoading: isLoading }));
  };

  setInitialState = () =>
    this.setState(prevState => ({ ...prevState, ...INITIAL_STATE }));

  setShowModal = (showModal, modalImageSrc, modalImageAlt) =>
    this.setState(prevState => ({
      ...prevState,
      showModal: showModal,
      modalImageSrc: modalImageSrc,
      modalImageAlt: modalImageAlt,
    }));

  handleModalClose = () => this.setShowModal(false);

  handleShowModal = (largeImageURL, largeImageAlt) =>
    this.setShowModal(true, largeImageURL, largeImageAlt);

  handleSearchQuery = e => {
    e.preventDefault();
    this.setInitialState();
    this.setIsLoading(true);
    const { queryInput } = e.target.elements;
    const queryValue = queryInput.value;
    const { page } = this.state;

    if (queryValue) {
      return fetchImages(queryValue, page)
        .then(data => {
          if (data.totalHits === 0) {
            this.setIsLoading(false);
            return this.setErrorMsg('No images found. Try again.');
          }
          this.setErrorMsg('');
          this.setIsLoading(false);
          return this.setState(prevState => ({
            ...prevState,
            images: data.hits,
            numberOfHits: data.totalHits,
            query: queryValue,
            page: 1,
          }));
        })
        .catch(err => {
          this.setIsLoading(false);
          console.log(err);
          this.setErrorMsg('Oops, something went wrong!');
        });
    }
    this.setIsLoading(false);
    this.setErrorMsg('The search field cannot be empty');
  };

  handleLoadMoreImg = () => {
    const { page, query, images } = this.state;
    return fetchImages(query, page + 1)
      .then(data => {
        this.setState(prevState => ({
          ...prevState,
          images: [...images, ...data.hits],
          page: page + 1,
        }));
      })
      .catch(err => console.log(err));
  };

  render() {
    const {
      images,
      numberOfHits,
      isLoading,
      errorMsg,
      showModal,
      modalImageSrc,
      modalImageAlt,
    } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSearchQuery} />
        {isLoading ? (
          <Loader />
        ) : (
          images.length > 0 && (
            <>
              <ImageGallery
                imagesData={images}
                openModal={this.handleShowModal}
              />
              {images.length < numberOfHits && (
                <Button onClick={this.handleLoadMoreImg} />
              )}
            </>
          )
        )}
        {errorMsg && <div>{errorMsg}</div>}
        {showModal && (
          <Modal
            src={modalImageSrc}
            alt={modalImageAlt}
            closeModal={this.handleModalClose}
          />
        )}
      </div>
    );
  }
}
export default App;
