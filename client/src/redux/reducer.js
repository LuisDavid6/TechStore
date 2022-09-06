import { GET_PRODUCTS, DELETE_PRODUCT, ADD_TO_CART, REMOVE_FROM_CART, FILTER_BY_CATEGORY,
         FILTER_BY_PRICE, GET_PRODUCT_DETAIL, GET_USERS, CREATE_USER,
         VERIFY_ROLE, GET_CATEGORIES, ADD_CATEGORY, ADD_SUBCATEGORY,
         FILTER_BY_SUBCATEGORY,
         CREATE_PRODUCT} from "./actionTypes";

const initialState = {
    products: [],
    categories: [],
    productsFilter:[],
    refresh: false,
    productDetail:{},
    users: [],
    // user: {},
    categorySelect: {},
    categoryProductsAdmin: [],
    currentUser: {},
    role: "",
}

export default function Reducer(state = initialState, action){
    
    switch(action.type){
        case GET_PRODUCTS:
            return{
                ...state,
                products: action.payload,
                productsFilter: action.payload
            }

        case CREATE_PRODUCT:
            return{
                ...state,
                refresh: !state.refresh
            }
        
        case DELETE_PRODUCT:
            return{
                ...state,
                categoryProductsAdmin: state.categoryProductsAdmin.filter(e=> e.id !== action.payload.id),
                refresh: !state.refresh
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

        case FILTER_BY_CATEGORY:
            return{
                ...state,
                productsFilter: action.payload.products,
                categorySelect: action.payload,
                categoryProductsAdmin: action.payload.products,
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
            }

        case FILTER_BY_PRICE:
            let products = []
            if(action.payload === "asc") {
                products = state.productsFilter.sort(function(a,b){
                    if(a.price > b.price) return 1
                    else return -1   
                })}
                
            else if(action.payload === "desc") {
                products = state.productsFilter.sort(function(a,b){
                    if(a.price < b.price) return 1
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

        default:
            return state
    }
}