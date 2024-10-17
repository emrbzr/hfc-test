import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchContainer, SearchInputWrapper, SearchInput, ClearButton } from './styles';
import Button from '../Button';
import { searchContent, clearSearch, setSearchTerm } from '../../redux/actions/user-actions';

function Search() {
  const dispatch = useDispatch();
  const isSearching = useSelector(state => state.dashboard.isLoading);
  const searchTerm = useSelector(state => state.userContent.searchTerm);

  const handleSearch = useCallback(() => {
    if (searchTerm.trim()) {
      dispatch(searchContent(searchTerm));
    }
  }, [dispatch, searchTerm]);

  const handleClearSearch = useCallback(() => {
    dispatch(clearSearch());
  }, [dispatch]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  const handleInputChange = useCallback((e) => {
    dispatch(setSearchTerm(e.target.value));
  }, [dispatch]);

  return (
    <SearchContainer>
      <SearchInputWrapper>
        <SearchInput
          type="text"
          placeholder="Search users"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {searchTerm && (
          <ClearButton onClick={handleClearSearch}>×</ClearButton>
        )}
      </SearchInputWrapper>
      <Button onClick={handleSearch} isLoading={isSearching}>SEARCH</Button>
    </SearchContainer>
  );
}

export default React.memo(Search);
