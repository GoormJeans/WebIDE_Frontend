import { Box } from "@mui/material";
import PropTypes from "prop-types";
import highfiveImg from "../../assets/images/highfive.png";

const AnimatedHighFive = ({ isMobile }) => {
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

AnimatedHighFive.propTypes = {
    isMobile: PropTypes.bool,
};

export default AnimatedHighFive;
