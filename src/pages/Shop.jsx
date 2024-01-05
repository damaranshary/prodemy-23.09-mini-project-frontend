

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, addToCart, removeFromCart, confirmWishlist } from '../pages/reducer';

function Shop() {
    const dispatch = useDispatch();
    const total = useSelector(state => state.total);
  
    useEffect(() => {
      axios.get('http://localhost:3005/product')
        .then(response => {
          dispatch(setProducts(response.data));
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
        });
    }, [dispatch]);
  
    const products = useSelector(state => state.products);
    const cart = useSelector(state => state.cart);
    const wishlistConfirmed = useSelector(state => state.wishlistConfirmed);
  
    const handleAddToCart = item => {
      dispatch(addToCart(item));
    };
  
    const handleConfirmWishlist = () => {
      dispatch(confirmWishlist());
    };
    const handleDeleteProduct = id => {
      // axios.delete(`http://localhost:8000/products/${id}`)
      // axios.delete(`http://localhost:3005/product/${id}`)
      axios.delete(`http://localhost:3005/product/${id}`)
        .then(response => {
          dispatch(removeFromCart(id));
        })
        .catch(error => {
          console.error('Error deleting product: ', error);
        });
    };

    const [selectedCategory, setSelectedcategory]=useState('All');
    const handleCategoryClick =(category)=>{
      setSelectedcategory(category);
    };

    const filteredProducts =selectedCategory === 'All'
    ?products
    :products.filter(product => product.type === selectedCategory)
    

    

  
    return (
      <div className='flex flex-row'>
        <div className='w-2/3 pr-4'>
          <h2 className="text-2xl font-bold mb-4">Products</h2>
          <div className="grid grid-cols-3 gap-4 ">
            {filteredProducts.map((product) => (
              <div key={product.id} className="border p-4 rounded-xl">
               <img src={product.image} alt={product.image} className="w-full h-64 object-cover mb-4 rounded-md" />
                <h3 className="font-bold mb-2 justify-center text-2xl ">{product.name}</h3>
                <p className='mb-2 font-bold'>Price:${product.price}</p>
                <button onClick={() => handleAddToCart(product)} className="bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
              </div>
            ))}
          </div>
          <div className='flex flex-col justify-center items-center bg-grey-200'>
            <h1 className='font-bold mt-10 mb-5 text-3xl'>Categories</h1>
            <div className='flex flex-row mb-10 '>
              <button onClick={()=> handleCategoryClick ('All')} className='bg-yellow-400 text-white px-8 py-4 mr-4 ml-4 rounded-md'>Semua</button>
              <button onClick={()=> handleCategoryClick ('Food')} className='bg-yellow-400 text-white px-8 py-4 mr-4 ml-4 rounded-md'>Makanan</button>
              <button onClick={()=> handleCategoryClick ('Drink')} className='bg-blue-500 text-white px-8 py-4 mr-4 ml-4 rounded-md'>Minuman</button>
              <button onClick={()=> handleCategoryClick('Snack')} className='bg-blue-500 text-white px-8 py-4 mr-4 ml-4 rounded-md'>Snack</button>
            </div>
          </div>
        </div>

        <div className="w-1/3 pl-4 bg-grey-100">
          <h2 className="text-2xl font-bold my-4">Shopping Cart</h2>
          {/* <ul>
            {cart.map((item, index) => (
            <li key={index} className="border p-4 rounded mb-2">{item.name} <button onClick={() => handleDeleteProduct(item.id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button></li>
             ))}
          </ul> */}
          <ul>
          {products.map((product) => {
            const quantity = cart.filter(item => item.id === product.id).length;
            if (quantity > 0) {
              return (
                <li key={product.id} className="border p-4 rounded mb-2">
                  {product.name} x{quantity}
                  <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-500 text-white px-4 py-2 ml-5 rounded">Delete</button>
                </li>
              );
            }
            return null;
          })}
        </ul>
          <p className='mb-2 font-bold'>Total :${total}</p>
            {/* <button onClick={() => handleDeleteProduct(product.item)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button> */}
            <button onClick={handleConfirmWishlist} className="bg-green-500 text-white px-4 py-2 rounded mt-4">Confirm Buy</button>
          {wishlistConfirmed && (
          <div>
            <h2 className="text-2xl font-bold my-4">Confirmed Wishlist</h2>
            {/* <ul>
              {cart.map((item, index) => (
            <li key={index} className="border p-4 rounded mb-2">{item.name}</li>
            ))}
           </ul> */}
           <ul>
          {products.map((product) => {
            const quantity = cart.filter(item => item.id === product.id).length;
            if (quantity > 0) {
              return (
                <li key={product.id} className="border p-4 rounded mb-2">
                  {product.name} x{quantity}
                </li>
              );
            }
            return null;
          })}
        </ul>
           <h2 className="text-2xl font-bold my-4">Total Price: ${total}</h2>
           </div>
           )}
           </div>
           
      </div>
    );
  }

export default Shop;

