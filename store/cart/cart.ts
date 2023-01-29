import { useStore, create } from "zustand";

export type CartProduct = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

export type CartData = {
  products: CartProduct[];
  totals: {
    subtotal: number;
    shipping: number;
    total: number;
  };
};

export type AddProductAction = (product: CartProduct) => void;
export type RemoveProductAction = (productId: string) => void;
export type UpdateQuantityAction = (
  productId: string,
  newQuantity: number
) => void;
export type UpdateTotalsAction = ({
  subtotal,
  shipping,
}: {
  subtotal: number;
  shipping: number;
}) => void;
export type ClearCartAction = () => void;

export type CartState = {
  cartData: CartData;
  addProduct: AddProductAction;
  removeProduct: RemoveProductAction;
  updateQuantity: UpdateQuantityAction;
  updateTotals: UpdateTotalsAction;
  clearCart: ClearCartAction;
};

const initialCartData: CartData = {
  products: [],
  totals: {
    subtotal: 0,
    shipping: 0,
    total: 0,
  },
};

const useCart = create<CartState>((set, get) => ({
  cartData: initialCartData,
  addProduct: (product: CartProduct) => {
    const newCart = { ...get().cartData };
    // Check if product already exists in cart
    const productInCart = newCart.products.find(
      (cartProduct) => cartProduct.id === product.id
    );
    if (productInCart) {
      get().updateQuantity(product.id, productInCart.quantity + 1);
    } else {
      newCart.products.push(product);
    }
    set({});
  },
  removeProduct: (productId: string) => {},
  updateQuantity: (productId: string, newQuantity: number) => {},
  updateTotals: ({ subtotal, shipping }) => {},
  clearCart: () => {},
}));

export default useCart;
