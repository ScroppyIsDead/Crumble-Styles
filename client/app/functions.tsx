export const getUserInfo = async (setUserinfo: any) => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:8000/api/userinfo", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    credentials: "include",
  });
  const data = await response.json();
  setUserinfo(data);
  console.log(data);
};

export const handleLoginChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setLoginData: any,
  loginData: any
) => {
  const { name, value } = e.target;
  setLoginData({ ...loginData, [name]: value });
};

export const handleRegisterChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setRegisterData: any,
  registerData: any
) => {
  const { name, value } = e.target;
  setRegisterData({ ...registerData, [name]: value });
};

export const loginForm = async (e: any, loginData: any) => {
  e.preventDefault();
  const response = await fetch("http://localhost:8000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
    credentials: "include",
  });
  const data = await response.json();
  localStorage.setItem("token", data.token);
};

export const registerForm = async (
  e: any,
  registerData: any,
  setisregisterok: any
) => {
  e.preventDefault();
  const response = await fetch("http://localhost:8000/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(registerData),
  });
  const data = await response.json();
  console.log(data);
  if (response.ok) {
    setisregisterok(1);
  } else {
    setisregisterok(2);
  }
};

export const editUserInfoForm = async (
  e: any,
  updateUserInfo: any,
  userinfo: any
) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  let sendData = { ...updateUserInfo };

  Object.keys(sendData).forEach((key) => {
    if (!sendData[key]) {
      sendData[key] = userinfo[key];
    }
  });
  const response = await fetch("http://localhost:8000/api/updateuserinfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(sendData),
  });
  const data = await response.json();
};

export const handleEditUserInfoChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setUpdateUserInfo: any,
  updateUserInfo: any
) => {
  const { name, value } = e.target;
  setUpdateUserInfo({ ...updateUserInfo, [name]: value });
};

export const handleResetPasswordChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setResetPassword: any,
  resetPassword: any
) => {
  const { name, value } = e.target;
  setResetPassword({ ...resetPassword, [name]: value });
};

export const resetPasswordForm = async (e: any, resetPassword: any) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  if (resetPassword.new_password !== resetPassword.com_password) {
    return;
  }
  const response = await fetch("http://localhost:8000/api/changepassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(resetPassword),
  });
  const data = await response.json();
};

export const logoutForm = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:8000/api/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    credentials: "include",
  });
  const data = await response.json();
  localStorage.removeItem("token");
};

export const get_products = async (setProductList: any) => {
  const response = await fetch("http://localhost:8000/shop/getallproducts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  setProductList(data);
};

export const addItemToCart = async (productID: any) => {
  const token = localStorage.getItem("token");
  const requestInfo = {
    product_id: productID,
    quantity: 1,
  };
  const response = await fetch("http://localhost:8000/shop/addcartitem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(requestInfo),
  });
  const data = await response.json();
};

export const removeItemFromCart = async (productID: any) => {
  const token = localStorage.getItem("token");
  const requestInfo = {
    product_id: productID,
    quantity: 1,
  };
  const response = await fetch("http://localhost:8000/shop/removefromcart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(requestInfo),
  });
  const data = await response;
};

export const removeItemFullyFromCart = async (productID: any) => {
  const token = localStorage.getItem("token");
  const requestInfo = {
    product_id: productID,
  };
  const response = await fetch(
    "http://localhost:8000/shop/removefullyfromcart",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(requestInfo),
    }
  );
  const data = await response;
};

export const addItemToFavorites = async (productID: any) => {
  const token = localStorage.getItem("token");
  const responseData = {
    product_id: productID,
  };
  const response = await fetch("http://localhost:8000/shop/addtofavorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(responseData),
  });
  const data = await response.json();
};

export const removeFromFavorites = async (productID: any) => {
  const token = localStorage.getItem("token");
  const responseData = {
    product_id: productID,
  };
  const response = await fetch(
    "http://localhost:8000/shop/removefromfavorites",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(responseData),
    }
  );
  const data = await response.json();
};

export const getCart = async (setCart: any) => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:8000/shop/getcart", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    credentials: "include",
  });
  const data = await response.json();
  console.log(data);
  setCart(data);
};

export const getCartCount = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:8000/shop/getcartquantity", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

export const get_favorites = async (setFavoriteList: any) => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:8000/shop/getfavorites", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    credentials: "include",
  });
  const data = await response.json();
  setFavoriteList(data);
};

export const create_order = async (paymentid: any) => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:8000/shop/create_order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(paymentid),
    credentials: "include",
  });
  const data = await response.json();
  console.log(data);
  return data.order;
};

export const addPhone = async (phone: number) => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:8000/shop/getfavorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(phone),
  });
  const data = await response.json();
};

export const getSaleProduct = async (setSaleProductsList: any) => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:8000/shop/getsaleitem", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    credentials: "include",
  });
  const data = await response.json();
  setSaleProductsList(data);
};

export const getIsloggedin = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:8000/api/islogedin", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    credentials: "include",
  });
  const data = await response.json();
  console.log(data);
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};

export const getproduct = async (productid: Number) => {
  const response = await fetch(
    `http://localhost:8000/shop/getproduct?productid=${productid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
};

export const sendMail = async (e, email: String) => {
  e.preventDefault();
  const response = await fetch(
    `http://localhost:8000/api/sendmail?email=${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
};

export const getUserOrders = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:8000/shop/getuserorders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    credentials: "include",
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export const getOrder = async (orderNumber: Number) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `http://localhost:8000/shop/getorder/${orderNumber}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
};
