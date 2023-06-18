import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Slider.css'
const MyCarousel: React.FC = () => {
  return (
    <div>
      <Carousel showThumbs={false}>
        <div>
          <img src="sliderimg1.png" alt="sliderimg1" className='slider-img'/>
        </div>
        <div>
          <img src="sliderimg2.png" alt="sliderimg2" className='slider-img'/>
        </div>
        <div>
          <img src="sliderimg3.png" alt="sliderimg3" className='slider-img'/>
        </div>
        <div>
          <img src="sliderimg4.png" alt="sliderimg4" className='slider-img'/>
        </div>
        <div>
          <img src="sliderimg5.png" alt="sliderimg5" className='slider-img'/>
        </div>
      </Carousel>
    </div>
  );
};

export default MyCarousel;
