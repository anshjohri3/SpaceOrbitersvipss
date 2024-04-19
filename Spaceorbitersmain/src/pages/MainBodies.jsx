import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import background from '../assets/background.png';


const MainBodies = () => {
    <Navbar />

  const [bodies, setBodies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(24);

  useEffect(() => {
    axios.get('https://api.le-systeme-solaire.net/rest.php/bodies')
      .then(response => {
        setBodies(response.data.bodies);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 24);
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Main Celestial Bodies and their Characteristics</h1>
      <div style={gridStyle}>
        {bodies.slice(0, visibleCount).map((body, index) => (
          <div key={index} style={cardStyle}>
            <h5 style={titleStyle}>{body.englishName}</h5>
            <p style={textStyle}>Type: {body.bodyType}</p>
            <p style={textStyle}>Mass: {body.mass?.massValue} x 10^{body.mass?.massExponent} kg</p>
            <p style={textStyle}>Gravity: {body.gravity} m/s²</p>
            <p style={textStyle}>Mean Radius: {body.meanRadius} km</p>
            <p style={textStyle}>Density: {body.density} g/cm³</p>
            <p style={textStyle}>Temperature: {body.avgTemp} K</p>
            <p style={textStyle}>Semimajor Axis: {body.semimajorAxis} km</p>
            <p style={textStyle}>Perihelion: {body.perihelion} km</p>
            <p style={textStyle}>Aphelion: {body.aphelion} km</p>
            <p style={textStyle}>Eccentricity: {body.eccentricity}</p>
            <p style={textStyle}>Orbital Period: {body.orbitalPeriod} days</p>
            <p style={textStyle}>Orbital Speed: {body.orbitalSpeed} km/s</p>
            <p style={textStyle}>Discovered By: {body.discoveredBy}</p>
            <p style={textStyle}>Discovery Date: {body.discoveryDate}</p>
            {/* Family Relationships can be added here if available in the API */}
          </div>
        ))}
      </div>
      {visibleCount < bodies.length && (
        <button onClick={loadMore} style={loadMoreButtonStyle}>
          Load More
        </button>
      )}
    </div>
  );
};

// Existing styles (containerStyle, gridStyle, cardStyle, titleStyle, textStyle, loadMoreButtonStyle)
// Container style
const containerStyle = {
    backgroundColor: 'black',
    padding: '20px',
    backgroundImage: `url(${background})`, // Use the imported variable here
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  
  // Grid style
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '20px',
    marginBottom: '20px'
  };
  
  // Updated card style
  const cardStyle = {
    display: 'block',
    // maxWidth: 'sm',
    padding: '1.5rem',
    backgroundColor: '#1f2937', // Tailwind's dark:bg-gray-800
    border: '1px solid #374151', // Tailwind's dark:border-gray-700
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    transition: 'background-color 0.3s',
    textDecoration: 'none',
    color: 'white', // Text color white
    cursor: 'pointer'
  };
  
  cardStyle[':hover'] = {
    backgroundColor: '#374151' // Tailwind's dark:hover:bg-gray-700
  };
  
  // Title style
  const titleStyle = {
    marginBottom: '0.5rem',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'white' // Tailwind's dark:text-white
  };
  
  // Heading style
  const headingStyle = {
      color: 'white',
      textAlign: 'center',
      marginBottom: '2rem',
      fontSize: '2.5rem',
    };
  
  // Text style
  const textStyle = {
    fontSize: '1rem',
    color: '#d1d4dc', // Tailwind's dark:text-gray-400
  };
  
  // Load More button style
  const loadMoreButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#1c6f42',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  };

export default MainBodies;
