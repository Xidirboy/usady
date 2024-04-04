import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { heardIcon } from '../assets/headIcons';
import { babyIcon, dateIcon, starIcon, usersIcon } from '../assets/homeS3Icon';
const CardStyle = styled.div`
	.card {
		border-radius: 18.07px;
		box-shadow: 0px 6.8px 27.2px 0px rgba(3, 99, 248, 0.15);
		background: rgb(255, 255, 255);
		width: 400px;
		@media (max-width: 768px) {
			width: 350px;
		}
		.img {
			position: relative;
			.raiting_top {
				position: absolute;
				top: 16px;
				left: 16px;
				height: 46px;
				width: 94px;
				border-radius: 56.46px;
				background: rgb(255, 255, 255);
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 10px;
				color: rgb(4, 17, 38);
				font-size: 24px;
				font-weight: 500;
				line-height: 34.41px;
				.icon_s {
					height: 28px;
				}
			}
			.cloud {
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				height: 60px;
				width: 60px;
				bottom: -30px;
				right: 20px;
				border-radius: 54.21px;
				box-shadow: 0px 4.52px 4.52px 0px rgba(0, 0, 0, 0.1);
				background: rgb(255, 255, 255);

				.heart-clicked {
					transition: all 0.5s ease;
					svg {
						path {
							fill: red;
							fill-rule: inherit;
						}
					}
				}
				.heart {
					cursor: pointer;
				}
			}
			.callback {
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				height: 46px;
				padding: 0px 18px;
				right: 16px;
				top: 16px;
				border-radius: 54.21px;
				box-shadow: 0px 4.52px 4.52px 0px rgba(0, 0, 0, 0.1);
				background: rgb(255, 255, 255);
				gap: 10px;

				.left_c {
					display: flex;
					flex-direction: column;
					a {
						color: rgb(0, 50, 131);
						font-weight: 600;
						.com {
							color: rgb(0, 165, 236);
						}
					}
					p {
						color: rgb(51, 51, 51);
						font-family: Arial;
						font-size: 12px;
						font-weight: 400;
						line-height: 15.14px;
					}
				}
				.right_c {
					border-radius: 6.49px 6.49px 6.49px 0px;
					background: rgb(0, 50, 131);
					padding: 7px;
					color: rgb(255, 255, 255);
					font-family: Arial;
					font-size: 16px;
					font-weight: 400;
					line-height: 23.17px;
				}
			}
		}

		.card-body {
			.top {
				padding: 16px;
				border-bottom: 1px dashed rgba(35, 93, 255, 0.5);

				.stickers {
					display: flex;
					gap: 10px;
					margin-bottom: 16px;
					& .raiting_body {
						display: flex;
						align-items: center;
						border-radius: 5px;
						background: rgba(255, 213, 64, 0.12);
						padding: 4px 8px 4px 6px;
						width: auto;
						& .star_icon {
							margin-right: 10px;
							svg {
								width: 19px;
							}
						}
						p {
							color: rgb(7, 7, 7);
							font-size: 18px;
							font-weight: 400;
							line-height: 20px;
						}
					}
					& .location {
						padding: 4px 8px 4px 6px;
						border-radius: 5px;
						background: rgba(0, 150, 255, 0.08);
						display: flex;
						align-items: center;
						img {
							margin-right: 5px;
						}
						p {
							color: rgb(0, 91, 255);
							font-size: 16px;
							font-weight: 400;
							line-height: 20px;
						}
					}
				}
				.text {
					font-weight: 600;
					font-size: 20px;
					margin-bottom: 16px;
				}
				.about {
					display: flex;
					gap: 7px;
					overflow-x: auto;
					.icon {
						display: flex;
						align-items: center;
						svg {
							width: 17px;
						}
						p {
							margin-left: 3px;
							white-space: nowrap;
						}
					}
				}
			}
			.bottom {
				padding: 16px;
				display: flex;
				justify-content: space-between;
				gap: 15px;
				.price {
					color: rgb(35, 93, 255);
					font-family: Urbanist;
					font-size: 21.56px;
					font-weight: 700;
					line-height: 20px;
					margin-top: 7px;
				}
				span {
					white-space: nowrap;
					font-size: 14.53px;
					font-weight: 400;
					line-height: 21.43px;
					color: rgb(48, 48, 48);
				}
				button {
					width: 100%;
					border-radius: 12px;
					background: rgb(35, 93, 255);
					height: 60px;
					color: white;
					font-size: 20px;
					font-weight: 700;
					line-height: 31.77px;
				}
			}
		}
	}
`;
const Card = ({ isClicked, handleClick }) => {
	return (
		<CardStyle>
			<div className='card'>
				<div className='img'>
					<img src='/images/div.image-inner.svg' alt='' />
					<div className='raiting_top'>
						4<div className='icon_s'>{starIcon}</div>
					</div>
					<div className='cloud'>
						<div onClick={handleClick} className={isClicked ? 'heart heart-clicked' : 'heart'}>
							{heardIcon}
						</div>
					</div>
					<div className='callback'>
						<div className='left_c'>
							<Link to=''>
								Booking<span className='com'>.com</span>
							</Link>
							<p>519 отзывов</p>
						</div>
						<div className='right_c'>8,3</div>
					</div>
				</div>
				<div className='card-body'>
					<div className='top'>
						<div className='stickers'>
							<div className='raiting_body'>
								<div className='star_icon'>{starIcon}</div>
								<p>4.5</p>
							</div>
							<div className='location'>
								<img src='/images/location.svg' alt='' />
								<p>Agoda, surulere lagos</p>
							</div>
						</div>
						<p className='text'>Onyado Nono Kyoto Shichijo Natural Hot...</p>
						<div className='about'>
							<div className='time icon'>
								{dateIcon} <p>С 14.10</p>
							</div>
							<div className='time icon'>
								{dateIcon} <p>7 дней</p>
							</div>
							<div className='time icon'>
								{usersIcon} <p>2 взрослых</p>
							</div>
							<div className='time icon'>
								{babyIcon} <p>1 ребенок</p>
							</div>
						</div>
					</div>
					<div className='bottom'>
						<div>
							<span>за 1 человека</span>
							<div className='price'>244 $</div>
						</div>
						<button>От 540$ &gt;</button>
					</div>
				</div>
			</div>
		</CardStyle>
	);
};

export default Card;
