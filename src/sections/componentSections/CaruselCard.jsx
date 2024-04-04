import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from '../../components/card';
const Style = styled.div`
	& .swiper-slide {
		margin: 20px 0 35px;
		width: auto;
		img {
			border-radius: 8px;
		}
	}
`;
const CaruselCard = () => {
	const [isClicked, setIsClicked] = useState(false);

	const handleClick = () => {
		setIsClicked(!isClicked);
	};

	const card = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
	return (
		<Style>
			<Swiper slidesPerView={'auto'} centeredSlides={false} spaceBetween={25} modules={[]} className='mySwiper'>
				{card?.map((item, index) => (
					<SwiperSlide key={index}>
						<Card handleClick={handleClick} isClicked={isClicked} />
					</SwiperSlide>
				))}
			</Swiper>
		</Style>
	);
};

export default CaruselCard;
