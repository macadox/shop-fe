import { styled } from "styled-components";

export const StyledBanner = styled.section`
  container-type: inline-size;
  container-name: banner;
  text-align: center;

  & .banner-content {
    padding: 16px;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 16px;
  }

  & .banner-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  & .banner-image {
    flex-grow: 1;
  }

  h2 {
    font-size: 20px;
  }
  p {
    font-size: 16px;
  }

  @container banner (width > 500px) {
    .banner-wrapper {
      display: flex;
    }

    .banner-content {
      padding: 32px;
      align-items: start;
      flex-direction: column;
      justify-content: center;
    }

    .banner-top {
      text-align: start;
      align-items: start;
      justify-content: center;
      padding: 0;
      max-width: 500px;
    }

    .banner-image,
    .banner-content {
      flex: 0 50%;
    }

    h2 {
      font-size: 24px;
    }
  }

  @container banner (width > 1280px) {
    & .banner-top {
      gap: 24px;

      & > button {
        padding: 16px 92px;
      }
    }
  }
`;
