import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useCart, { initialCartData, generateProductHash } from "./cart";

const MOCK_PRODUCT_1 = {
  id: "1",
  name: "Chuck Norris's boots",
  price: 10,
  quantity: 2,
  src: "https://picsum.photos/200/200",
  slug: "chuck-norris-boots",
  color: "orange",
  uniqueId: "1_boots",
};

const MOCK_PRODUCT_2 = {
  id: "2",
  name: "Chuck Norris's hat",
  price: 30,
  quantity: 1,
  src: "https://picsum.photos/200/200",
  slug: "chuck-norris-hat",
  size: "m",
  uniqueId: "2_hat",
};

const MOCK_PRODUCT_3 = {
  id: "3",
  name: "Chuck Norris's badge",
  price: 100,
  quantity: 1,
  src: "https://picsum.photos/200/200",
  slug: "chuck-norris-badge",
  color: "gold",
  uniqueId: "3_badge",
};

const MOCK_PRODUCT_4 = {
  id: "4",
  name: "Chuck Norris's gun",
  price: 80,
  quantity: 5,
  src: "https://picsum.photos/200/200",
  slug: "chuck-norris-gun",
  size: "XXL",
  uniqueId: "4_gun",
};

describe("cart store", () => {
  it("should start with empty cart data", () => {
    const { result } = renderHook(() => useCart());
    const { cartData } = result.current;

    expect(cartData.products).toHaveLength(0);
    expect(cartData.totals.shipping).toEqual(0);
    expect(cartData.totals.subtotal).toEqual(0);
    expect(cartData.totals.total).toEqual(0);
  });
  it("should add product to the cart", () => {
    const { result } = renderHook(() => useCart());
    const { addProduct, cartData } = result.current;
    act(() => {
      addProduct(MOCK_PRODUCT_1);
    });
    expect(cartData.products).toHaveLength(1);
    expect(cartData.products[0]).toEqual(MOCK_PRODUCT_1);
  });
  it("should add to the quantity if we add once again same product", () => {
    const { result } = renderHook(() => useCart());
    const { addProduct, cartData } = result.current;
    act(() => {
      addProduct(MOCK_PRODUCT_1);
    });
    expect(cartData.products).toHaveLength(1);
    expect(cartData.products[0]).toEqual({ ...MOCK_PRODUCT_1, quantity: 3 });
  });
  it("should remove correct product", () => {
    const { result } = renderHook(() => useCart());
    const { removeProduct, cartData, addProduct } = result.current;
    act(() => {
      addProduct(MOCK_PRODUCT_1);
      addProduct(MOCK_PRODUCT_2);
      addProduct(MOCK_PRODUCT_3);
      addProduct(MOCK_PRODUCT_4);

      removeProduct(MOCK_PRODUCT_3.id);
    });

    expect(cartData.products).toHaveLength(3);
    [MOCK_PRODUCT_1, MOCK_PRODUCT_2, MOCK_PRODUCT_4].forEach(
      (mockProduct, index) => {
        expect(cartData.products[index].id).toEqual(mockProduct.id);
      }
    );
  });
  it("should update the quantity properly", () => {
    const { result } = renderHook(() => useCart());
    const { updateQuantity, cartData, addProduct } = result.current;
    act(() => {
      addProduct(MOCK_PRODUCT_1);
      updateQuantity(MOCK_PRODUCT_1.id, 10);
    });

    expect(cartData.products[0].quantity).toEqual(10);
  });
  it("should remove the product if quantity is set to 0", () => {
    const { result } = renderHook(() => useCart());
    const { updateQuantity, cartData, addProduct } = result.current;
    act(() => {
      addProduct(MOCK_PRODUCT_1);
      updateQuantity(MOCK_PRODUCT_1.id, 0);
    });

    expect(cartData.products).toHaveLength(0);
  });
  it("should clear the cart", () => {
    const { result } = renderHook(() => useCart());
    const { clearCart, cartData, addProduct } = result.current;
    act(() => {
      addProduct(MOCK_PRODUCT_1);
      addProduct(MOCK_PRODUCT_2);
      addProduct(MOCK_PRODUCT_3);
      clearCart();
    });

    expect(cartData.products).toHaveLength(0);
  });
});

describe("cart store totals", () => {
  it("should update the totals when we add products to the cart", () => {
    const { result } = renderHook(() => useCart());
    const { cartData, addProduct } = result.current;
    act(() => {
      addProduct(MOCK_PRODUCT_1);
      addProduct(MOCK_PRODUCT_2);
    });

    expect(cartData.totals.subtotal).toEqual(50);
    expect(cartData.totals.total).toEqual(50);
  });
  it("should update the totals, when we increase a quantity of a product", () => {
    const { result } = renderHook(() => useCart());
    const { cartData, addProduct, updateQuantity } = result.current;
    act(() => {
      addProduct(MOCK_PRODUCT_1);
      updateQuantity(MOCK_PRODUCT_1.id, 10);
    });

    expect(cartData.totals.subtotal).toEqual(100);
    expect(cartData.totals.total).toEqual(100);
  });
  it("should update the totals, when we remove products from the cart", () => {
    const { result } = renderHook(() => useCart());
    const { cartData, addProduct, removeProduct } = result.current;
    act(() => {
      addProduct(MOCK_PRODUCT_1);
      addProduct(MOCK_PRODUCT_2);
      removeProduct(MOCK_PRODUCT_1.id);
    });

    expect(cartData.totals.subtotal).toEqual(30);
    expect(cartData.totals.total).toEqual(30);
  });
  it("should update the totals, when we change the shipping", () => {
    const { result } = renderHook(() => useCart());
    const { cartData, updateShipping } = result.current;

    act(() => {
      updateShipping(21);
    });

    expect(cartData.totals.shipping).toEqual(21);
    expect(cartData.totals.total).toEqual(21);
  });
});

describe("generateProductHash", () => {
  it("should generate the same hash for the same values", () => {
    const value1 = generateProductHash(MOCK_PRODUCT_1);
    const value2 = generateProductHash(MOCK_PRODUCT_1);

    expect(value1).toEqual(value2);
  });
  it("should generate two different hashes for different products", () => {
    const value1 = generateProductHash(MOCK_PRODUCT_1);
    const value2 = generateProductHash(MOCK_PRODUCT_2);

    expect(value1).not.toEqual(value2);
  });
});
