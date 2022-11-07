import React, { useEffect, useState } from 'react'
import './listProduct.css'
import Headers from '../../components/header/Header';
import products from '../../products.json';
import Product from '../../components/product/Product';
import {useLocation} from 'react-router-dom';


export default function ListProduct({ cartList, handleIsLiked }) {
    const [listProduct, setListProduct] = useState(products);
    const [changeSearch, setChangeSearch] = useState("");
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [stateSearch,setStateSearch] = useState("");

    const location = useLocation();

    const listCategories = [
        {id: 12, name: 'Sneakers'}, 
        {id: 13, name: 'Slipper'}, 
        {id: 14, name: 'High Heels'}, 
        {id: 15, name: 'Flat Shoes'}
    ]

    let filteredProduct;

    useEffect(()=>{
        if(location.state?.inputSearch) {
            setStateSearch(String(location.state.inputSearch))
            location.state.inputSearch = undefined;
        }
        if (location.state?.categories__selectedCategory) {
            setSelectedCategory(String(location.state.categories__selectedCategory))
        }
    }, [location])

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
        filteredProduct = listProduct.filter((product) => {
            return product.title.toLowerCase().includes(stateSearch)});
    }
    else {
        if (selectedCategory === "All") {
            filteredProduct = listProduct.filter((product) => {
                return product.title.toLowerCase().includes(search)})
        }
        else{
            filteredProduct = listProduct.filter((product) => {
                return product.title.toLowerCase().includes(search)})
                .filter((product) => {
                    return product.category.includes(selectedCategory)
                });
        }
    }

    return (
        <div>   
            <Headers isSearchBar = 'true' action={handleChangeSearch} actionEnter={handleSearch} cartList={cartList}/>
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
                <Product key={product.id} id={product.id} image={product.image} title={product.title} price={product.price} isLiked={handleIsLiked(product)}></Product>
                ))}
            </div>
        </div>
    )
}
