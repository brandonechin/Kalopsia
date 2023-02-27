import React from 'react';
import ResultsList from '../components/results-list';

export default function Results({ searchResult, searchTerm }) {
  return (
    <ResultsList searchResult={searchResult} searchTerm={searchTerm}/>
  );
}
