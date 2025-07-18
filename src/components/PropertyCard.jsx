import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";
import "../styles/PropertyCard.css";

const PropertyCard = ({ property }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFav = favorites.some((fav) => fav.id === property.id);

  const handleFavorite = () => {
    if (isFav) {
      dispatch(removeFavorite(property.id));
    } else {
      dispatch(addFavorite(property));
    }
  };

  return (
    <div className="property-card">
      <img src={property.images[0]} alt={property.title} />
      <div className="property-info">
        <h3>{property.title}</h3>
        <p>{property.location}</p>
        <p className="price">₹{property.price.toLocaleString()}</p>
        <div className="card-buttons">
          <Link to={`/property/${property.id}`}>
            <button className="view-btn">View Details</button>
          </Link>
          <button className="fav-btn" onClick={handleFavorite}>
            {isFav ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
