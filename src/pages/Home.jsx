import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "../components/PropertyCard";
import "../styles/Home.css";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [filters, setFilters] = useState({
    min: "",
    max: "",
    type: "",
    bhk: ""
  });

  useEffect(() => {
    axios.get("/properties.json")
      .then(response => {
        setProperties(response.data);
        setAllProperties(response.data);
      })
      .catch(error => {
        console.error("Error fetching property data:", error);
      });
  }, []);

  const handleFilter = () => {
    let filtered = allProperties;
    
    if (filters.min || filters.max) {
      filtered = filtered.filter(p => {
        const price = parseInt(p.price);
        return (
          (!filters.min || price >= parseInt(filters.min)) &&
          (!filters.max || price <= parseInt(filters.max))
        );
      });
    }


    if (filters.type) {
      filtered = filtered.filter(p =>
        p.type.toLowerCase() === filters.type.toLowerCase()
      );
    }

    if (filters.bhk) {
      filtered = filtered.filter(p =>
        p.bhk.toLowerCase() === filters.bhk.toLowerCase()
      );
    }

    setProperties(filtered);
  };

  return (
    <div className="home-container">
      <h2>Real Estate Listings</h2>

      <div className="filters">
        <input
          type="number"
          placeholder="Min Price"
          value={filters.min}
          onChange={(e) => setFilters({ ...filters, min: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={filters.max}
          onChange={(e) => setFilters({ ...filters, max: e.target.value })}
        />
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">All Types</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Plot">Plot</option>
        </select>
        <select
          value={filters.bhk}
          onChange={(e) => setFilters({ ...filters, bhk: e.target.value })}
        >
          <option value="">Any BHK</option>
          <option value="1BHK">1BHK</option>
          <option value="2BHK">2BHK</option>
          <option value="3BHK">3BHK</option>
        </select>

        <button onClick={handleFilter}>Apply Filters</button>
      </div>

      <div className="property-grid">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Home;
