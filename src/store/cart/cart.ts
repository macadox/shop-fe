import { create } from "zustand";
import cloneDeep from "lodash.clonedeep";
import crypto from "crypto";

type UniqueId = string;
type ApiId = string;

export type CartProduct =
  | {
      id: ApiId;
      src: string;
      name: string;
      price: number;
      quantity: number;
      color: string;
      size: string;
      slug: string;
    }
  | {
      id: ApiId;
      src: string;
      name: string;
      price: number;
      quantity: number;
      color?: string;
      size: string;
      slug: string;
    }
  | {
      id: ApiId;
      src: string;
      name: string;
      price: number;
      quantity: number;
      color: string;
      size?: string;
      slug: string;
    };

export type CartProductWithId = CartProduct & { uniqueId: UniqueId };

export type CartData = {
  products: CartProductWithId[];
  totals: {
    subtotal: number;
    shipping: number;
    total: number;
  };
};

export type AddProductAction = (
  product: CartProduct | CartProductWithId
) => void;
export type RemoveProductAction = (uniqueId: UniqueId) => void;
export type UpdateQuantityAction = (
  uniqueId: UniqueId,
  newQuantity: number
) => void;
export type UpdateSubtotalAction = (products: CartProductWithId[]) => void;
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

export const generateProductHash = (product: CartProduct): UniqueId =>
  crypto
    .createHash("sha256")
    .update(`${product.id}-${product.color}-${product.size}`)
    .digest("hex");

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
    if ("uniqueId" in product) {
      const productInCart = newCart.products.find(
        (cartProduct) => cartProduct.uniqueId === product.uniqueId
      );
      if (productInCart) {
        return get().updateQuantity(
          product.uniqueId,
          productInCart.quantity + 1
        );
      }
    }

    newCart.products.push({
      ...product,
      uniqueId: generateProductHash(product),
    });

    set({ cartData: newCart });
    get().updateSubtotal(newCart.products);
  },
  removeProduct: (uniqueId) => {
    const newCart = cloneDeep(get().cartData);
    newCart.products = newCart.products.filter(
      (product) => product.uniqueId !== uniqueId
    );

    set({ cartData: newCart });
    get().updateSubtotal(newCart.products);
  },
  updateQuantity: (uniqueId, newQuantity) => {
    if (newQuantity === 0) return get().removeProduct(uniqueId);

    const newCart = cloneDeep(get().cartData);
    const productIndex = newCart.products.findIndex(
      (p) => p.uniqueId === uniqueId
    );
    if (productIndex < 0) return;
    newCart.products[productIndex].quantity = newQuantity;

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
