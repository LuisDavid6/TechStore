import axios from "axios"

import { GET_PRODUCTS, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT,
         SEARCH_PRODUCTS, GET_PRODUCT_DETAIL, GET_PRODUCTS_BY_PAGE,
         ADD_TO_CART, REMOVE_FROM_CART, 
         FILTER_CATEGORY_BY_PAGE, FILTER_BY_CATEGORY, FILTER_BY_SUBCATEGORY,
         FILTER_BY_PRICE, 
         GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER,
         VERIFY_ROLE, GET_SALES_ADMIN, GET_SALES_BY_WEEK, 
         GET_SALES_SHIPMENT, SET_SHIPMENT_STATUS,
         GET_CATEGORIES, ADD_CATEGORY, ADD_SUBCATEGORY } from "./actionTypes";

export function getProducts(){
  return async function(dispatch){
    try{
      const {data} = await axios.get("/products")
      return dispatch({
        type: GET_PRODUCTS,
        payload: data
      })
    }catch(e){
      throw Error
    }
  }
}

export function getProductsByPage(page, offer){
  return async function(dispatch){
    try{
      if(offer) {
        const {data} = await axios.get(`/products/pages/${page}?offer=true`)
        return dispatch({
          type: GET_PRODUCTS_BY_PAGE,
          payload: data
        })
      }
      
      const {data} = await axios.get("/products/pages/"+page)
      return dispatch({
        type: GET_PRODUCTS_BY_PAGE,
        payload: data
      })
    }catch(e){
      throw Error
    }
  }
}

export function createProduct(product){
  return async function(dispatch){
    try {
      const {data} = await axios.post("/products", product)
      return dispatch({
        type: CREATE_PRODUCT
      }) 
    } catch(e){
        throw Error
    }
  }
}

export function updateProduct(product,id){
  return async function(dispatch){
    try {
      const {data} = await axios.put(`/products/update/${id}`, product)
      return dispatch({
        type: UPDATE_PRODUCT
      }) 
    } catch(e){
        throw Error
    }
  }
}

export function deleteProduct(id){
  return async function(dispatch){
    try {
      const {data} = await axios.delete(`/products/delete/${id}`)
      return dispatch({
        type: DELETE_PRODUCT,
        payload: data
      })
    }catch (error) {
      throw Error
    }
  }  
}

export function searchProducts(text){
  return async function(dispatch){
    try{
      const {data} = await axios.get(`/products/search?query=${text}`)
      return dispatch({
        type: SEARCH_PRODUCTS,
        payload: data
      })
    }catch(e){
      throw Error
    }
  }
}

export function getProductDetail(id){
  return async function(dispatch){
    try {
      const {data} = await axios.get(`/products/details/${id}`)
      return dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: data
      })
    }catch (error) {
      throw Error
    }
  }  
}

export function addToCart(ids){
  return async function(dispatch){
    try{
      const {userId, productId} = ids
      const {data} = await axios.put(`/cart/addToCart/${userId}`, {productId})
      return dispatch({
        type: ADD_TO_CART
      })
    }catch(e){
      // throw Error
    }
  }
}

export function removeFromCart(ids){
  return async function(dispatch){
    try{
      const {userId, productId} = ids
      const {data} = await axios.put(`/cart/removeToCart/${userId}`, {productId})
      return dispatch({
        type: REMOVE_FROM_CART
      })
    }catch(e){
      // throw Error
    }
  }
}

export function getCategories(){
  return async function(dispatch){
    try {
      const {data} = await axios.get("/categories")
      return dispatch({
        type: GET_CATEGORIES,
        payload: data
      }) 
    } catch(e){
      throw Error
    }
  }
}

export function addCategory(category){
  return async function(dispatch){
    try {
      const {data} = await axios.post("/categories", category)
      return dispatch({
        type: ADD_CATEGORY,
        payload: data
      }) 
    } catch(e){
      throw Error
    }
  }
}

export function addSubCategory(subcategory){
  return async function(dispatch){
    try {
      const {categoryId} = subcategory
      const {data} = await axios.post(`/categories/subcategory/${categoryId}`, subcategory)
      return dispatch({
        type: ADD_SUBCATEGORY,
        payload: data
      }) 
    } catch(e){
      throw Error
    }
  }
}

