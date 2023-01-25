import { styled } from "styled-components";

export const ProductShowcaseContainer = styled.div`
  container-type: inline-size;
  container-name: product-showcase;

  & .showcase-wrapper {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  & .showcase-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  @container product-showcase (width > 500px) {
    .showcase-wrapper {
      flex-direction: row;

      & > div {
        flex: 0 50%;
      }
    }

    .showcase-content {
      justify-content: center;
      padding: 24px;
      max-width: 500px;
    }
  }

  @container product-showcase (width > 900px) {
    .showcase-content {
      padding: 48px;
      gap: 24px;
    }
  }
`;
