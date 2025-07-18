import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropertyCard from "../components/PropertyCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/Favorites.css";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.items);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {setLoading(false)}, 1000); // delay for example
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="favorites-container">
      <h2>Saved Properties</h2>
      {loading ? (
        <div className="property-grid">
          {Array.from({ length: 3 }).map((_, i) => (
            <PropertyCard key={i} loading={true} />
          ))}
        </div>
      ) : favorites.length === 0 ? (
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
