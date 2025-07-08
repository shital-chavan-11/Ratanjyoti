import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';

import bitcoin1 from '@/assets/images/rudra/sanskrit-mantra-parchment-tulsi-leaves-rudraksha-beads-close-up-handwritten-sanskrit-mantra-parchm.webp';
import bitcoin2 from '@/assets/images/rudra/bunch-indian-fruit-table_347118-6.avif';
import bitcoin3 from '@/assets/images/rudra/tibetan-religious-objects-meditation-alternative-medicine_116441-828.jpg';
import mehndiLeft from '@/assets/images/common/left.png'; // custom mehndi design
import mehndiRight from '@/assets/images/common/left1.png'; // custom mehndi design

import { Link as RouterLink } from 'react-router-dom';

const BITCOIN_CARDS = [
	{
		img: bitcoin1,
		title: '1 -15 Mukhi Rudraksha',
		buttonText: 'Shop Now',
		link: '/main',
	},
	{
		img: bitcoin2,
		title: 'Special Rudraksha',
		buttonText: 'Shop Now',
		link: '/main',
	},
	{
		img: bitcoin3,
		title: 'Rudraksha Malas',
		buttonText: 'Shop Now',
		link: '/1-to-14-mukhi-rudraksha-mala-(siddha-mala)',
	},
];

function BitcoinCard({ img, title, description, buttonText, link }) {
	return (
		<Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
			<CardActionArea
				component={RouterLink}
				to={link}
				sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
			>
				<Stack spacing={3} alignItems="center" textAlign="center" px={2} pt={4} flexGrow={1}>
					<img
						src={img}
						alt={title}
						style={{
							width: '300px', // fixed width
							height: '200px', // fixed height
							objectFit: 'cover', // makes the image fit nicely inside the box
							transition: 'transform 0.3s ease-in-out',
							touchAction: 'manipulation',
							borderRadius: '12px', // optional: adds rounded corners
						}}
						onTouchStart={(e) => {
							e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)';
						}}
						onTouchEnd={(e) => {
							e.currentTarget.style.transform = 'scale(1) translateY(0)';
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.transform = 'scale(1) translateY(0)';
						}}
					/>

					<Box display="flex" alignItems="center" justifyContent="center" gap={1} sx={{ width: '100%' }}>
						<Typography variant="h3">{title}</Typography>
					</Box>

					<Typography variant="body2" color="textSecondary">
						{description}
					</Typography>
				</Stack>
			</CardActionArea>

			<Box px={1} pb={1} pt={1}>
				<Button variant="contained" fullWidth component={RouterLink} to={link}>
					{buttonText}
				</Button>
			</Box>
		</Card>
	);
}

function BitcoinSection() {
	return (
		<section>
			<Stack alignItems="center" spacing={2} mb={4}>
				<Box display="flex" alignItems="center" justifyContent="center">
					<Box component="img" src={mehndiLeft} alt="Mehndi Left" sx={{ width: 80, height: 80, mr: 2 }} />
					<Typography variant="h3">Rudraksha</Typography>
					<Box component="img" src={mehndiRight} alt="Mehndi Right" sx={{ width: 80, height: 80, ml: 2 }} />
				</Box>
			</Stack>

			<Grid container spacing={4}>
				{BITCOIN_CARDS.map((card, index) => (
					<Grid item xs={12} sm={6} md={4} key={index}>
						<BitcoinCard {...card} />
					</Grid>
				))}
			</Grid>
		</section>
	);
}

export default BitcoinSection;
