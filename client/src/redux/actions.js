import axios from "axios"

import { GET_PRODUCTS, ADD_TO_CART, DELETE_FROM_CART, FILTER_BY_CATEGORY,
         FILTER_BY_PRICE, GET_PRODUCT_DETAIL,
         GET_USERS, CREATE_USER, GET_CATEGORIES, FILTER_BY_SUBCATEGORY} from "./actionTypes";

export function getProducts(){
  return async function(dispatch){
    try{
      const {data} = await axios.get("http://localhost:3001/products")
      return dispatch({
        type: GET_PRODUCTS,
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
      const {data} = await axios.get(`http://localhost:3001/products/details/${id}`)
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
      const {data} = await axios.get("http://localhost:3001/categories")
      return dispatch({
        type: GET_CATEGORIES,
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
      const {data} = await axios.get(`http://localhost:3001/categories?category=${category}`)
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
      const {data} = await axios.get("http://localhost:3001/users")
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
      const {data} = await axios.post("http://localhost:3001/users", user)
      return dispatch({
        type: CREATE_USER
      }) 
    } catch(e){
        throw Error
    }
  }
}


// export function getUsers(){  
//     return function(dispatch){ 
//         return fetch("http://localhost:3001/users")
//             .then(data => data.json())
//             .then( json =>{
//                 dispatch({ type:GET_USERS, payload: json })
//             })
//             .catch(error => console.log(error))
//     }
// }
 
