import React from "react";
import { useSelector } from "react-redux";
import PropertyCard from "../components/PropertyCard";
import "../styles/Favorites.css";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.items);

  return (
    <div className="favorites-container">
      <h2>Saved Properties</h2>
      {favorites.length === 0 ? (
        <p>No favorites saved yet.</p>
      ) : (
        <div className="property-grid">
          {favorites.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
