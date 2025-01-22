/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray01: "#535353",
        gray02: "#8B8B8B",
        gray03: "#B5B5B5",
        warn: "#EA5455",
        black: "#151515",
        black_50: "#15151550",
        white: "#FFFFFF",
        white01: "#FAFAFA",
        white02: "#ECEBEB",
        white03: "#DEDEDE",
        white01_30: "#FAFAFA60",
        main: "#4CC9F0",
        main30: "#C2E7F3",
        kakao: "#FEE500",
        twitter: "#1D9BF0",
      },
      fontFamily: {
        pretendard: ["Pretendard"], //기본 폰트
      },
      screens: {
        mobile: "320px", // 최소 320px 이상
        tablet: "769px", // 최소 769px 이상
        desktop: "1281px", // 최소 1281px 이상
      },
    },
  },
  plugins: [],
};
