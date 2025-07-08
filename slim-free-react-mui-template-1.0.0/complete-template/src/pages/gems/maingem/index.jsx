import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import mukhi1 from '../../../assets/images/gemstones/hero_section_banner.svg';
import Emerald from '../../../assets/images/gemstones/Emerald.webp';
import Pearl from '../../../assets/images/gemstones/pearl.webp';
import Opal from '../../../assets/images/gemstones/O.webp';
import Yellowsapphire from '../../../assets/images/gemstones/Yellow_Sapphire.webp';
import Bluesapphire from '../../../assets/images/gemstones/Blue_Sapphire_Neelam_-_Gemsmantra-4015499.webp';
import Ruby from '../../../assets/images/gemstones/rubynew.webp';
import Amethyst from '../../../assets/images/gemstones/Amethyst.webp';
import Redcoral from '../../../assets/images/gemstones/Redcoral.webp';
import Hessonite from '../../../assets/images/gemstones/Hessonite_Gomed.webp';
import cat from '../../../assets/images/gemstones/Cats_Eye_Stone.webp';
import citrine from '../../../assets/images/gemstones/Citrine.webp';
import Iolite from '../../../assets/images/gemstones/Iolite.webp';
import Pita from '../../../assets/images/gemstones/Pitambari.webp';
import zircon from '../../../assets/images/gemstones/Zircon.webp';
import bluezircon from '../../../assets/images/gemstones/bluezircon.png';
import moonstone from '../../../assets/images/gemstones/Moonstone_Stone.webp';
import Amber from '../../../assets/images/gemstones/amber.jpg';
import Redgarnet from '../../../assets/images/gemstones/redgarnet.png';
import Turquoise from '../../../assets/images/gemstones/Turquoise_Stone.webp';
import Whitesapphire from '../../../assets/images/gemstones/whitesapphire.jpg';
import Whitecoral from '../../../assets/images/gemstones/Redcoral.png';

const gemstoneList = [
	{ id: 1, title: 'Blue sapphire (Neelam)', href: '/bluesapphire', image: Bluesapphire },
	{ id: 2, title: "Cat's Eye (Lehsunia)", href: '/lehsuniya', image: cat },
	{ id: 3, title: 'Emerald (Panna)', href: '/emerald', image: Emerald },
	{ id: 4, title: 'Hessonite (Gomed)', href: '/hessonite', image: Hessonite },
	{ id: 5, title: 'Opal', href: '/opal', image: Opal },
	{ id: 6, title: 'Pearl', href: '/pearl', image: Pearl },
	{ id: 7, title: 'Red Coral (Moonga)', href: '/redcoral', image: Redcoral },
	{ id: 8, title: 'Ruby (Manik)', href: '/ruby', image: Ruby },
	{ id: 9, title: 'Yellow Sapphire (Pukhraj)', href: '/yellowsapphire', image: Yellowsapphire },
	{ id: 10, title: 'Amethyst (Katela)', href: '/amethyst', image: Amethyst },
	{ id: 11, title: 'Blue Zircon', href: '/bluezircon', image: bluezircon },
	{ id: 12, title: 'Citrine (Sunela)', href: '/citrinegem', image: citrine },
	{ id: 13, title: 'Iolite (Kaka Nili)', href: '/iolite', image: Iolite },
	{ id: 14, title: 'Pitambari / Neelambari', href: '/pitambari', image: Pita },
	{ id: 15, title: 'White Coral (Moonga)', href: '/whitecoral', image: Whitecoral },
	{ id: 16, title: 'White Sapphire', href: '/whitesapphire', image: Whitesapphire },
	{ id: 17, title: 'White Zircon', href: '/whitezircon', image: zircon },
	{ id: 18, title: 'Moonstone (Blue Sheen)', href: '/moonstone', image: moonstone },
	{ id: 19, title: 'Amber', href: '/amber', image: Amber },
	{ id: 20, title: 'Red Garnet', href: '/redgarnet', image: Redgarnet },
	{ id: 21, title: 'Turquoise (Feroza)', href: '/turquoise', image: Turquoise },
];

function RudrakshaPage() {
	const navigate = useNavigate();

	return (
		<>
			{/* Hero Section */}
			<Box
				sx={{
					backgroundImage: `url(${mukhi1})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					height: 400,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-end',
					pr: 8,
					pl: 2,
				}}
			>
				<Box sx={{ maxWidth: 500, textAlign: 'left' }}>
					<Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
						Gemstones
					</Typography>
					<Typography variant="body1" sx={{ textAlign: 'justify', fontSize: '18px', lineHeight: 1.8 }}>
						Gemstones are worn for various purposes, including astrological, health, spiritual, and
						aesthetic reasons. In astrology, specific gemstones are associated with planets and are believed
						to balance their effects, bringing benefits like confidence (Ruby for Sun), calmness (Pearl for
						Moon), intelligence (Emerald for Mercury), or discipline (Blue Sapphire for Saturn).
					</Typography>
				</Box>
			</Box>

			{/* Gemstone Horizontal Scrollable Row */}
			<Container sx={{ mt: 4 }}>
				<Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }} textAlign="center">
					Gemstones Collection
				</Typography>
				<Box sx={{ backgroundColor: '#f9f9f9', p: 2, borderRadius: 2 }}>
					<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
						{gemstoneList.map((gem) => (
							<Box
								key={gem.id}
								onClick={() => navigate(gem.href)}
								title={gem.title}
								sx={{
									border: '1px solid #ccc',
									borderRadius: 2,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									cursor: 'pointer',
									bgcolor: '#fff',
									boxShadow: 1,
									'&:hover': {
										borderColor: '#000',
									},
									width: '100%',
									aspectRatio: '1 / 1', // Keep square
								}}
							>
								<Box
									component="img"
									src={gem.image}
									alt={gem.title}
									sx={{ width: '80%', height: '80%', objectFit: 'cover' }}
								/>
							</Box>
						))}
					</Box>
				</Box>
			</Container>
		</>
	);
}

export default RudrakshaPage;
