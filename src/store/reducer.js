import * as actionTypes from './actions';


const INGREDIENT_PRICES = {
	salad : 0.7,
	meat : 1.3, 
	bacon : 0.9,
	cheese : 0.4
}

const initialState = {
    ingredients : {
        salad : 0,
        bacon : 0,
        meat : 0,
        cheese : 0
    },
    total_price : 4,
    token:null,
    user_id:null,
    building: false,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case (actionTypes.ADD_INGREDIENT):
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName] + 1
                },
                total_price:state.total_price + INGREDIENT_PRICES[action.ingredientName],
                token:state.token,
                user_id:state.user_id,
                building: true,
            }
        
        case (actionTypes.REMOVE_INGREDIENT):
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName] - 1
                },
                total_price:state.total_price - INGREDIENT_PRICES[action.ingredientName],
                token:state.token,
                user_id:state.user_id,
                building: true,
            }
        
        case (actionTypes.CLEAR_BURGER):
            return {
                ingredients : {
                    salad : 0,
                    bacon : 0,
                    meat : 0,
                    cheese : 0
                },
                total_price : 4,
                token:state.token,
                user_id:state.user_id,
                building: false,
            }

        case (actionTypes.SET_TOKEN):
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                },
                total_price:state.total_price,
                user_id:action.user_id,
                token:action.token
            }

        case (actionTypes.DELETE_TOKEN):
            localStorage.removeItem('token');
            localStorage.removeItem('expiration_time');
            localStorage.removeItem('user_id');
            return {
                ingredients : {
                    salad : 0,
                    bacon : 0,
                    meat : 0,
                    cheese : 0
                },
                total_price : 4,
                token:null,
                user_id:null,
                building: false,
            }
            
        default:
            return state;
    }
}

export default reducer;