import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  @font-face {
    font-family: "Montserrat-Bold";
    src: url(./montserrat/Montserrat-Bold.ttf) format("truetype");
  }

  @font-face {
    font-family: "Pretendard-SemiBold";
    src: url(./pretendard/Pretendard-SemiBold.woff2) format("woff");
  }

  @font-face {
    font-family: "Pretendard-Medium";
    src: url(./pretendard/Pretendard-Medium.woff2) format("woff");
  }

  @font-face {
    font-family: "Pretendard-Regular";
    src: url(./pretendard/Pretendard-Regular.woff2) format("woff");
  }
`;