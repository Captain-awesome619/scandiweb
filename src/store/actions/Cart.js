export function ADD_TO_CART(product) {
    return {
      type: "ADD_TO_CART",
      product,
    };
  }
  export function UPDATE_AMOUNT(cartItemId, newQuantity) {
    return {
      type: "UPDATE_QUANTITY",
      cartItemId,
      newQuantity,
    };
  }
  export function DELETE_IN_CART(cartItem) {
    return {
      type: "DELETE_IN_CART",
      cartItem,
    };
  }

  export function CLEAR_CART(){
    return{
      type: "CLEAR_CART"
    }
  }
