/** @type {import('tailwindcss').Config} */

module.exports = {
  daisyui: {
    theme: ["light"],
  },
};

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionDuration: "5s",
      colors: {
        "BG-color": "#344cb1",
        "Button-color": "#2579ff",
        FontPrimaryColor: "#0E1133",
        DashboardFontPrimaryColor: "#0E1133CC",
        HomeBG: "#f0f0f0",
      },
      boxShadow: {
        CardShadow: "6px 10px 50px rgb(25 28 104 / 15%)",
      },
      gridTemplateColumns: {
        loginPage: "1fr 0.9fr",
        ArticleSearchBar: "1fr 1fr 0.8fr",
        CategorySearchBar: "1fr 0.4fr",
      },
      backgroundColor: {
        ArticleModal: "#0000004f",
        LoaderBGDark: "#00000014",
      },
      height: {
        DashboardTable: "550px",
      },
      backgroundImage: {
        HomeEmptyDataBackgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='17' ry='17' stroke='black' stroke-width='2' stroke-dasharray='6%2c 14' stroke-dashoffset='43' stroke-linecap='square'/%3e%3c/svg%3e")`,
      },
      screens: {
        SmallPhones: { max: "620px" },
        // => @media (min-width: 320px) { ... }

        RangeForPhone: { max: "1023px" },
        // => @media (min-width: 200px) and (max-width:1023px) { ... }

        MediumPhones: "375px",
        // => @media (min-width: 375px) { ... }

        SmallPhones$Tablets: { max: "800px" },

        LargePhones: { min: "620px", max: "800px" },
        // => @media (min-width: 425px) { ... }

        Tablet: { min: "620px", max: "1023px" },
        // => @media (min-width: 768px) { ... }

        Laptop: { min: "1024px", max: "1439px" },
        // => @media (min-width: 1024px) { ... }

        AllLaptop: { min: "1024px" },

        LargeLaptop: "1440px",
        // => @media (min-width: 1440px) { ... }

        "4kDesktop": "2560px",
        // => @media (min-width: 2560px) { ... }

        maxSizeScreen: { max: "1270px", min: "1024px" },

        Tablet_768: { min: "425px", max: "768px" },
        Mobile_L_425: { max: "425px" },
        Settings_Page_620: { max: "620px" },
      },
    },
  },
  plugins: [require("daisyui")],
};
