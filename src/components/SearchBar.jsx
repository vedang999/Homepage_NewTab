// components/SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [engine, setEngine] = useState('google');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    let searchUrl;
    switch (engine) {
      case 'google':
        searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        break;
      case 'bing':
        searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
        break;
      case 'duckduckgo':
        searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
        break;
      default:
        searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }

    window.location.href = searchUrl;
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
    <div className="search-engine-container">
      <select 
        value={engine} 
        onChange={(e) => setEngine(e.target.value)}
        className="search-engine"
      >
        <option value="google">Google</option>
        <option value="bing">Bing</option>
        <option value="duckduckgo">DuckDuckGo</option>
      </select>
    </div>
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search the web"
    />
    <button type="submit">
      <span className="material-icons">search</span>
    </button>
  </form>
  );
};

export default SearchBar;