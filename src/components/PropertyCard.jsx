import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";
import "../styles/PropertyCard.css";

const PropertyCard = ({ property, loading = false }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFav = favorites.some((fav) => fav.id === property?.id);

  const handleFavorite = () => {
    if (isFav) {
      dispatch(removeFavorite(property.id));
    } else {
      dispatch(addFavorite(property));
    }
  };

  return (
    <div className="property-card">
      {loading ? (
        <Skeleton height={180} />
      ) : (
        <img src={property.images[0]} alt={property.title} />
      )}

      <div className="property-info">
        <h3>{loading ? <Skeleton width={150} /> : property.title}</h3>
        <p>{loading ? <Skeleton width={100} /> : property.location}</p>
        <p className="price">
          {loading ? <Skeleton width={80} /> : `₹${property.price.toLocaleString()}`}
        </p>
        <div className="card-buttons">
          {loading ? (
            <Skeleton height={30} width={100} />
          ) : (
            <Link to={`/property/${property.id}`}>
              <button className="view-btn">View Details</button>
            </Link>
          )}
          {loading ? (
            <Skeleton height={30} width={30} circle />
          ) : (
            <button className="fav-btn" onClick={handleFavorite}>
              {isFav ? "♥" : "♡"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
