import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	background-color: white;
	height: 100vh;
	width: 100vw;
	z-index: -1;
`;

const BackgroundOverlay = (props) => {
	return <Background />;
};

export default BackgroundOverlay;
