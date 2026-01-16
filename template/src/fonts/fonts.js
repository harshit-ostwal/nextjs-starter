import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--Inter",
    preload: true,
    display: "swap",
    style: "normal",
});

export default inter;
