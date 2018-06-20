import React, { Component } from 'react';
import classNames from 'classnames';

import Styles from './style.css';

export default () => {
	return (
		<span className={classNames(Styles['card-container'])}>
			<input type="checkbox" className={classNames(Styles.card)} />
		</span>
	);
}