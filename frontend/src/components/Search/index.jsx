import React, { useState } from 'react';
import { SearchContainer, SearchInput } from './styles';
import Button from '../Button';

const Search = React.memo(({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button onClick={handleSearch}>SEARCH</Button>
    </SearchContainer>
  );
});

export default Search;