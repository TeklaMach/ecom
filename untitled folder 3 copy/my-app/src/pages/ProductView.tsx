import React, { useEffect, useState } from 'react';
import { getProduct } from '../api/Api';
import { Product } from './types/Types';
import './ProductView.css';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const ProductView: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [titleColor, setTitleColor] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');


  useEffect(() => {
    const pathname = window.location.pathname;
    const id = pathname.substring(pathname.lastIndexOf('/') + 1);

    getProduct(id)
      .then((response) => setProduct(response.data))
      .catch((error) => {
        console.log('Error fetching product:', error);
      });
  }, []);
  const handleColorSelection = (color: string) => {
    setSelectedColor(color);
    switch (color) {
      case 'color-one':
        setTitleColor('#0a3251');
        break;
      case 'color-two':
        setTitleColor('#4b3d82');
        break;
      case 'color-three':
        setTitleColor('#2585ce');
        break;
      default:
        setTitleColor('');
        break;
    }
  };
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  if (!product) {
    return <div>Loading...</div>;
  }
  const displayedImages = product.images.slice(0, 4);
  return (
    
    <>
    <div className="product-content"></div>
    <div className='product-details'>
      <div className='product-images'>
      <div className="current-image">
            <img
              className="productView-image"
              src={selectedImage || product.images[0]}
              alt={product.title}
            />
          </div>
      <div className="detailed-images">
            {displayedImages.map((image, index) => (
              <img
                key={index}
                className="detailed-image"
                src={image}
                alt={product.title}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        </div>
          
        <div className="product-details-wrapper">
        <h2 className="productView-title" style={{ color: titleColor }}>
        {product.title}
      </h2>
        <div className='product-status'>
          <h3 style={{ color: titleColor }}>მარაგშია</h3>
          <LocationOnOutlinedIcon className='product-status-icon'/>
        </div>
        <div className='product-features'>
          <div className="product-settings">
          <div className="product-color-paletes">
              <div
                className={`color color-one ${selectedColor === 'color-one' ? 'selected' : ''}`}
                onClick={() => handleColorSelection('color-one')}
              ></div>
              <div
                className={`color color-two ${selectedColor === 'color-two' ? 'selected' : ''}`}
                onClick={() => handleColorSelection('color-two')}
              ></div>
              <div
                className={`color color-three ${selectedColor === 'color-three' ? 'selected' : ''}`}
                onClick={() => handleColorSelection('color-three')}
              ></div>
            </div>
            <div className="product-memory">
            </div>
          </div>
          <div className="product-sizes">
          <ul className="product-s-d">
            <li>
            <div className="spec-l-side">
            <span className="spec-name" style={{ color: titleColor }}>ეკრანის ზომა: </span>
            </div>
            <b>  6.1 inches</b>
            </li>
            <li>
            <div className="spec-l-side">
            <span className="spec-name" style={{ color: titleColor }}>ოპერატიული მეხსიერება: </span>
            </div> 
            <b>  6 GB</b>
            </li>
            <li>
            <div className="spec-l-side">
            <span className="spec-name" style={{ color: titleColor }}>შიდა მეხსიერება: </span>
            </div>
            <b>  128 GB</b>
            </li>
            <li>
            <div className="spec-l-side">
            <span className="spec-name" style={{ color: titleColor }}>მთავარი კამერა: </span>
            </div>
            <b>  48+12+12+TOF</b>
            </li>
            </ul>
            </div>
      </div>
      <div className="product-memory-title">
        <span style={{ color: titleColor }}>მეხსიერება:</span>
      <div className="product-memories">
                <h2 className="memories" style={{ color: titleColor }}>128GB</h2>
                <h2 className="memories" style={{ color: titleColor }}>256GB</h2>
                <h2 className="memories" style={{ color: titleColor }}>512GB</h2>
                <h2 className="memories" style={{ color: titleColor }}>1TBS</h2>
              </div>
      </div>
              
        </div>
      {/* <div className="buyingWrapper">
          <p className='productView-price'>{Number(product.price).toFixed(1) + '$'}</p>
          <button>lala</button>
          <button>lala</button>
          <button>lala</button>
        </div> */}

    </div>
    {/* <div>
        <p>{product.description.split('\n').map((line: string, index: number) => (
          <React.Fragment key={`${product.id}-${index}`}>
            {line}
            <br />
          </React.Fragment>
        ))}</p>
      </div> */}
      </>
    );

};

export default ProductView;
