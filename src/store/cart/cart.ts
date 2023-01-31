import { create } from "zustand";
import cloneDeep from "lodash.clonedeep";

export type CartProduct = {
  id: string;
  src: string;
  name: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
  slug: string;
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
export type UpdateSubtotalAction = (products: CartProduct[]) => void;
export type UpdateShippingAction = (shipping: number) => void;

export type ClearCartAction = () => void;

export type CartState = {
  cartData: CartData;
  addProduct: AddProductAction;
  removeProduct: RemoveProductAction;
  updateQuantity: UpdateQuantityAction;
  updateSubtotal: UpdateSubtotalAction;
  updateShipping: UpdateShippingAction;
  clearCart: ClearCartAction;
};

export const initialCartData: CartData = {
  products: [],
  totals: {
    subtotal: 0,
    shipping: 0,
    total: 0,
  },
};

const useCart = create<CartState>((set, get) => ({
  cartData: initialCartData,
  addProduct: (product) => {
    const newCart = cloneDeep(get().cartData);
    const productInCart = newCart.products.find(
      (cartProduct) => cartProduct.id === product.id
    );
    if (productInCart) {
      return get().updateQuantity(product.id, productInCart.quantity + 1);
    }
    newCart.products.push(product);
    set({ cartData: newCart });

    get().updateSubtotal(newCart.products);
  },
  removeProduct: (productId) => {
    const newCart = cloneDeep(get().cartData);
    newCart.products = newCart.products.filter(
      (product) => product.id !== productId
    );
    set({ cartData: newCart });

    get().updateSubtotal(newCart.products);
  },
  updateQuantity: (productId, newQuantity) => {
    const newCart = cloneDeep(get().cartData);
    const productIndex = newCart.products.findIndex((p) => p.id === productId);
    if (productIndex < 0) return;

    if (newQuantity === 0) {
      // Remove the product
      newCart.products = newCart.products.filter(
        (product) => product.id !== productId
      );
    } else {
      newCart.products[productIndex].quantity = newQuantity;
    }

    set({ cartData: newCart });

    get().updateSubtotal(newCart.products);
  },
  updateSubtotal: (products) => {
    const newCart = cloneDeep(get().cartData);
    const newSubtotal = products.reduce(
      (prev, curr) => (prev += curr.price * curr.quantity),
      0
    );
    newCart.totals = {
      subtotal: newSubtotal,
      shipping: newCart.totals.shipping,
      total: newSubtotal + newCart.totals.shipping,
    };
    set({ cartData: newCart });
  },
  updateShipping: (shipping) => {
    const newCart = cloneDeep(get().cartData);
    const totals = {
      subtotal: newCart.totals.subtotal,
      shipping: shipping,
      total: newCart.totals.subtotal + shipping,
    };
    set({ cartData: { ...newCart, totals } });
  },
  clearCart: () => {
    const newCart = cloneDeep(get().cartData);
    newCart.products = [];
    set({ cartData: newCart });
    get().updateSubtotal([]);
  },
}));

export default useCart;
