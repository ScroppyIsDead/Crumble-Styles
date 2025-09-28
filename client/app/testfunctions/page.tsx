"use client";
import React, { useEffect, useState } from "react";
import Logo from "../../public/Logo.png";
import Image from "next/image";
import {
  getUserInfo,
  handleLoginChange,
  handleRegisterChange,
  loginForm,
  registerForm,
  editUserInfoForm,
  handleEditUserInfoChange,
  handleResetPasswordChange,
  resetPasswordForm,
  logoutForm,
  getCart,
  addItemToCart,
  get_products,
  get_favorites,
  addItemToFavorites,
  removeFromFavorites,
  removeItemFromCart,
} from "../functions";

const Page = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [userinfo, setUserinfo] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
  });
  const [updateUserInfo, setUpdateUserInfo] = useState({
    email: userinfo.email,
    first_name: userinfo.first_name,
    last_name: userinfo.last_name,
  });
  const [resetPassword, setResetPassword] = useState({
    password: "",
    new_password: "",
    com_password: "",
  });
  const [cartItems, setCartItems] = useState([]);
  const [productList, setProductList] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    getCart(setCartItems);
    get_products(setProductList);
    get_favorites(setFavoriteList);
  }, []);

  return (
    <div>
      <form
        className="border-2 border-black flex-col flex justify-center h-fit p-6 "
        onSubmit={(e) => loginForm(e, loginData)}
      >
        <p className="font-bold px-4">Login</p>
        <input
          type="text"
          name="username"
          value={loginData.username}
          onChange={(e) => handleLoginChange(e, setLoginData, loginData)}
          placeholder="Enter Username"
        />
        <input
          type="text"
          name="password"
          value={loginData.password}
          onChange={(e) => handleLoginChange(e, setLoginData, loginData)}
          placeholder="Enter Password"
        />
        <button type="submit">SUBMIT LOGIN</button>
      </form>
      <form
        className="border-2 border-black flex flex-col justify-center h-fit p-6 "
        onSubmit={(e) => registerForm(e, registerData)}
      >
        <p className="font-bold px-4">Register</p>
        <input
          type="text"
          name="username"
          value={registerData.username}
          onChange={(e) =>
            handleRegisterChange(e, setRegisterData, registerData)
          }
          placeholder="Enter Username"
        />
        <input
          type="text"
          name="password"
          value={registerData.password}
          onChange={(e) =>
            handleRegisterChange(e, setRegisterData, registerData)
          }
          placeholder="Enter Password"
        />
        <input
          type="text"
          name="email"
          value={registerData.email}
          onChange={(e) =>
            handleRegisterChange(e, setRegisterData, registerData)
          }
          placeholder="Enter Email"
        />
        <button type="submit">SUBMIT register</button>
      </form>
      <div className="border-2 border-black flex-col flex justify-center h-fit p-6  ">
        <p className="font-bold px-4">User info</p>
        <p className="text-5xl">username: {userinfo.username}</p>
        <p>email: {userinfo.email}</p>
        <p>First Name: {userinfo.first_name}</p>
        <p>Last Name: {userinfo.last_name}</p>
        <button className="border-2" onClick={() => getUserInfo(setUserinfo)}>
          click me for username
        </button>
      </div>

      <Image className="w-14" alt="website's logo" src={Logo} />
      <div className="border-2 border-black flex-col flex justify-center h-fit p-6 ">
        <p>edit account details</p>
        <form onSubmit={(e) => editUserInfoForm(e, updateUserInfo, userinfo)}>
          <input
            type="text"
            name="email"
            value={updateUserInfo.email}
            onChange={(e) =>
              handleEditUserInfoChange(e, setUpdateUserInfo, updateUserInfo)
            }
            placeholder="Enter Email"
          />
          <input
            type="text"
            name="first_name"
            value={updateUserInfo.first_name}
            onChange={(e) =>
              handleEditUserInfoChange(e, setUpdateUserInfo, updateUserInfo)
            }
            placeholder="Enter First Name"
          />
          <input
            type="text"
            name="last_name"
            value={updateUserInfo.last_name}
            onChange={(e) =>
              handleEditUserInfoChange(e, setUpdateUserInfo, updateUserInfo)
            }
            placeholder="Enter Last Name"
          />
          <button type="submit">Click to save</button>
        </form>
      </div>
      <form
        className="border-2 border-black flex-col flex justify-center h-fit p-6 "
        onSubmit={(e) => resetPasswordForm(e, resetPassword)}
      >
        <p className="font-bold px-6">Change password</p>
        <input
          type="text"
          name="password"
          value={resetPassword.password}
          onChange={(e) =>
            handleResetPasswordChange(e, setResetPassword, resetPassword)
          }
          placeholder="Enter Current Password"
        />
        <input
          type="text"
          name="new_password"
          value={resetPassword.new_password}
          onChange={(e) =>
            handleResetPasswordChange(e, setResetPassword, resetPassword)
          }
          placeholder="Enter New Password"
        />
        <input
          type="text"
          name="com_password"
          value={resetPassword.com_password}
          onChange={(e) =>
            handleResetPasswordChange(e, setResetPassword, resetPassword)
          }
          placeholder="Confirm New Password"
        />
        <button type="submit">CLCICK TO CHANGER PASSWORD</button>
      </form>
      <button className="border-2 border-black" onClick={() => logoutForm()}>
        Click to logout
      </button>
      <div className="flex flex-col w-full border-2">
        <p className="self-center text-3xl font-bold">CART:</p>
        <div>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((items) => (
              <li key={items.id}>
                <p>
                  {items.product.title} x{items.quantity} $
                  {items.quantity * items.product.price}
                  <button
                    className="bg-red-500"
                    onClick={() => removeItemFromCart(items.product.id)}
                  >
                    remove 1x from cart
                  </button>
                  <img
                    className="w-48 "
                    src={`http://localhost:8000${items.product.image}`}
                    alt={items.product.title}
                  />
                </p>
              </li>
            ))
          ) : (
            <p>log in to see items in cart</p>
          )}
        </div>
      </div>
      <div>
        all products:
        {productList.map((product) => (
          <div key={product.id}>
            <div className="">
              <img
                className="w-48"
                src={`http://localhost:8000${product.image}`}
                alt={product.title}
              />
            </div>
            <div>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <div>
                <p>${product.price}</p>
                <button
                  className="bg-blue-500"
                  onClick={() => addItemToCart(product.id)}
                >
                  Add to Cart
                </button>
                <button
                  className="bg-red-500"
                  onClick={() => addItemToFavorites(product.id)}
                >
                  add to favorite
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        Favorites:
        {favoriteList && favoriteList.length > 0
          ? favoriteList.map((item) => (
              <li key={item.id}>
                {item.title}
                <button
                  onClick={() => removeFromFavorites(item.id)}
                  className="bg-red-500"
                >
                  Click to remove from favorites
                </button>
              </li>
            ))
          : null}
      </div>
      <div>
        checkout:
        <div>
          <a href="/checkout">click to go to checkout</a>
        </div>
      </div>
    </div>
  );
};

export default Page;
