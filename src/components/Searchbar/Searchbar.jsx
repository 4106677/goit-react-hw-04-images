import PropTypes from 'prop-types';
import { useState } from 'react';

import {
  SearchBar,
  SearchForm,
  SearchBtn,
  SearchBtnLabel,
  Input,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(query);

    setQuery('');
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchBtn type="submit">
          <SearchBtnLabel>Search</SearchBtnLabel>
        </SearchBtn>

        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </SearchForm>
    </SearchBar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
