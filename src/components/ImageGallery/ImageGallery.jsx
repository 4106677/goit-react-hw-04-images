import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import { Report } from 'notiflix/build/notiflix-report-aio';
import Loader from 'components/Loader/Loader';

// import { Button } from 'components/Button/Button';

export default function ImageGallery({
  images,
  error,
  status,

  onClick,
}) {
  if (status === 'pending') {
    return Loader();
  }
  if (status === 'rejected') {
    Report.info(error.message, '', 'Okay');
  }

  if (status === 'resolved' && images.length !== 0) {
    return (
      <>
        <Gallery>
          {images.map(({ tags, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={webformatURL}
              tags={tags}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              onClick={(imageURL, imageALT) => {
                onClick(imageURL, imageALT);
              }}
            />
          ))}
        </Gallery>
      </>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array,
  error: PropTypes.string,
  status: PropTypes.string.isRequired,

  onClick: PropTypes.func.isRequired,
};
