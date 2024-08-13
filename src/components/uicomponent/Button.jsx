import React from 'react';

const Button = ({ title, className, variant = 'outline' }) => {
	return <button className={className + ` ${variant === 'outline' ? '   border border-gallery   hover:bg-gallery' : ''} ${' px-[16px] py-[11px]  rounded-lg'}`}>{title}</button>;
};

export default Button;
