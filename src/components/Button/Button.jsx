import PropTypes from 'prop-types';
import { Btn } from './Button.styled';

export const Button = ({ getImages }) => {
  return (
    <Btn type="button" onClick={getImages}>
      Load More
    </Btn>
  );
};

Button.propTypes = {
  getImages: PropTypes.func.isRequired,
};
