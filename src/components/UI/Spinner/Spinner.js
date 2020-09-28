import React from 'react';
import CurcularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
`;

function Spinner(props) {
	return (
		<Container>
			<CurcularProgress />
		</Container>
	);
}

export default Spinner;
