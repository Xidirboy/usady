import React from 'react';
import styled from 'styled-components';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import ShowTitle from '../sections/utilsSections/ShowTitle';

const Showtitle = styled.div``;
const Home2Style = styled.div`
	& .slider {
		margin-top: 50px;
		margin-bottom: 50px;
		& .swiper-slide {
			width: auto;
			img {
				border-radius: 8px;
			}
		}
	}
	& .open-direction {
		& .title {
			color: rgb(43, 63, 90);
			font-size: 35px;
			font-weight: 600;
			line-height: 46.77px;
			margin-bottom: 30px;
		}
		& .sliders {
			display: flex;
			flex-direction: column;
			gap: 35px;
			& .top {
				display: flex;
				gap: 35px;
				& .left-img {
					width: 100%;
					position: relative;
					border-radius: 20px;
					/* width: 100%; */
					padding-bottom: 25%;
					overflow: hidden;
					display: block;
					margin-bottom: 12px;

					img {
						border-radius: 20px;
						display: block;
						transition: all 1s ease 0s;
						object-fit: cover;
						position: absolute;
						left: 0px;
						top: 0px;
						width: 100%;
						height: 100%;
					}
				}
				& .right-images {
					display: flex;
					width: 100%;
					gap: 35px;
					& .img-in {
						position: relative;
						border-radius: 20px;
						width: 100%;
						padding-bottom: 25%;
						overflow: hidden;
						display: block;
						margin-bottom: 12px;
						img {
							border-radius: 20px;
							display: block;
							transition: all 1s ease 0s;
							object-fit: cover;
							position: absolute;
							left: 0px;
							top: 0px;
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
	}
`;
const Home2 = () => {
	const showtitle = (
		<Showtitle>
			<h4>Лучшие туры в одном месте</h4>
			<div className=''>Selects</div>
		</Showtitle>
	);
	return (
		<div>
			<ShowTitle title={showtitle}></ShowTitle>

			<div className='container_main'>
				<Home2Style>
					<div className='slider'>
						<Swiper slidesPerView={'auto'} centeredSlides={false} spaceBetween={16} modules={[]} className='mySwiper'>
							<SwiperSlide>
								<img src='/images/home/slider.png' alt='' />
							</SwiperSlide>
							<SwiperSlide>
								<img src='/images/home/slider.png' alt='' />
							</SwiperSlide>
							<SwiperSlide>
								<img src='/images/home/slider.png' alt='' />
							</SwiperSlide>
							<SwiperSlide>
								<img src='/images/home/slider.png' alt='' />
							</SwiperSlide>
							<SwiperSlide>
								<img src='/images/home/slider.png' alt='' />
							</SwiperSlide>
							<SwiperSlide>
								<img src='/images/home/slider.png' alt='' />
							</SwiperSlide>
						</Swiper>
					</div>
					<div className='open-direction'>
						<div className='title'>Открытые направления</div>
						{/* <div className='' style={{ display: 'flex', gap: '35px' }}>
							<img src='/images/home/slider2.svg' alt='' />
							<img src='/images/home/slider3.svg' alt='' />
							<img src='/images/home/slider3.svg' alt='' />
						</div> */}

						<div className='sliders'>
							<div className='top'>
								<div className='left-img'>
									<img src='/images/home/slider2.svg' alt='' />
								</div>
								<div className='right-images'>
									<div className='img-in'>
										<img src='/images/home/slider2.svg' alt='' />
									</div>
									<div className='img-in'>
										<img src='/images/home/slider2.svg' alt='' />
									</div>
								</div>
							</div>
							<div></div>
						</div>
					</div>
				</Home2Style>
			</div>
		</div>
	);
};

export default Home2;
