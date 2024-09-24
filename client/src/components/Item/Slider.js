import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import land1Img from '../../asset/brand/land.png'

function Carouseldiv() {
  return (
    <div>
      <center>
      <Carousel className='mt-2' data-bs-theme="dark" indicators={false} controls={false}>
      <Carousel.Item>
      <img src={'/featured/MGU.webp'} className="d-block w-75" alt="Second slide"/>
      </Carousel.Item>
      <Carousel.Item>
         <img src={'/featured/mug1.jpg'} className="d-block w-75" alt="Second slide"/>
      </Carousel.Item>
      <Carousel.Item>
         <img src={'/featured/mug2.webp'} className="d-block w-75" alt="Second slide"/>
      </Carousel.Item>
      <Carousel.Item>
         <img src={'/featured/bts.jpg'} className="d-block w-75" alt="Second slide"/>
      </Carousel.Item>
      <Carousel.Item>
         <img src={'/featured/bts1.webp'} className="d-block w-75" alt="Second slide"/>
      </Carousel.Item>
      <Carousel.Item>
         <img src={'/featured/kids.jpg'} className="d-block w-75" alt="Second slide"/>
      </Carousel.Item>
      <Carousel.Item>
         <img src={'/featured/kids1.webp'} className="d-block w-75" alt="Second slide"/>
      </Carousel.Item>

      </Carousel> 
      </center>
    </div>
  )
}

export default Carouseldiv
