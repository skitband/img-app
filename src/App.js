import React, { useState, useEffect } from 'react';
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from 'axios';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';

function App() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const getRandomInt = (min, max) =>  {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  const handleAddImage = () => {
    setLoading(true)
    const randomInt = getRandomInt(0, 999);
    axios.get(`https://picsum.photos/id/${randomInt}/info`)
      .then(response => {
        setData(data => {
          return [...data, response.data];
        });
        setLoading(false);
        setAdded(true);
      })
      .catch(error => {
        alert(error + " Please try again ");
        setLoading(false);
        setAdded(false);
    });
  }

  const handleRemoveImage = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    const filteredArray = data.filter((obj, index) => index !== randomIndex);

    // Update the state with the filtered array
    setData(filteredArray);
    setAdded(false)
  }

  const renderImages = () =>
    data.map((image) => (
      <div className="image-wrapper" key={image.id}>
        <img src={image.download_url} alt={image.author} width={200}/>
      </div>
    ));

  const responsive = {
    0: { 
        items: 1
    },
    568: { 
        items: 2
    },
    1024: {
        items: 3,
    },
  };

  return (
    <div className="App">
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">Image App</h1>
        <p class="text-muted mb-4">no. of images: {data.length} </p>
        <div className="col-lg-6 mx-auto">
          <div>
          {loading ? (
            <div>
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div>
              {added ? (
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                  </svg>
                </strong> Image successfully added!
                </div>
              ) : (
                <p></p>
              )}
              {data.length >= 1 ? <AliceCarousel
                mouseTracking
                items={renderImages()}
                autoPlay
                autoPlayInterval={3000}
                responsive={responsive}
              /> : <p class="lead mb-4">click the add button to create an image slider</p>}
            </div>
          )}
          
          </div>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="button" className="btn btn-primary px-4 gap-3" onClick={handleAddImage}>Add Image</button>
            <button type="button" className="btn btn-outline-secondary px-4" onClick={handleRemoveImage}>Remove Image</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
