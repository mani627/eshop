// This is a simplified example focusing on structure and key components.
// A full implementation would require significantly more code, including API integration,
// robust error handling, and more detailed styling.

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
// import {
//   incrementItem,
//   decrementItem,
//   removeItem,
//   addItem,
//   createOrder,
// } from './cartSlice'; // Create this slice
// import {
//   getCategories,
//   createCategory,
//   updateCategory,
//   deleteCategory,
// } from './categorySlice'; // Create this slice
// import {
//   getProducts,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } from './productSlice'; // Create this slice
import './index.css'; // Import your Tailwind CSS
import { createCategory, deleteCategory, fetchCategories, selectAllCategories, toggleCategoryStatus, updateCategory } from './redux/categorySlice';
import { createProduct, deleteProduct, fetchProducts, selectAllProducts, toggleProductStatus, updateProduct } from './redux/productsSlice';
import { addToCart, clearCart, removeFromCart, selectCartItems, updateCartItemQuantity } from './redux/cartSlice';
import { placeOrder, selectAllOrders } from './redux/orderSlice';

const Header = () => {
  const cart = useSelector((state) => state.cart.items);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">My Shop</h1>
      <div className="flex items-center">
        <Link to="/cart" className="relative mr-4">
          <span className="material-symbols-outlined">shopping_cart</span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full px-1">
              {cartCount}
            </span>
          )}
        </Link>
        <Link to="/categories">
          <span className="material-symbols-outlined">settings</span>
        </Link>
      </div>
    </header>
  );
};

const HomePage = () => {
  const categories = useSelector((state) => state.categories.categories);
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link
            to={`/products/${category.id}`}
            key={category.id}
            className="border p-4 rounded"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

const ProductListing = () => {
  // Implement fetching products by category ID
  return <div>Product Listing</div>;
};

const ItemDescription = () => {
  return <div>Item Description</div>;
};

const CartPage = () => {
  return <div>Cart Page</div>;
};

const OrdersListing = () => {
  return <div>Orders Listing</div>;
};

const CategoryList = () => {
  return <div>Category List</div>;
};

const CreateCategory = () => {
  return <div>Create Category</div>;
};

const UpdateCategory = () => {
  return <div>Update Category</div>;
};

const ProductList = () => {
  return <div>Product List</div>;
};

const CreateProduct = () => {
  return <div>Create Product</div>;
};

const UpdateProduct = () => {
  return <div>Update Product</div>;
};

// const App = () => {



//   console.log("kmkmkm",categories)
//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Header />
//       {/* <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/products/:categoryId" element={<ProductListing />} />
//         <Route path="/product/:productId" element={<ItemDescription />} />
//         <Route path="/cart" element={<CartPage />} />
//         <Route path="/orders" element={<OrdersListing />} />
//         <Route path="/categories" element={<CategoryList />} />
//         <Route path="/categories/create" element={<CreateCategory />} />
//         <Route path="/categories/update/:id" element={<UpdateCategory />} />
//         <Route path="/products/list/:categoryId" element={<ProductList />} />
//         <Route path="/products/create/:categoryId" element={<CreateProduct />} />
//         <Route path="/products/update/:id" element={<UpdateProduct />} />
//       </Routes> */}
//     </div>
//   );
// };

const App = () => {
  const dispatch = useDispatch();
 // const navigate = useNavigate(); // For navigation
  const categories = useSelector(selectAllCategories);
  const products = useSelector(selectAllProducts);
  const cartItems = useSelector(selectCartItems);
  const orders = useSelector(selectAllOrders);


  useEffect(() => {
      dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryToggle = (categoryId) => {
      dispatch(toggleCategoryStatus(categoryId));
  };
  const handleCreateCategory = (categoryData) => {
      dispatch(createCategory(categoryData));
  };
  const handleUpdateCategory = (categoryData) => {
      dispatch(updateCategory(categoryData));
  };
  const handleDeleteCategory = (categoryId) => {
      dispatch(deleteCategory(categoryId));
  };

  useEffect(() => {
      // Example: Fetch products when a category is selected (you'll need to pass the categoryId)
      if (categories.length > 0) {
          dispatch(fetchProducts(categories[0].id)); // Fetch for the first category initially
      }
  }, [dispatch, categories]);


  const handleProductToggle = (productId) => {
      dispatch(toggleProductStatus(productId));
  };
  const handleCreateProduct = (productData) => {
      dispatch(createProduct(productData));
  };
  const handleUpdateProduct = (productData) => {
      dispatch(updateProduct(productData));
  };
  const handleDeleteProduct = (productId) => {
      dispatch(deleteProduct(productId));
  };

  const handleAddToCart = (product) => {
      dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (productId) => {
      dispatch(removeFromCart(productId));
  };

  const handleUpdateCartItemQuantity = (productId, quantity) => {
      dispatch(updateCartItemQuantity({ id: productId, quantity }));
  };

  const handlePlaceOrder = () => {
      dispatch(placeOrder(cartItems)).then(() => {
          dispatch(clearCart());
       //   navigate('/orders'); // Navigate after placing the order
      });
  };
console.log("kmk",products);

  // Example usage in JSX:
  return (
      <div>
          {/* Categories */}
          <h2>Categories</h2>
          {categories.map(category => (
              <div key={category.id}>
                  <p>{category.name}</p>
                  <button onClick={() => handleCategoryToggle(category.id)}>Toggle Status</button>
                  <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                  <button onClick={() => handleUpdateCategory(category)}>Update</button>
              </div>
          ))}
          <button onClick={() => handleCreateCategory({ name: 'New Cat', imageUrl: 'newurl' })}>Create Category</button>


          {/* Products */}
          <h2>Products</h2>
          {products.map(product => (
              <div key={product.id}>
                  <p>{product.name}</p>
                  <button onClick={() => handleProductToggle(product.id)}>Toggle Status</button>
                  <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                  <button onClick={() => handleUpdateProduct(product)}>Update</button>
                  <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
          ))}
          <button onClick={() => handleCreateProduct({ name: 'New Prod', description: 'desc', stock: 10, price: 20, imageUrl: 'purl', categoryId: 1 })}>Create Product</button>

          {/* Cart */}
          <h2>Cart</h2>
          {cartItems.map(item => (
              <div key={item.id}>
                  <p>{item.name} x {item.quantity}</p>
                  <button onClick={() => handleUpdateCartItemQuantity(item.id, item.quantity - 1)}>-</button>
                  <button onClick={() => handleUpdateCartItemQuantity(item.id, item.quantity + 1)}>+</button>
                  <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
              </div>
          ))}
          <button onClick={handlePlaceOrder}>Place Order</button>

          {/* Orders */}
          <h2>Orders</h2>
          {orders.map(order => (
              <div key={order.orderId}>
                  <p>Order ID: {order.orderId}</p>
                  <ul>
                      {order.items.map(item => (
                          <li key={item.id}>{item.name} x {item.quantity}</li>
                      ))}
                  </ul>
              </div>
          ))}
      </div>
  );
}

export default App;