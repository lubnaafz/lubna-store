import React, { useEffect, useState } from 'react'
import Headers from '../../components/header/Header'
import './cart.css'
import products from '../../products.json';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineMinus } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoIosAlert } from 'react-icons/io';
import { CiCircleAlert } from 'react-icons/ci';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { BsFillFileEarmarkCodeFill } from 'react-icons/bs'

export default function Cart({ cartList, handleChangeQuantity, removeProductCart, checkoutCart }) {
  const [isConfirmMessage, setIsConfirmMessage] = useState(false)
  const [removedProduct, setRemovedProduct] = useState();
  const [isCheckout, setIsCheckout] = useState(false)
  const [alertCart, setAlertCart ] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const checkout = cartList.reduce((total, cartItem) => total +=  cartItem.price, 0)

  const confirmRemoveProduct = (product) => {
    setRemovedProduct(product)
    setIsConfirmMessage(true)
  }

  const unConfirmRemoveProduct = () => {
    setRemovedProduct();
    setIsConfirmMessage(false);
  }

  const confirmCheckout = () => {
    if(cartList.length !== 0){
      setIsCheckout(true)
      setIsConfirmMessage(true)
    }else {
      setAlertCart("Please add product to your cart before checkout")
    }
      
  }

  const unConfirmCheckout = () => {
    setIsCheckout(false);
    setIsConfirmMessage(false)
  }

  const checkoutProduct = () => {
    checkoutCart()
    unConfirmCheckout()
    setIsSuccess(true)
    setAlertCart("Thankyou for your purchase!")
  }

  const removeProduct = (product) => {
    removeProductCart(product)
    unConfirmRemoveProduct()
  }

  const reduceQuantity = (product, quantityProduct) => {
    if(quantityProduct === 1) {
      confirmRemoveProduct(product)
    }else {
      handleChangeQuantity(product, -1)
    }
  }

  const unAlertCart = () => {
    setTimeout(() => {
      setAlertCart("");
      setIsSuccess(false)
    }, 3000);
  }


  return (
    <div className='cart'>
      <Headers isSearchBar = 'true' cartList={cartList}/>
      {cartList.length === 0 ? 
      <div className="cart__product_list_empty">
        <p className='empty_icon'><BsFillFileEarmarkCodeFill/></p>
        <p>Your cart is empty</p>
      </div>
      : 
      <div className="cart__product_list">
      {cartList.filter(cartItem => cartItem.quantityCart > 0).map((product) => (
        <div className="cart__product" key={product.id}>
          <div className="cp__remove" onClick={() => confirmRemoveProduct(product)}><RiDeleteBin6Line/></div>
          <div className="cp__image">
            <img src={`/static/${product.image}`} />
          </div>
          <div className="cp__info_mobile">
            <div className="cp__info">
              <div className="cp__info_title"><p>{product.title}</p></div>
              <div className="cp__info_size"><p>SIZE: {product.sizeCart}</p></div>
            </div>
            <div className="cp__amount">
              <div className="cp__amount_minus" onClick={() => reduceQuantity(product, product.quantityCart)}><AiOutlineMinus/></div>
              <div className="cp__amount_number"><p>{product.quantityCart}</p></div>
              <div className="cp__amount_plus" onClick={() => handleChangeQuantity(product, 1)}><AiOutlinePlus/></div>
            </div>  
            <div className="cp__price"><p className='cp_IDR'>IDR</p><p className='cp_number'>{product.price.toLocaleString().toString().replace(/,/g, '.')}</p></div>
          </div>
          <div className="cp__info_pc">
            <div className="cp__info">
              <div className="cp__info_title"><p>{product.title}</p></div>
              <div className="cp__info_size"><p>SIZE: {product.sizeCart}</p></div>
            </div>
            <div className="cp__amount">
              <div className="cp__amount_minus" onClick={() => reduceQuantity(product, product.quantityCart)}><AiOutlineMinus/></div>
              <div className="cp__amount_number"><p>{product.quantityCart}</p></div>
              <div className="cp__amount_plus" onClick={() => handleChangeQuantity(product, 1)}><AiOutlinePlus/></div>
            </div>  
            <div className="cp__price"><p className='cp_IDR'>IDR</p><p className='cp_number'>{product.price.toLocaleString().toString().replace(/,/g, '.')}</p></div>
          </div>
        </div>
      ))}
      </div>
      }
      <div className="cart__checkout_product">
        <div className="cart__subtotal">
          <div className="cart__subtotal_text"><p>Subtotal:</p></div>
          <div className="cart__subtotal_price"><p className='co_IDR'>IDR</p><p className='co_number'>{checkout.toLocaleString().toString().replace(/,/g, '.')}</p></div>
        </div>
        <div className="cart__checkout" onClick={() => confirmCheckout()}>
          <p>CHECKOUT</p>
        </div>
      </div>
      {!isConfirmMessage ? <></>
      : <>
      <div className="message_bg"></div>
        <div className="message">
          {isCheckout ? <>
            <div className="message__icon checkout"><IoIosAlert/></div>
            <div className="message__title">Are you sure?</div>
            <div className="message__text">Are you sure to checkout your product cart?</div>
            <div className="message__button">
              <div className="message__button_cancel" onClick={() => unConfirmCheckout()}>Cancel</div>
              <div className="message__button_yes checkout" onClick={() => checkoutProduct()}>Yes</div>
            </div>
            </>
          : <>
          <div className="message__icon"><IoIosAlert/></div>
          <div className="message__title">Are you sure?</div>
          <div className="message__text">Are you sure to delete this product from your cart?</div>
          <div className="message__button">
            <div className="message__button_cancel" onClick={() => unConfirmRemoveProduct()}>Cancel</div>
            <div className="message__button_yes" onClick={() => removeProduct(removedProduct)}>Yes</div>
          </div> 
          </>}
        </div>
        </>
      }
      {alertCart.length === 0 ? <></> 
        : <div className="alert">
          {isSuccess ? 
            <>
            <div className="alert__line checkout"></div>
            <div className="alert__message checkout">
              <div className="alert__icon"><IoCheckmarkCircleOutline/></div>
              <div className="alert__text">{alertCart}</div>
            </div>
            </>
          : <>
            <div className="alert__line"></div>
            <div className="alert__message">
              <div className="alert__icon"><CiCircleAlert/></div>
              <div className="alert__text">{alertCart}</div>
            </div>
            </>
          }
          </div>
        }
        {unAlertCart()}
    </div>
  )
}
