import React, { useState } from 'react';
import './landingPage.css'
import products from '../../products.json';
import Headers from '../../components/header/Header';
import Product from '../../components/product/Product';
import Contact from './Contact';
import sepatu from '../../assets/4 Sepatu Storek.png' ;
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';


export default function LandingPage({cartList, handleIsLiked}) {
    const [listProduct, setListProduct] = useState(products);
    const [categories__selectedCategory, setCategories__selectedCategory] = useState("All");
    const [inputSearch, setInputSearch] = useState("");
    const navigate = useNavigate();

    const listCategories = [
        {id: 12, name: 'Sneakers'}, 
        {id: 13, name: 'Slipper'}, 
        {id: 14, name: 'High Heels'}, 
        {id: 15, name: 'Flat Shoes'}
    ]

    const handleInputSearch = (e) => {
        e.preventDefault();
        setInputSearch(e.target.value);
    }
    
    const handleEnterSearch = (e) => {
        if (e.key === "Enter") {
            navigate("/shop", { state : {inputSearch}})
        }
    }

    const handleSeeMore = () => {
        navigate("/shop", { state : {categories__selectedCategory}})
    }

    let categories__filteredProduct;
    if (categories__selectedCategory === "All") {
        categories__filteredProduct = listProduct;
    }
    else{
        categories__filteredProduct = listProduct.filter((product) => {
            return product.category.includes(categories__selectedCategory)
        });
    }


    return (
        <>
            <Headers isSearchBar = 'false' cartList={cartList}/>
            {/* section homepage */}
            <section className="homepage">
                <div className="homepage__container_info">
                    <div className="homepage__title"><p>Lubna Store</p></div>
                    <div className="homepage__subtitle"><p>Enjoy your shopping time!</p></div>
                    <div className="homepage__search">
                        <AiOutlineSearch className='homepage__iconSearch'/>
                        <input type="text" placeholder='Search' onChange={handleInputSearch} onKeyDown={handleEnterSearch}/>
                    </div>
                </div>
                <div className="homepage__container_img">
                    <img src={sepatu} alt="sepatu" />
                </div>
            </section>
            {/* section categories */}
            <section className='categories'>
                <div className="categories__category_title">
                    <p className="categories__title">Categories</p>
                    <div className='categories__line'></div>
                    <p className='categories__subtitle'>Select Categories</p>
                </div>
                <div className="categories__category_list">
                    <div className={`categories__filter_button ${categories__selectedCategory === "All" ? 'listProduct__filter_button_selected'
                    : ''}`} onClick={() => setCategories__selectedCategory("All")}>
                        All
                    </div>
                {listCategories.map((category) => (
                    <div key={category.id} className={`categories__filter_button ${categories__selectedCategory === category.name ? 'listProduct__filter_button_selected'
                    : ''}`} onClick={() => setCategories__selectedCategory(category.name)}>
                        {category.name}
                    </div>
                ))}
                </div>
                <div className="categories__seeMore">
                    <a onClick={handleSeeMore}>See More</a>
                </div>
                <div className="categories__product_list">
                    {categories__filteredProduct.slice(0,8).map((product) => (
                    <Product key={product.id} id={product.id} image={product.image} title={product.title} price={product.price} isLiked={handleIsLiked(product)}></Product>
                    ))}
                </div>
            </section>
            {/* section new arrival */}
            <section className="newarrival">
                <div className="newarrival__na_title">
                    <p className="newarrival__title">Collection</p>
                    <div className='newarrival__line'></div>
                    <p className='newarrival__subtitle'>New Arrival</p>
                </div>
                <div className="newarrival__product_list">
                {listProduct.filter(product => product.isNewArrival).map((na_product) => (
                    <div key={na_product.id} className="newarrival__product">
                        <div className='newarrival__product_img'><img src={`static/${na_product.image}`}/></div>
                        <div className="newarrival__product_info">
                            <div className="newarrival__product_title"><p>{na_product.title}</p></div>
                            <div className="newarrival__product_price"> <p className='na__IDR'>IDR</p><p className='na__number'>{na_product.price.toLocaleString().toString().replace(/,/g, '.')}</p> </div>
                        </div>
                    </div>
                ))}
                </div>
            </section>
            <Contact/>
        </>
    )
}
