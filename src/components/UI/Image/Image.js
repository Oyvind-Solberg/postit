import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
	max-width: 720px;
	height: 100%;

	object-fit: cover;
`;

const Image = (props) => {
	return <Img src={props.src} alt={props.alt} />;
};

export default Image;
