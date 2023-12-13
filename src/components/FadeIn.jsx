import { Fade } from "@mui/material";

const FadeIn = ({ children, index }) => {
	return (
		<Fade in timeout={500} style={{ transitionDelay: 500 * index }}>
			{children}
		</Fade>
	);
};


export default FadeIn;

