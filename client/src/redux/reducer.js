import { GET_PRODUCTS, CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT,
         SEARCH_PRODUCTS, GET_PRODUCT_DETAIL, GET_PRODUCTS_BY_PAGE,
         ADD_TO_CART, REMOVE_FROM_CART, 
         FILTER_CATEGORY_BY_PAGE, FILTER_BY_CATEGORY, FILTER_BY_SUBCATEGORY, 
         FILTER_BY_PRICE, 
         GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER,
         VERIFY_ROLE, GET_SALES_ADMIN, GET_SALES_SHIPMENT, SET_SHIPMENT_STATUS,
         GET_CATEGORIES, ADD_CATEGORY, ADD_SUBCATEGORY } from "./actionTypes";

const initialState = {
    products: [],
    productsByPage: {},
    categories: [],
    productsFilter:[],
    refresh: false,
    productDetail:{},
    users: [],
    categorySelect: {},
    categoryProductsByPage: {},
    currentUser: {},
    role: "",
    salesAdmin: [],
    salesShipment: []
}

export default function Reducer(state = initialState, action){
    
    switch(action.type){
        case GET_PRODUCTS:
            return{
                ...state,
                products: action.payload,
                productsFilter: action.payload
            }
        
        case GET_PRODUCTS_BY_PAGE:
            return{
                ...state,
                productsByPage: action.payload,
            }

        case CREATE_PRODUCT:
            return{
                ...state,
                refresh: !state.refresh
            }
        
        case DELETE_PRODUCT:
            const prod = {}
            prod.cant = state.categoryProductsByPage-1
            prod.products = state.categoryProductsByPage.products.filter(e=> e.id !== action.payload.id)
            return{
                ...state,
                categoryProductsByPage: prod,
                refresh: !state.refresh
            }

        case UPDATE_PRODUCT:{
            return{
                ...state,
                refresh: !state.refresh
            }
        }

        case SEARCH_PRODUCTS:{
            let products = action.payload
            if(products.length===0) products = ["notFound"]
            return{
                ...state,
                productsFilter: products,
                refresh: !state.refresh
            }
        }

        case ADD_TO_CART:
            return{
                ...state,
                refresh: !state.refresh
            }

        case REMOVE_FROM_CART:
            return{
                ...state,
                refresh: !state.refresh
            }

        case FILTER_CATEGORY_BY_PAGE:
            return{
                ...state,
                categoryProductsByPage: action.payload,
                refresh: !state.refresh
            }

        case FILTER_BY_CATEGORY:
            return{
                ...state,
                productsFilter: action.payload.products,
                categorySelect: action.payload,
                refresh: !state.refresh
            }

        case FILTER_BY_SUBCATEGORY:
            let filter = []
            if(action.payload[1]) {
                if(state.categorySelect.products.length === state.productsFilter.length){
                    filter = state.categorySelect.products.filter(e=> e.type === action.payload[0])

                }else filter = state.productsFilter.concat(state.categorySelect.products.filter(e=> e.type === action.payload[0]))

            }else filter = state.productsFilter.filter(e => e.type!== action.payload[0])

            if(filter.length === 0) filter = state.categorySelect.products

            return{
                ...state,
                productsFilter: filter,
                refresh: !state.refresh
            }

        case FILTER_BY_PRICE:
            let products = []
            if(action.payload === "asc") {
                products = state.productsFilter.sort(function(a,b){
                    if(a.totalPrice > b.totalPrice) return 1
                    else return -1   
                })}
                
            else if(action.payload === "desc") {
                products = state.productsFilter.sort(function(a,b){
                    if(a.totalPrice < b.totalPrice) return 1
                    else return -1   
            })}
            else products = state.productsFilter
            return{
                ...state,
                productsFilter: products,
                refresh: !state.refresh
            }

        case GET_PRODUCT_DETAIL:
            return{
                ...state,
                productDetail: action.payload
            }
        
        case GET_USERS:
            return{
                ...state,
                users: action.payload
            }

        case CREATE_USER:
            return{
                ...state,
                refresh: !state.refresh
            }

        case UPDATE_USER:
            return{
                ...state,
                refresh: !state.refresh
            }
        
        case DELETE_USER:
            return{
                ...state,
                refresh: !state.refresh
            }

        case VERIFY_ROLE:
            return{
                ...state,
                currentUser: action.payload,
                role: action.payload.role,
                cart: action.payload.cart
            }

        case GET_CATEGORIES:
            return{
                ...state,
                categories: action.payload,
            }

        case ADD_CATEGORY:
            return{
                ...state,
                refresh: !state.refresh
            }

        case ADD_SUBCATEGORY:
            return{
                ...state,
                refresh: !state.refresh
            }
        
        case GET_SALES_ADMIN:
            return{
                ...state,
                salesAdmin: action.payload
            }
        
        case GET_SALES_SHIPMENT:
            return{
                ...state,
                salesShipment: action.payload
            }
        
        case SET_SHIPMENT_STATUS:
            return{
                ...state,
                refresh: !state.refresh
            }

        default:
            return state
    }
}