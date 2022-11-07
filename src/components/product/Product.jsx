import React from 'react'
import './product.css';
import {Link} from "react-router-dom";
import { MdFavorite } from 'react-icons/md'

export default function Product(props) {
    const path = "/static/"+props.image;
  return (
    <>
        <Link style={{textDecoration: 'none'}} to={`/product/${props.id}`}>
        <div className="list_product">
            <div className='product_liked_symbol'>{props.isLiked === true? <MdFavorite className='filled'/> : <></>}</div>
            <div className='product_img'><img src={path}/></div>
            <div className="product_info">
                <div className="product_title"><p>{props.title}</p></div>
                <div className="product_price"> <p className='IDR'>IDR</p><p className='number'>{props.price.toLocaleString().toString().replace(/,/g, '.')}</p> </div>
            </div>            
        </div>
        </Link>
    </>
  )
}
