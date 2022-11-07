import React, { useState } from 'react'
import {useParams} from 'react-router-dom';
import './detailProduct.css'
import Headers from '../../components/header/Header';
import products from '../../products.json';
import Product from '../../components/product/Product';
import { BsCart } from 'react-icons/bs';
import { CiCircleAlert } from 'react-icons/ci';
import { MdFavoriteBorder } from 'react-icons/md';
import { MdFavorite } from 'react-icons/md'


export default function DetailProduct({ cartList, handleAddToCart, handleLikedProduct, handleIsLiked }) {
  const {idProduct} = useParams()
  const thisProduct =  products.find(prod => prod.id === parseInt(idProduct))
  const listSize = [36, 37, 38, 39, 40, 41]
  const [selectedSize, setSelectedSize] = useState()
  const [isAdded, setIsAdded] = useState(false)
  const [alert, setAlert ] = useState("")

  const addToCart = (product, size) => {
    if(size !== undefined){
      handleAddToCart(product, size);
      setSelectedSize()
      setIsAdded(true)
    }else {
      setAlert("Please choose a size before add to cart")
    }
  }

  const unAdded = () => {
    setTimeout(() => {
      setIsAdded(false);
    }, 2500);
  }

  const unAlert = () => {
    setTimeout(() => {
      setAlert("");
    }, 3000);
  }

  return (
    <div>
      <Headers isSearchBar = 'true' cartList={cartList}/>
      <div className="detail__product">
          <div className="detail__product_img">
            <img src={`/static/${thisProduct.image}`} />
          </div>
          <div className="detail__product_info">
            <div className="detail__product_title"><p>{thisProduct.title}</p></div>
            <div className="detail__product_price"><p className="dp_IDR">IDR</p><p className="dp_number">{thisProduct.price.toLocaleString().toString().replace(/,/g, '.')}</p></div>
            <p className='detail__products_selectsize'>SELECT SIZE</p>
            <div className="detail__product_size_list">
              {listSize.map(size => (
                <div key={size} className={`detail__product_size ${selectedSize === size ? 'detail__product_size_selected'
                : ''}`} onClick={() => setSelectedSize(size)}>
                <p>{size}</p>
                </div>
              ))}
            </div>
            <div className='cart_liked'>
              <div className={`detail__product_cart ${isAdded ? 'detail__product_cart_clicked'
              : 'detail__product_cart_bg'}`} onClick={() => addToCart(thisProduct, selectedSize)}>
                {isAdded ? <p className='added'>Added</p>
                : <><BsCart className='dp_cart'/>
                <p className='addCart'>Add to Cart</p>
                </>
                }
                {unAdded()}
              </div>
              <span className='liked_symbol' onClick={() => handleLikedProduct(thisProduct)}>{handleIsLiked(thisProduct) ? <MdFavorite className='filled'/> : <MdFavoriteBorder/>}</span>

            </div>
            <div className="detail__product_productdetail"><p>PRODUCT DETAIL</p></div>
            <div className="detail__product_details">
              {thisProduct.description}
            </div>
          </div>
        </div>
        <div className="similar__product">
          <div className="similar_product_title"><p>Similar Products</p></div>
          <div className="similar__product_list">
            {products.slice(0,6).filter(product => product.id !== thisProduct.id && product.category === thisProduct.category).map((sp_product) => (
            <div className="product" key={sp_product.id}>
              <Product id={sp_product.id} image={sp_product.image} title={sp_product.title} price={sp_product.price} isLiked={handleIsLiked(sp_product)}></Product>
              </div>
            ))}
          </div>
        </div>
        {alert.length === 0 ? <></> 
        : <div className="alert">
            <div className="alert__line"></div>
            <div className="alert__message">
              <div className="alert__icon"><CiCircleAlert/></div>
              <div className="alert__text">Please choose a size before add to cart</div>
            </div>
          </div>
        }
        {unAlert()}
    </div>
  )
}
