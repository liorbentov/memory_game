import React, { Component } from 'react';
import classNames from 'classnames';

import Styles from './style.css';

export default ({ checked, onChange, row, column, data }) => {
	const handleCheck = () => onChange(row, column);

	const content = checked ? data : 'Hello';
	const className = checked ? classNames(Styles.back) : classNames(Styles.front);
	return (
		<span className={classNames(Styles['card-container'])}>
			<button 
				className={classNames(Styles.flipper, { [Styles.flipped] : checked })} 
				onClick={handleCheck}
				>
				<span className={className} >
					{ content }	 
				</span>
			</button>
		</span>
	);
}