import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/Details.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PropertyDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState(null);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      axios
        .get("/properties.json")
        .then((res) => {
          const found = res.data.find((p) => p.id.toString() === id);
          setProperty(found);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching property data:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Enquiry Submitted:", formData);
    alert("Your enquiry has been submitted!");
    setShowEnquiryForm(false);
    setFormData({ name: "", email: "", message: "" });
  };

  if (loading) {
    return (
      <div className="details-container">
        <h2><Skeleton width={300} /></h2>
        <div className="carousel-container">
          <Skeleton height={300} />
        </div>
        <Skeleton count={6} />
        <Skeleton height={300} style={{ marginTop: "1rem" }} />
        <Skeleton height={50} width={150} style={{ marginTop: "1rem" }} />
      </div>
    );
  }

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
      <p><strong>Price:</strong> ₹{property.price}</p>
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

      <button className="enquiry-btn" onClick={() => setShowEnquiryForm(true)}>
        Enquire Now
      </button>

      {/* Modal Popup */}
      {showEnquiryForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Enquire about: {property.title}</h3>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
              <div className="modal-buttons">
                <button type="submit" className="submit-btn">Send</button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowEnquiryForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
