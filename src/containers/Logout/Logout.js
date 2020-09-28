import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useStore } from '../../store/store';

const Logout = (props) => {
	const dispatch = useStore()[1];
	useEffect(() => {
		dispatch('LOG_OUT');
	}, []);

	return <Redirect to="/" />;
};

export default Logout;
