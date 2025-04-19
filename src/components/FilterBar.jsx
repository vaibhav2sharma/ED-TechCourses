import React from 'react';
import './FilterBar.css';

const FilterBar = ({ tagOptions, selectedTag, setSelectedTag, sortOption, setSortOption, searchQuery, setSearchQuery }) => {
  return (
    <div className="card">
      <input
        className="input"
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="flex mt-2">
        {tagOptions.map((tag) => (
          <button
            key={tag}
            className={`button ${selectedTag === tag ? 'selected' : ''}`}
            onClick={() => setSelectedTag(tag === selectedTag ? '' : tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <select
        className="input mt-2"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="title-asc">Title A-Z</option>
        <option value="title-desc">Title Z-A</option>
        <option value="price-asc">Price Low-High</option>
        <option value="price-desc">Price High-Low</option>
      </select>
    </div>
  );
};

export default FilterBar;