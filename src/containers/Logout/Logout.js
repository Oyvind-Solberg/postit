import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useStore } from '../../store/store';

const Logout = (props) => {
	const asyncDispatch = useStore(false)[1];
	const dispatch = useStore(false)[2];
	useEffect(() => {
		asyncDispatch('LOG_OUT');
		dispatch('SET_IS_LOADING', true);
	}, []);

	return <Redirect to="/" />;
};

export default Logout;
