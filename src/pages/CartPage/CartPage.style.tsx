import { styled } from "styled-components";
import * as colors from "../../constants/colors";

export const StyledCartPageWrapper = styled.div`
  width: 100%;

  .cart-summary-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    margin: 24px 8px 24px 8px;
  }

  .cart-items-wrapper {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  @media (min-width: 1024px) {
    display: flex;

    .cart-items-wrapper {
      background: white;
      padding: 24px;
      border: 1px solid ${colors.LIGHTER};
      max-width: 788px;
      margin: 10vh 24px 24px 24px;
    }

    .cart-summary-wrapper {
      margin: calc(10vh + 48px) 260px auto 130px;
      width: max-content;
    }
  }

  @media (min-width: 1280px) {
    .cart-items-wrapper {
      margin-left: auto;
    }

    .cart-summary-wrapper {
      margin-right: auto;
    }
  }
`;
