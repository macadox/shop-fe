import { styled } from "styled-components";

export const StyledCartItemWrapper = styled.div`
  container-type: inline-size;
  container-name: cart-item;
  width: 100%;

  & .cart-item-image {
    height: 140px;
    width: 140px;
    flex-grow: 0;
    flex-shrink: 0;
  }

  & .cart-item-main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 8px;
    padding-left: 8px;
    padding-bottom: 8px;
  }

  & .cart-item-secondary {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    gap: 12px;
    padding-top: 8px;
    padding-right: 8px;
    padding-bottom: 8px;

    & button {
      margin-top: -4px;
    }
  }

  @media (min-width: 1024px) {
    max-width: 740px;
  }
`;
