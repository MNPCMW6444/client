require('dotenv').config();


const env =
    process.env.REACT_APP_WHITE_ENV === "dev"
        ? " Dev"
        : process.env.REACT_APP_WHITE_ENV === "tst"
            ? " TST"
            : "";


module.exports = {
    short_name: `Failean${env}`,
    name: `Failean App${env}`,
    icons: [
        {
            src: "favicon.ico",
            sizes: "1600x1600",
            type: "image/x-icon",
        },
        {
            src: "whiteIcon.png",
            type: "image/png",
            sizes: "1600x1600",
        },
        {
            src: "whiteIcon.png",
            type: "image/png",
            sizes: "144x144",
        },
    ],
    start_url: "/",
    background_color: "#8a307f",
    display: "standalone",
    scope: "/",
    theme_color: "#ffffff",
};
