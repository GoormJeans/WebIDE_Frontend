import { Box } from "@mui/material";
import PropTypes from "prop-types";
import highfiveImg from "../assets/images/highfive.png";
import fistbumpImg from "../assets/images/fistbump.png";

export const AnimatedHighFive = ({ isMobile }) => {
    return (
        <Box
            sx={{
                "@keyframes rotateAnimation": {
                    "0%": {
                        transform: "rotateZ(0deg)",
                    },
                    "50%": {
                        transform: "rotateZ(5deg)",
                    },
                    "100%": {
                        transform: "rotateZ(0deg)",
                    },
                },
                animation: "rotateAnimation 5s ease-in-out infinite",
            }}
        >
            <img
                src={highfiveImg}
                width={isMobile ? 130 : 200}
                alt="highfive"
            />
        </Box>
    );
};

export const AnimatedFistBump = ({ isMobile }) => {
    return (
        <Box
            sx={{
                "@keyframes rotateAnimation": {
                    "0%": {
                        transform: "rotateZ(0deg)",
                    },
                    "50%": {
                        transform: "rotateZ(5deg)",
                    },
                    "100%": {
                        transform: "rotateZ(0deg)",
                    },
                },
                animation: "rotateAnimation 5s ease-in-out infinite",
            }}
        >
            <img
                src={fistbumpImg}
                width={isMobile ? 120 : 160}
                alt="fistbump"
            />
        </Box>
    );
};

AnimatedHighFive.propTypes = {
    isMobile: PropTypes.bool,
};

AnimatedFistBump.propTypes = {
    isMobile: PropTypes.bool,
};

