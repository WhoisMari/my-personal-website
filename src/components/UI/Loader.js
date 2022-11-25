import React from "react";
import './loaderStyles.scss';
const Loader = () => {
	return (
		<div className="wrap-loader">
			<div className="loader loader-butterfly"></div>
			<div className="loader-message">Loading...</div>
		</div>
	);
};

export default Loader;