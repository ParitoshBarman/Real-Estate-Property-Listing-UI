import React from "react";
import { useParams } from "react-router-dom";
import properties from "../data/properties.json";
import "../styles/Details.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const PropertyDetails = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id.toString() === id);

  if (!property) return <div>Property not found.</div>;

  return (
    <div className="details-container">
      <h2>{property.title}</h2>

      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={3000}
        className="carousel-container mycustomstyle"
      >
        {property.images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`Property ${index}`} />
          </div>
        ))}
      </Carousel>

      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Price:</strong> {property.price.toLocaleString()}</p>
      <p><strong>Area:</strong> {property.area}</p>
      <p><strong>BHK:</strong> {property.bhk}</p>
      <p><strong>Type:</strong> {property.type}</p>
      <p><strong>Description:</strong> {property.description}</p>
      <p><strong>Amenities:</strong> {property.amenities.join(", ")}</p>

      <div className="map">
        <iframe
          width="100%"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
          src={`https://maps.google.com/maps?q=${property.lat},${property.lng}&z=15&output=embed`}
        ></iframe>
      </div>

      <button className="enquiry-btn" onClick={() => alert("Enquiry popup placeholder")}>
        Enquire Now
      </button>
    </div>
  );
};

export default PropertyDetails;