export function filterCategoryByPage(page, category){
  return async function(dispatch){
    try {
      const {data} = await axios.get(`/categories/pages/${page}?category=${category}`)
      return dispatch({
        type: FILTER_CATEGORY_BY_PAGE,
        payload: data
      })
    }catch (error) {
      throw Error
    }
  }  
}

export function filterByCategory(category){
  return async function(dispatch){
    try {
      const {data} = await axios.get(`/categories?category=${category}`)
      return dispatch({
        type: FILTER_BY_CATEGORY,
        payload: data
      })
    }catch (error) {
      throw Error
    }
  }  
}

export function filterBySubcategory(category, action){
    return {
      type: FILTER_BY_SUBCATEGORY,
      payload: [category,action]
    }
}

export function filterByPrice(order){
  return{
    type: FILTER_BY_PRICE, payload: order
  }
}

export function getUsers(){
  return async function(dispatch){
    try{
      const {data} = await axios.get("/users")
      return dispatch({
        type: GET_USERS,
        payload: data
      })
    }catch(e){
      throw Error
    }
  }
}

export function createUser(user){
  return async function(dispatch){
    try {
      const {data} = await axios.post("/users", user)
      return dispatch({
        type: CREATE_USER
      }) 
    } catch(e){
        throw Error
    }
  }
}

export function updateUser(user,id){
  return async function(dispatch){
    try {
      const {data} = await axios.put(`/users/update/${id}`, user)
      return dispatch({
        type: UPDATE_USER
      }) 
    } catch(e){
        throw Error
    }
  }
}

export function deleteUser(userId){
  return async function(dispatch){
    try {
      const {data} = await axios.delete(`/users/delete/${userId}`,{
          headers : {
            Authorization : `Bearer ${window.localStorage.getItem("token")}`
          }
      })
      return dispatch({
        type: DELETE_USER
      }) 
    } catch(e){
        throw Error
    }
  }
}

export function login(user){
  return async function(dispatch){
    try {
      const {data} = await axios.post("/users/login", user)
      if(data.token) window.localStorage.setItem("token", data.token)
      return data
    } catch (e) {
      throw Error
    }
  }
}

export function logout(){
  return async function(){
    window.localStorage.removeItem("token")
  }
}

export function verifyRole(){
  return async function(dispatch){
    try {
      const {data} = await axios.get("/users/verifyRole",{
        headers : {
          Authorization : `Bearer ${window.localStorage.getItem("token")}`
        }
      })
      return dispatch({
        type: VERIFY_ROLE,
        payload: data
      })
    } catch (e) {
      // throw Error
    }
  }
}

export function payOut(paymentId){
  return async function(dispatch){
    try {
      const {data} = await axios.post("/sales/payOut",{paymentId},{
        headers : {
          Authorization : `Bearer ${window.localStorage.getItem("token")}`
        }
      })

      return data
      
    } catch (e) {
      // throw Error
    }
  }
}

export function getSalesAdmin(date){
  return async function(dispatch){
    try {
      const {data} = await axios.get(`/sales/salesManagement?date=${date}`)
      return dispatch({
        type: GET_SALES_ADMIN,
        payload: data
      }) 
    } catch(e){
        throw Error
    }
  }
}

export function getSalesByWeek(){
  return async function(dispatch){
    try {
      const {data} = await axios.get("/sales/salesByWeek")
      return dispatch({
        type: GET_SALES_BY_WEEK,
        payload: data
      }) 
    } catch(e){
        throw Error
    }
  }
}

export function getSalesShipment(status){
  return async function(dispatch){
    try {
      const {data} = await axios.get(status ?`/sales/shipment?status=${status}` : "/sales/shipment")
      return dispatch({
        type: GET_SALES_SHIPMENT,
        payload: data
      }) 
    } catch(e){
        throw Error
    }
  }
}

export function setShipmentStatus(info){
  return async function(dispatch){
    try {
      const {data} = await axios.put("sales/shipment/changeStatus", info)
      return dispatch({
        type: SET_SHIPMENT_STATUS
      }) 
    } catch(e){
        throw Error
    }
  }
}


// export function getUsers(){  
//     return function(dispatch){ 
//         return fetch("/users")
//             .then(data => data.json())
//             .then( json =>{
//                 dispatch({ type:GET_USERS, payload: json })
//             })
//             .catch(error => console.log(error))
//     }
// }
 
