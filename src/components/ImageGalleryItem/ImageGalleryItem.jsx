import PropTypes from 'prop-types';

import { Item, Image } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({
  tags,
  webformatURL,
  largeImageURL,
  onClick,
}) {
  return (
    <Item>
      <Image
        src={webformatURL}
        alt={tags}
        onClick={() => {
          onClick(largeImageURL, tags);
        }}
      />
    </Item>
  );
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
