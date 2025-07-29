import React from 'react';
import { Box, Typography } from '@mui/material';
import mehndiLeft from '@/assets/images/common/left.png';
import mehndiRight from '@/assets/images/common/left1.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

// Import videos
import video1 from '../../../assets/images/products/video1.mp4';
import video2 from '../../../assets/images/products/video2.mp4';
import video3 from '../../../assets/images/products/video3.mp4';
import video4 from '../../../assets/images/products/video4.mp4';

const videos = [video1, video2, video3, video4];

function GemstoneVideoSection() {
	return (
		<Box sx={{ p: 3 }}>
			{/* === Heading === */}
			<Box display="flex" alignItems="center" justifyContent="center" mb={2}>
				<Box component="img" src={mehndiLeft} alt="Mehndi Left" sx={{ width: 80, height: 80, mr: 2 }} />
				<Typography variant="h3" textAlign="center">
					Customer Reviews
				</Typography>
				<Box component="img" src={mehndiRight} alt="Mehndi Right" sx={{ width: 80, height: 80, ml: 2 }} />
			</Box>

			<Typography variant="h4" textAlign="center" mb={4}>
				Customers are happy with the quality of our gemstones.
			</Typography>

			{/* === Video Slider === */}
			<Swiper
				modules={[Navigation, Autoplay]}
				spaceBetween={20}
				slidesPerView={1}
				navigation
				loop
				autoplay={{ delay: 3000 }}
				breakpoints={{
					600: { slidesPerView: 1 },
					900: { slidesPerView: 2 },
					1200: { slidesPerView: 3 },
				}}
			>
				{videos.map((vid, index) => (
					<SwiperSlide key={index}>
						<Box
							component="video"
							src={vid}
							controls
							sx={{
								width: '100%',
								height: 250,
								borderRadius: 2,
								boxShadow: 3,
								objectFit: 'cover',
							}}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</Box>
	);
}

export default GemstoneVideoSection;
