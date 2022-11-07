import React, { useEffect, useState } from 'react'
import './liked.css'
import Headers from '../../components/header/Header';
import Product from '../../components/product/Product';
import { BsFillFileEarmarkCodeFill } from 'react-icons/bs'

export default function Liked({ likedList, cartList }) {
    const [changeSearch, setChangeSearch] = useState("");
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [stateSearch,setStateSearch] = useState("");

    const listCategories = [
        {id: 12, name: 'Sneakers'}, 
        {id: 13, name: 'Slipper'}, 
        {id: 14, name: 'High Heels'}, 
        {id: 15, name: 'Flat Shoes'}
    ]

    let filteredProduct;

    const handleChangeSearch = (e) => {
        e.preventDefault();
        setChangeSearch(e.target.value)
    }
    
    const handleSearch = (e) => {
        if (e.key === "Enter") {
            setStateSearch("")
            setSearch(changeSearch);
            
        }
    }

    const setCategory = (ct) => {
        setStateSearch("")
        setSelectedCategory(ct);
    }

    if (stateSearch) {
        filteredProduct = likedList.filter((product) => {
            return product.title.toLowerCase().includes(stateSearch)});
    }
    else {
        if (selectedCategory === "All") {
            filteredProduct = likedList.filter((product) => {
                return product.title.toLowerCase().includes(search)})
        }
        else{
            filteredProduct = likedList.filter((product) => {
                return product.title.toLowerCase().includes(search)})
                .filter((product) => {
                    return product.category.includes(selectedCategory)
                });
        }
    }

    return (
        <div>   
            <Headers isSearchBar = 'true' action={handleChangeSearch} actionEnter={handleSearch} cartList={cartList}/>
            {likedList.length === 0 ? 
            <div className="cart__product_list_empty">
                <p className='empty_icon'><BsFillFileEarmarkCodeFill/></p>
                <p>Looks like there are no favorites product here</p>
            </div>
            : <>
            <div className="favorites_text">My Favorites</div>
            <div className="listProduct__list_categories">
                <div className={`listProduct__filter_button ${selectedCategory === "All" ? 'listProduct__filter_button_selected'
                : ''}`} onClick={() => setCategory("All")}>
                    All
                </div>
            {listCategories.map((category) => (
                <div key={category.id} className={`listProduct__filter_button ${selectedCategory === category.name ? 'listProduct__filter_button_selected'
                : ''}`} onClick={() => setCategory(category.name)}>
                    {category.name}
                </div>
            ))}
            </div>
            <div className="listProduct__product_list">
                {filteredProduct.map((product) => (
                <Product key={product.id} id={product.id} image={product.image} title={product.title} price={product.price} isLiked={true}></Product>
                ))}
            </div>
            </>
            }
        </div>
    )
}
