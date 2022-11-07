import Cart from "./pages/cart/Cart";
import DetailProduct from "./pages/detailProduct/DetailProduct";
import LandingPage from "./pages/landingPage/LandingPage";
import Liked from "./pages/liked/Liked";
import products from './products.json';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ListProduct from "./pages/listProduct/ListProduct";
import { useEffect, useState } from "react";
import { BiZoomIn } from "react-icons/bi";
import Contact from "./pages/landingPage/Contact";


function App() {
  const [cartList, setCartList] = useState(JSON.parse(localStorage.getItem("cartList")) || [] );
  const [likedList, setLikedList] = useState(JSON.parse(localStorage.getItem("likedList")) || [] );

  useEffect(() => {
      localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList])

  useEffect(() => {
    localStorage.setItem("likedList", JSON.stringify(likedList));
}, [likedList])

  const checkoutCart = () => {
    setCartList([])
  }

  const removeProductCart = (product) => {
    setCartList(cartList => cartList.filter(cartItem => cartItem.id !== product.id))
  }

  const handleChangeQuantity = (product, n) => {
    setCartList(cartList => 
      cartList.map((item) => item.id === product.id && item.sizeCart === product.sizeCart
        ? { ...item, quantityCart: item.quantityCart + n} : item
    ))
    setCartList(cartList => cartList.filter(cartItem => cartItem.quantityCart > 0));
    handleChangePrice(product);
  }

  const handleChangePrice = (product) => {
    const targetProduct = products.find(x => x.id === product.id)
    setCartList(cartList => 
    cartList.map((item) => item.id === product.id && item.sizeCart === product.sizeCart
      ? { ...item, price:  item.quantityCart * targetProduct.price} : item
    ))
  }

  const handleAddToCart = (product, size) => {
    const targetProductId = cartList.findIndex((productItem) => productItem.id === product.id && productItem.sizeCart === size)

    if(targetProductId >= 0) {
      setCartList(cartList => 
          cartList.map((cartItem) => cartList.indexOf(cartItem) === targetProductId 
            ? { ...cartItem, quantityCart: cartItem.quantityCart + 1, sizeCart:size} : cartItem
          ))
    }else {
      setCartList(cartList => [...cartList, {...product, quantityCart: 1, sizeCart:size}])
    }
    handleChangePrice(product); 
  }

  const handleLikedProduct = (product) => {
    const targetProductId = likedList.findIndex((productItem) => productItem.id === product.id)
    if(targetProductId >= 0) {
      setLikedList(likedList => likedList.filter(likedItem => likedItem.id !== product.id))
    }else {
      setLikedList(likedList => [...likedList, {...product, isLiked: true}])
    } 
  }

  const handleIsLiked = (product) => {
    const targetProductId = likedList.findIndex((productItem) => productItem.id === product.id)
    if(targetProductId >= 0)
    {return true}
    else return false
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage
            cartList={cartList}
            handleIsLiked={handleIsLiked}
          />}/>
          {/* <Route path="#contact" element={<Contact/>}/> */}
          <Route path="/shop" element={<ListProduct
            cartList={cartList}
            handleIsLiked={handleIsLiked}
          />}/>
          <Route path="/product/:idProduct" element={<DetailProduct
            cartList={cartList}
            handleAddToCart={handleAddToCart}
            handleLikedProduct={handleLikedProduct}
            handleIsLiked={handleIsLiked}
          />}/>
          <Route path="/cart" element={<Cart
            cartList={cartList}
            setCartList={setCartList}
            handleChangeQuantity={handleChangeQuantity}
            removeProductCart = {removeProductCart}
            checkoutCart={checkoutCart}
            />}/>
          <Route path="/favorites" element={<Liked
            likedList={likedList}
            cartList={cartList}
            handleIsLiked={handleIsLiked}
            />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
