import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import img1 from '../../../assets/images/hero1.jpg';
import img2 from '../../../assets/images/hero2.jpg';
import img3 from '../../../assets/images/hero3.jpg';
import img4 from '../../../assets/images/hero4.jpg';

import './graphsSection.css';

function GraphsSection() {
	const [activeIndex, setActiveIndex] = useState(0);
	const images = [img1, img2, img3, img4];

	return (
		<Stack spacing={3}>
			<Card sx={{ overflow: 'hidden', p: 1 }}>
				<Swiper
					modules={[Navigation, Autoplay]}
					navigation
					autoplay={{ delay: 3000 }}
					loop
					spaceBetween={0}
					slidesPerView={1}
					onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
					style={{ width: '100%', height: '450px' }}
				>
					{images.map((src, index) => (
						<SwiperSlide
							key={index}
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								height: '450px',
							}}
						>
							{/* Framer Motion animation triggered on each new active slide */}
							<motion.div
								key={activeIndex === index ? `active-${index}` : `inactive-${index}`}
								initial={{ scale: 0.95, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ duration: 0.8, ease: 'easeOut' }}
								style={{ width: '100%', height: '100%' }}
							>
								<Box
									component="img"
									src={src}
									alt={`Slide ${index + 1}`}
									sx={{
										width: '100%',
										height: '100%',
										objectFit: 'autofit',
									}}
								/>
							</motion.div>
						</SwiperSlide>
					))}
				</Swiper>
			</Card>
		</Stack>
	);
}

export default GraphsSection;
