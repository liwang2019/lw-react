import { getProductDetail } from "./entities/products"
import { actions as orderActions, AVAILABLE_TYPE } from "./entities/orders"

export const types = {
  SET_ORDER_QUANTITY: "PURCHASE/SET_ORDER_QUANTITY",
  CLOSE_TIP: "PURCHASE/CLOSE_TIP",
  SUBMIT_ORDER_REQUEST: "PURCHASE/SUBMIT_ORDER_REQUEST",
  SUBMIT_ORDER_SUCCESS: "PURCHASE/SUBMIT_ORDER_SUCCESS",
  SUBMIT_ORDER_FAILURE: "PURCHASE/SUBMIT_ORDER_FAILURE"
}

const initialState = {
  quantity: 1,
  showTip: false,
}


export const actions = {
  setOrderQuantity: quantity => ({
    type: types.SET_ORDER_QUANTITY,
    quantity
  }),

  closeTip: () => ({
    type: types.CLOSE_TIP
  }),

  submitOrder: productId => {
    return (dispatch, getState) => {
      dispatch({ type: types.SUBMIT_ORDER_REQUEST });
      return new Promise((resovle, reject) => {
        setTimeout(() => {
          const product = getProductDetail(getState(), productId);
          const quantity = getState().purchase.quantity;
          const totalPrice = (product.currentPrice * quantity).toFixed(1);
          const text1 = `${quantity} | Total：${totalPrice}`;
          const text2 = product.validityPeriod;
          const order = {
            title: `${product.shop}:${product.product}`,
            orderPicUrl: product.picture,
            channel: 'Group',
            statusText: 'To be paid',
            text: [text1, text2],
            type: AVAILABLE_TYPE
          }
          dispatch(orderActions.addOrder(order));
          dispatch({ type: types.SUBMIT_ORDER_SUCCESS });
        }, 500);
      })
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ORDER_QUANTITY:
      return { ...state, quantity: action.quantity }
    case types.CLOSE_TIP:
      return { ...state, showTip: false }
    case types.SUBMIT_ORDER_SUCCESS:
      return { ...state, showTip: true }
    default:
      return state;
  }
}

export default reducer;

//selectors
export const getQuantity = (state) => {
  return state.purchase.quantity
}

export const getTipStatus = (state) => {
  return state.purchase.showTip
}

export const getProduct = (state, id) => {
  return getProductDetail(state, id)
}