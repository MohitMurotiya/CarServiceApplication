import React from "react";
import { Carousel } from "react-bootstrap";
import "./CSS/CarouselComp.css";
import Image1 from "../../assets/images/carousel/ac_disinfection_banner.png";
import Image2 from "../../assets/images/carousel/ac-services_banner.jpg";
import Image3 from "../../assets/images/carousel/battery-services_banner.jpg";
import Image4 from "../../assets/images/carousel/clean-services_banner.png";
import Image5 from "../../assets/images/carousel/paint-services_banner.jpg";
import Image6 from "../../assets/images/carousel/zero_contact_banner.jpg";

function CarouselComponent() {
  return (
    <div className="carousel">
      <Carousel>
        <Carousel.Item>
          <img className="image" src={Image1} alt="Slider 1" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="image" src={Image2} alt="Slider 1" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="image" src={Image3} alt="Slider 1" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="image" src={Image4} alt="Slider 1" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="image" src={Image5} alt="Slider 1" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="image" src={Image6} alt="Slider 1" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselComponent;
