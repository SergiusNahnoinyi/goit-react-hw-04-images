import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import pixabayApi from '../../services/pixabayApi';

import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Loader from '../Loader';

import s from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function ImageGallery({ imageName, handleModal }) {
  const [currentPage, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (imageName !== '') {
      setStatus(Status.PENDING);
      getImages(imageName, 1);
    }
    return () => {
      setImages([]);
      setPage(1);
    };
  }, [imageName]);

  useEffect(() => {
    if (currentPage > 1) {
      getImages(imageName, currentPage);
    }
  }, [currentPage]);

  const getImages = (imageName, currentPage) => {
    pixabayApi.fetchImages(imageName, currentPage).then(images => {
      if (images.length === 0) {
        toast.error('Ничего не найдено');
        setStatus(Status.REJECTED);
        return;
      }
      setImages(prevImages => [...prevImages, ...images]);
      setStatus(Status.RESOLVED);
    });
  };

  const incrementPage = () => {
    setPage(currentPage => currentPage + 1);
  };

  const handleImageClick = e => {
    handleModal(e.target.lowsrc);
  };

  if (status === 'idle' || status === 'rejected') {
    return <ul className={s.Gallery}></ul>;
  }

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'resolved') {
    return (
      <>
        <ul className={s.Gallery}>
          {images.map(image => (
            <ImageGalleryItem
              onClick={handleImageClick}
              key={image.id}
              imageURL={image.webformatURL}
              largeImage={image.largeImageURL}
              name={image.tags}
            />
          ))}
        </ul>
        <Button onLoadMore={incrementPage} />
      </>
    );
  }
}

ImageGallery.propTypes = {
  handleModal: PropTypes.func.isRequired,
  imageName: PropTypes.string.isRequired,
};
