import React from 'react';
import img1 from '../../images/smartphone-laptop-dark-mockup_117023-2975.avif';
import img2 from '../../images/slider1.jpeg';
import img3 from '../../images/2.webp';
import img4 from '../../images/3.webp';
export default function Carousel() {
  return (
    <div
      id="myCarousel"
      className="carousel slide border border-light border-2"
      data-bs-ride="carousel"
      data-bs-interval="3000"
    >
      <div className="carousel-inner">
        <div
          className="carousel-item active "
          style={{ width: '100%', height: '580px' }}
        >
          <img
            src="https://res.cloudinary.com/dxguqzge7/image/upload/v1682838911/Electronics_lrjvlg.jpg"
            className="d-block w-100 "
            alt="First slide"
          />
          <div className="carousel-caption">
            <h5>Discover The Electronics World</h5>
          </div>
        </div>
        <div
          className="carousel-item"
          style={{ width: '100%', height: '580px' }}
        >
          <img src={img3} className="d-block w-100 " alt="Second slide" />
          <div className="carousel-caption">
            <h5>Div into Your Derms</h5>
          </div>
        </div>
        <div
          className="carousel-item"
          style={{ width: '100%', height: '580px' }}
        >
          <img src={img2} className="d-block w-100 " alt="Third slide" />
          <div className="carousel-caption">
            <h5>The Biggest Store Is Here</h5>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
