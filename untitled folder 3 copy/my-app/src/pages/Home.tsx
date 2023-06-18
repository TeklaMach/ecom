import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../api/Api';
import './Home.css';
import { Product } from './types/Types';
import MyCarousel from '../components/Slider';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/CartReducer';

interface HomeProps {
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Home: React.FC<HomeProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
const dispatch = useDispatch()
  const pageSize: number = 16;
  const totalPages: number = 5;
  const navigate = useNavigate();

  useEffect(() => {
    getProducts(pageSize, currentPage, selectedBrand).then((response) => setProducts(response.data.products));
  }, [currentPage, selectedBrand]);
  
  
  const brands = ['Samsung', 'Sony', 'LG', 'Croma', 'TCL', ]; 
  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const brand = event.target.value;
    setSelectedBrand(brand);
  };
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  // const handleAddToCart = (product: Product) => {
  //   const updatedCartItems = [...cartItems];
  //   const existingItem = updatedCartItems.find((item) => item.id === product.id);
  
  //   if (existingItem) {
  //     const updatedItem = { ...existingItem, amount: existingItem.amount + 1 };
  //     const updatedItems = updatedCartItems.map((item) =>
  //       item.id === existingItem.id ? updatedItem : item
  //     );
  //     setCartItems(updatedItems);
  //   } else {
  //     updatedCartItems.push({ ...product, amount: "1" });
  //     setCartItems(updatedCartItems);
  //   }
    
  
  //   setCartItems(updatedCartItems);
  // };
  
  const renderPageNumbers = () => {
    const pageNumbers: JSX.Element[] = [];
    const pageLimit: number = 5;

    let startPage: number;
    let endPage: number;

    if (totalPages <= pageLimit) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= Math.floor(pageLimit / 2)) {
        startPage = 1;
        endPage = pageLimit;
      } else if (currentPage >= totalPages - Math.floor(pageLimit / 2)) {
        startPage = totalPages - pageLimit + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(pageLimit / 2);
        endPage = currentPage + Math.floor(pageLimit / 2);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`page-link ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div>
      <MyCarousel />
      <div className="offers">
        <div className="offer-svg">
          <img src="hot-proposal.svg" alt="cxela" />
        </div>
        <h2 className="offer-text">ცხელი შეთავაზებები</h2>
      </div>
      <select className="brand-select" value={selectedBrand || ''} onChange={handleBrandChange}>
  <option value="">All Brands</option>
  {brands.map((brand) => (
    <option key={brand} value={brand}>
      {brand}
    </option>
  ))}
</select>

      <div className="product-container">
      {products
  .filter((product) => selectedBrand ? product.brand === selectedBrand : true)
  .map((product) => (
          <div className="product-card" key={product.id}>
            <img
              className="product-image"
              src={product.images[0]}
              alt={product.title}
              onClick={() => handleProductClick(product)}
            />
            <p className="product-title">{product.title}</p>
            <div className="prices">
              <p className="newPrice">{(Number(product.price) - 100).toFixed()}$</p>
              <p className="product-price">{Number(product.price).toFixed() + '$'}</p>
            </div>
            <div className='addToCartButton'>
            <button
  onClick={() => dispatch(addToCart(product))}
  className="addToCart"
>
  კალათაში დამატება
</button>

            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          className="page-link"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {renderPageNumbers()}
        <button
          className="page-link"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
