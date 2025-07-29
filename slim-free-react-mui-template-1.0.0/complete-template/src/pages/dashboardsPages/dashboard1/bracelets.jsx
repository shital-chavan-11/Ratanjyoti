import React, { useState, useRef, useEffect } from 'react';
import { Box, CardActionArea, Typography, Button, Dialog, DialogContent } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { v4 as uuid } from 'uuid';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import mehndiLeft from '@/assets/images/common/left.png';
import mehndiRight from '@/assets/images/common/left1.png';

// Images
import brace1 from '../../../assets/images/bracelets/brace1.avif';
import brace2 from '../../../assets/images/bracelets/brace2.webp';
import brace3 from '../../../assets/images/bracelets/brace3.avif';
import brace4 from '../../../assets/images/bracelets/brace4.avif';
import brace5 from '../../../assets/images/bracelets/brace5.avif';

import brace111 from '../../../assets/images/bracelets/brace111.webp';
import brace222 from '../../../assets/images/bracelets/brace222.webp';
import brace333 from '../../../assets/images/bracelets/brace333.webp';
import brace444 from '../../../assets/images/bracelets/brace444.webp';
import brace555 from '../../../assets/images/bracelets/brace555.webp';

const SLIDER_ITEMS = [
	{ id: uuid(), name: 'Dhan Yog Bracelet', image: brace1, hoverImage: brace111, link: '/dhan-yog-bracelet' },
	{ id: uuid(), name: 'Amethyst Bracelet', image: brace2, hoverImage: brace222, link: '/amethyst-bracelet' },
	{
		id: uuid(),
		name: 'Green Aventurine Bracelet',
		image: brace3,
		hoverImage: brace333,
		link: '/green-aventurine-bracelet',
	},
	{ id: uuid(), name: "Cat's Eye Bracelet", image: brace4, hoverImage: brace444, link: "/cat's-eye-bracelet" },
	{ id: uuid(), name: 'Pyrite Bracelet', image: brace5, hoverImage: brace555, link: '/pyrite-bracelet' },
];

function NextArrow({ onClick }) {
	return (
		<div
			role="button"
			tabIndex={0}
			aria-label="Next slide"
			onClick={onClick}
			onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
			style={{
				right: -20,
				top: '50%',
				transform: 'translateY(-50%)',
				zIndex: 2,
				background: 'white',
				border: '2px solid black',
				borderRadius: '50%',
				width: 40,
				height: 40,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				cursor: 'pointer',
				position: 'absolute',
			}}
		>
			<ArrowForwardIosIcon style={{ fontSize: 18 }} />
		</div>
	);
}

function PrevArrow({ onClick }) {
	return (
		<div
			role="button"
			tabIndex={0}
			aria-label="Previous slide"
			onClick={onClick}
			onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
			style={{
				left: -20,
				top: '50%',
				transform: 'translateY(-50%)',
				zIndex: 2,
				background: 'white',
				border: '2px solid black',
				borderRadius: '50%',
				width: 40,
				height: 40,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				cursor: 'pointer',
				position: 'absolute',
			}}
		>
			<ArrowBackIosNewIcon style={{ fontSize: 18 }} />
		</div>
	);
}

const mainSliderSettings = {
	infinite: true,
	speed: 1000,
	autoplay: true,
	autoplaySpeed: 3000,
	cssEase: 'ease-in-out',
	slidesToShow: 3,
	slidesToScroll: 1,
	dots: true,
	arrows: true,
	pauseOnHover: true,
	draggable: true,
	nextArrow: <NextArrow />,
	prevArrow: <PrevArrow />,
	responsive: [
		{
			breakpoint: 1024,
			settings: { slidesToShow: 2 },
		},
		{
			breakpoint: 600,
			settings: { slidesToShow: 1 },
		},
	],
};

const arrowStyle = {
	top: '50%',
	transform: 'translateY(-50%)',
	zIndex: 10,
	background: '#fff',
	border: '2px solid #000',
	borderRadius: '50%',
	width: 40,
	height: 40,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	cursor: 'pointer',
	position: 'absolute',
	boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
};

const modalSliderSettings = {
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: true,
	nextArrow: <NextArrow />,
	prevArrow: <PrevArrow />,
};

function ImageSliderOnly() {
	const [modalOpen, setModalOpen] = useState(false);
	const [modalStartIndex, setModalStartIndex] = useState(0);
	const [hoverIndex, setHoverIndex] = useState(null);
	const sliderRef = useRef();
	const navigate = useNavigate();

	useEffect(() => {
		if (modalOpen && sliderRef.current) {
			sliderRef.current.slickGoTo(modalStartIndex);
		}
	}, [modalOpen, modalStartIndex]);

	const handleImageClick = (item) => {
		navigate(item.link);
	};

	return (
		<Box sx={{ maxWidth: 1100, mx: 'auto', overflow: 'visible', py: 6, position: 'relative' }}>
			{/* Header */}
			<Box display="flex" alignItems="center" justifyContent="center" mb={2}>
				<Box component="img" src={mehndiLeft} alt="Left" sx={{ width: 80, height: 80, mr: 2 }} />
				<Typography variant="h3">Bracelets</Typography>
				<Box component="img" src={mehndiRight} alt="Right" sx={{ width: 80, height: 80, ml: 2 }} />
			</Box>
			<Typography variant="h4" textAlign="center" mb={3}>
				Let the Energy of the Universe Work for You, With Every Stone You Wear.
			</Typography>

			{/* Main Slider */}
			<Slider {...mainSliderSettings}>
				{SLIDER_ITEMS.map((item, index) => (
					<Box key={item.id} sx={{ px: 1 }}>
						<CardActionArea
							onClick={() => handleImageClick(item)}
							onMouseEnter={() => setHoverIndex(index)}
							onMouseLeave={() => setHoverIndex(null)}
							sx={{
								width: 270,
								height: 270,
								borderRadius: 2,
								overflow: 'hidden',
								boxShadow: 3,
								backgroundImage: `url(${hoverIndex === index ? item.hoverImage : item.image})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								display: 'flex',
								alignItems: 'flex-end',
								transition: 'transform 0.3s ease-in-out',
								cursor: 'pointer',
								'&:hover': {
									transform: 'scale(1.05)',
								},
							}}
						>
							<Box
								sx={{
									width: '100%',
									p: 1,
									textAlign: 'center',
									backgroundColor: 'rgba(255, 255, 255, 0.8)',
								}}
							>
								<Typography variant="subtitle2" sx={{ color: 'black' }}>
									{item.name}
								</Typography>
							</Box>
						</CardActionArea>
					</Box>
				))}
			</Slider>

			{/* See More Button */}
			<Box textAlign="center" mt={4}>
				<RouterLink to="/mainbrace" style={{ textDecoration: 'none' }}>
					<Button variant="contained">See More</Button>
				</RouterLink>
			</Box>

			{/* Modal Dialog Slider */}
			<Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="md">
				<DialogContent sx={{ p: 2 }}>
					<Slider {...modalSliderSettings} ref={sliderRef}>
						{SLIDER_ITEMS.map((item) => (
							<Box key={item.id} sx={{ textAlign: 'center' }}>
								<img
									src={item.image}
									alt={item.name}
									style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }}
								/>
								<Typography variant="subtitle1" mt={2}>
									{item.name}
								</Typography>
							</Box>
						))}
					</Slider>
				</DialogContent>
			</Dialog>
		</Box>
	);
}
export default ImageSliderOnly;
