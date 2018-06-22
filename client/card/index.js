import React, { Component } from 'react';
import classNames from 'classnames';

import Styles from './style.css';

const ContentDisplay = ({ className, content }) => {
	if (!content) {
		return <span className={className}></span>;
	}

	if (content.type === 'text') {
		return <span className={className}>{content.value}</span>;
	}

	return <img src={content.value} className={classNames(className, Styles.img)} />;
};

export default ({ checked, onChange, row, column, data, isSelected }) => {
	const handleCheck = () => onChange(row, column);

	// const content = checked ? data : 'Hello';
	const className = checked ? classNames(Styles.back) : classNames(Styles.front);
	return (
		<span className={classNames(Styles['card-container'])}>
			<button 
				className={classNames(
					Styles.flipper, 
					{ [Styles.flipped] : checked }, 
					{ [Styles.selected] : isSelected })} 
				onClick={handleCheck}
				>
				<ContentDisplay content={data} className={className}/>
			</button>
		</span>
	);
}