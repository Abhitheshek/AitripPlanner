
import React, { useState } from "react";

const LocationSearch = ({ handledata }) => {
  const [searchResult, setSearchResult] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchResult(value);
    
    // Store typed location if user is typing
    handledata('location', {
      name: value,
      lat: null,
      lon: null,
      isManualEntry: true
    });

    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          value
        )}&format=json`
      );

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchResult(suggestion.display_name);
    // Store suggested location with coordinates
    handledata('location', {
      name: suggestion.display_name,
      lat: suggestion.lat,
      lon: suggestion.lon,
      isManualEntry: false
    });
    setSuggestions([]);
  };

  return (
    <div className="relative w-full mb-4">
      <input
        type="text"
        value={searchResult}
        onChange={handleInputChange}
        placeholder="Type a location..."
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      {suggestions.length > 0 && (
        <div className="absolute w-full max-h-60 overflow-y-auto bg-white border shadow-sm rounded-md z-10">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.display_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
