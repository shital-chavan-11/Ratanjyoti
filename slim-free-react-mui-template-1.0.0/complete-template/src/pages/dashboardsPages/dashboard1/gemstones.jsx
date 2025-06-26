import { Box, Button, Typography, Stack, CardActionArea } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { Link as RouterLink } from 'react-router-dom';
import Slider from 'react-slick';

import mehndiLeft from '@/assets/images/left.png';
import mehndiRight from '@/assets/images/left1.png';

import bitcoin1 from '@/assets/images/emerald.jpg';
import bitcoin2 from '@/assets/images/sapphire.jpg';
import bitcoin3 from '@/assets/images/rubygem.jpg';
import bitcoin4 from '@/assets/images/products/safar.jpg';

// Products data
const productsData = [
	{ id: 1, name: 'Emerald', productImg: bitcoin1, link: '/secure' },
	{ id: 2, name: 'Yellow Sapphire', productImg: bitcoin2, link: '/secure' },
	{ id: 3, name: 'Ruby', productImg: bitcoin3, link: '/secure' },
	{ id: 4, name: 'Blue Sapphire', productImg: bitcoin4, link: '/secure' },
];

// Purchases data
const PURCHASES_DATA = productsData.map((product) => ({
	id: uuid(),
	product,
}));

// Slider items (with separate names and links)
const SLIDER_ITEMS = [
	{ id: uuid(), name: 'Opal', image: bitcoin1, link: '/opal' },
	{ id: uuid(), name: 'Topaz', image: bitcoin2, link: '/topaz' },
	{ id: uuid(), name: 'Amethyst', image: bitcoin3, link: '/amethyst' },
	{ id: uuid(), name: 'Peridot', image: bitcoin4, link: '/peridot' },
];

// Slider settings
const sliderSettings = {
	infinite: true,
	speed: 4000,
	autoplay: true,
	autoplaySpeed: 0,
	cssEase: 'linear',
	slidesToShow: 3,
	slidesToScroll: 1,
	arrows: false,
	pauseOnHover: false,
};

function Gemstone() {
	return (
		<Box sx={{ p: 3 }}>
			{/* Heading */}
			<Box display="flex" alignItems="center" justifyContent="center" mb={2}>
				<Box component="img" src={mehndiLeft} alt="Mehndi Left" sx={{ width: 80, height: 80, mr: 2 }} />
				<Typography variant="h3">Gemstones</Typography>
				<Box component="img" src={mehndiRight} alt="Mehndi Right" sx={{ width: 80, height: 80, ml: 2 }} />
			</Box>

			<Typography variant="h4" textAlign="center" mb={3}>
				Let the Energy of the Universe Work for You, With Every Stone You Wear.
			</Typography>

			{/* Product Cards */}
			<Stack direction="row" flexWrap="wrap" justifyContent="center" spacing={3}>
				{PURCHASES_DATA.map((item) => (
					<CardActionArea
						key={item.id}
						component={RouterLink}
						to={item.product?.link || '/'}
						sx={{ borderRadius: 2, width: 257, height: 257 }}
					>
						<Box
							sx={{
								position: 'relative',
								width: '100%',
								height: '100%',
								borderRadius: 2,
								overflow: 'hidden',
								boxShadow: 3,
								backgroundImage: `url(${item.product?.productImg})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								display: 'flex',
								alignItems: 'flex-end',
								transition: 'transform 0.4s ease-in-out',
								cursor: 'pointer',
								'&:hover': {
									transform: 'scale(1.08)',
								},
								'@media (hover: none)': {
									'&:active': {
										transform: 'scale(1.08)',
									},
								},
							}}
						>
							<Box
								sx={{
									width: '100%',
									p: 1,
									textAlign: 'center',
									backgroundColor: 'rgba(235, 224, 218, 0.8)',
								}}
							>
								<Typography variant="subtitle2" sx={{ color: 'black' }}>
									{item.product?.name}
								</Typography>
							</Box>
						</Box>
					</CardActionArea>
				))}
			</Stack>

			<Box textAlign="center" mt={4}>
				<RouterLink to="/page" style={{ textDecoration: 'none' }}>
					<Button variant="contained">View All Products</Button>
				</RouterLink>
			</Box>
		</Box>
	);
}

export default Gemstone;
