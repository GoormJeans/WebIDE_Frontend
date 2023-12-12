import { Fade } from "@mui/material";

const FadeIn = ({ children, index }) => {
	return (
		<Fade in timeout={700} style={{ transitionDelay: 700 * index }}>
			{children}
		</Fade>
	);
};


export default FadeIn;

