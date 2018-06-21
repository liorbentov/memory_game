import React, { Component } from 'react';
import classNames from 'classnames';

import Styles from './style.css';

export default ({ checked, onChange, row, column, data }) => {
	const handleCheck = () => onChange(row, column);

	return (
		<span className={classNames(Styles['card-container'])}>
			<button 
				className={classNames(Styles.card, { [Styles.flipped]: checked })} 
				onClick={handleCheck}
				data-value={data}
			>
				Hello
			</button>
		</span>
	);
}