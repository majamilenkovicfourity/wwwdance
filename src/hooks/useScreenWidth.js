"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScreenWidth = void 0;
const react_1 = require("react");
const useScreenWidth = () => {
    const [screenWidth, setScreenWidth] = (0, react_1.useState)(window.innerWidth);
    (0, react_1.useEffect)(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return screenWidth;
};
exports.useScreenWidth = useScreenWidth;
