import { GlobalStyle } from './GlobalStyles';
import ImageGallery from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Div } from './App.styled';
import { useState, useEffect } from 'react';
import Modal from './Modal/Modal';
import { Report } from 'notiflix/build/notiflix-report-aio';

import fetchImages from '../api/api';
import { Button } from './Button/Button';

export const App = () => {
  const [value, setValue] = useState('');
  const [pageNumber, setPageNumber] = useState('1 ');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('null');
  const [showModal, setModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [showBtn, setBtn] = useState(false);
  const [images, setImages] = useState([]);

  const submitSearch = query => {
    setValue(query);
    setPageNumber(1);
    setImages([]);
  };

  const getImages = () => {
    fetchImages(value, pageNumber)
      .then(res => {
        if (res.hits.length === 0) {
          Report.info(value, 'No images were found', 'Okay');
          setStatus('resolved');
          return;
        }
        setImages(prevState => [...prevState, ...res.hits]);
        setPageNumber(prevState => prevState + 1);
        setStatus('resolved');
        setBtn(pageNumber < Math.ceil(res.totalHits / 12));
      })

      .catch(error => {
        setError(error);
        setStatus('rejected');
      });

    //
  };

  useEffect(() => {
    if (value) {
      setStatus('pending');
      getImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onOpenModal = (url, alt) => {
    setLargeImageURL(url);
    setImageAlt(alt);
    modalToggle();
  };

  const modalToggle = () => {
    setModal(prevState => !prevState);
  };

  return (
    <Div>
      <Searchbar onSubmit={submitSearch} />
      <ImageGallery
        images={images}
        error={error}
        status={status}
        onLoadMore={getImages}
        onClick={onOpenModal}
      />
      {showBtn && <Button getImages={getImages} />}

      {showModal && (
        <Modal src={largeImageURL} alt={imageAlt} onCloseModal={modalToggle} />
      )}
      <GlobalStyle />
    </Div>
  );
};
