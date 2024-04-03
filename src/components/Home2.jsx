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
		}
		.sliders {
			display: flex;
			flex-direction: column;
			gap: 35px;

			.swiper-slide {
				width: auto;
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

						<div className='sliders'>
							<Swiper slidesPerView={''} centeredSlides={false} spaceBetween={35} modules={[]} className='mySwiper'>
								<SwiperSlide>
									<img src='/images/home/slider2.svg' alt='' />
								</SwiperSlide>
								<SwiperSlide>
									<img src='/images/home/slider3.svg' alt='' />
								</SwiperSlide>
								<SwiperSlide>
									<img src='/images/home/slider3.svg' alt='' />{' '}
								</SwiperSlide>
							</Swiper>
							<Swiper slidesPerView={'auto'} centeredSlides={false} spaceBetween={35} modules={[]} className='mySwiper'>
								<SwiperSlide>
									<img src='/images/home/slider3.svg' alt='' />
								</SwiperSlide>
								<SwiperSlide>
									<img src='/images/home/slider3.svg' alt='' />{' '}
								</SwiperSlide>
								<SwiperSlide>
									<img src='/images/home/slider2.svg' alt='' />
								</SwiperSlide>
							</Swiper>
						</div>
					</div>
				</Home2Style>
			</div>
		</div>
	);
};

export default Home2;
