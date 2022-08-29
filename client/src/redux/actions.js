import axios from "axios"

import { GET_PRODUCTS, DELETE_PRODUCT, ADD_TO_CART, DELETE_FROM_CART, FILTER_BY_CATEGORY,
         FILTER_BY_PRICE, GET_PRODUCT_DETAIL,
         GET_USERS, CREATE_USER, VERIFY_ROLE, GET_CATEGORIES, ADD_CATEGORY, ADD_SUBCATEGORY,
         FILTER_BY_SUBCATEGORY,
         CREATE_PRODUCT} from "./actionTypes";

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

export function addToCart(product){
  return{
    type: ADD_TO_CART, payload: product
  }
}

export function deleteFromCart(id){
  return{
    type: DELETE_FROM_CART, payload: id
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
 
