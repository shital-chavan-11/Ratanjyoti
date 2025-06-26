import { Container, Box, Typography, Divider } from '@mui/material';
import topImage from '@/assets/images/hero1.jpg';
import leftImage from '@/assets/images/founder.jpg';
import rightImage from '@/assets/images/cofounder.jpg';
import bottomImg1 from '@/assets/images/hero2.jpg';
import bottomImg2 from '@/assets/images/hero3.jpg';
import mehndiLeft from '@/assets/images/left.png';
import mehndiRight from '@/assets/images/left1.png';

export default function StorySection() {
	return (
		<Container sx={{ py: 6 }}>
			{/* First Section */}
			<Box sx={{ width: '100%', overflow: 'hidden', mb: 2 }}>
				<Box display="flex" alignItems="center" justifyContent="center" mb={2}>
					<Box component="img" src={mehndiLeft} alt="Left" sx={{ width: 80, height: 80, mr: 2 }} />
					<Typography variant="h3"> Our Story – From Struggles to Spiritual Light.</Typography>
					<Box component="img" src={mehndiRight} alt="Right" sx={{ width: 80, height: 80, ml: 2 }} />
				</Box>
			</Box>

			<Container sx={{ mt: 4, textAlign: 'center' }}>
				<Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8 }}>
					RatanJyoti is more than a gemstone and Rudraksha brand — it is the soul of a 25-year legacy that
					began with Gurukrupa Jewellers, founded by Shri Suresh Pawar, a man known and respected by many, but
					whose quiet struggles remain untold. With nothing but grit, faith, and sincerity, he built a name
					that stood for trust and truth.
				</Typography>
				<Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8 }}>
					His values live on through his children, Prasad Pawar and Shahili Pawar, who started RatanJyoti to
					carry forward his vision — not just by offering pure and certified gemstones and Rudraksha, but by
					guiding people toward spiritual clarity, peace, and the right path.
				</Typography>
				<Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8 }}>
					Every piece we offer carries a blessing, a purpose, and a part of our story — one that began with a
					father&rsquo;s dream and now continues with a family&rsquo;s devotion to helping others. We are here
					to walk with you on your journey to light, strength, and inner balance — Sahi Ratan... Sahi Rasta.
				</Typography>
			</Container>

			{/* Second Section */}
			<Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={6} mt={10}>
				<Box
					component="img"
					src={leftImage}
					alt="Left"
					sx={{
						width: { xs: '100%', md: '40%' },
						mb: { xs: 2, md: 0 },
						border: '2px solid black', // added black border here
						borderRadius: '8px', // optional, to make it slightly rounded
					}}
				/>
				<Box sx={{ ml: { md: 4 }, textAlign: 'left' }}>
					<Typography variant="h4" mb={3}>
						A Note from Our Founder – Prasad Pawar
					</Typography>
					<Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8 }}>
						At RatanJyoti, our mission is to guide you on the right path with the power of authentic
						gemstones and sacred Rudraksha. Each piece is personally sourced and certified to ensure purity,
						energy, and positive impact in your life. Born out of a deep belief in the healing power of
						nature, this venture is close to my heart. We are not just selling stones—we are delivering
						trust, tradition, and transformation. Thank you for letting us be part of your spiritual
						journey.
					</Typography>
					<Typography variant="h6"> – Prasad Pawar , Founder</Typography>
					<Typography variant="h6">RatanJyoti</Typography>
					<Typography variant="h6">Sahi Ratan... Sahi Rasta...</Typography>
				</Box>
			</Box>

			{/* Third Section */}
			<Box display="flex" flexDirection={{ xs: 'column', md: 'row-reverse' }} alignItems="center" mb={6}>
				<Box
					component="img"
					src={rightImage}
					alt="Right"
					sx={{
						width: { xs: '100%', md: '40%' },
						mb: { xs: 2, md: 0 },
						border: '2px solid black', // added black border here
						borderRadius: '8px', // optional, to make it slightly rounded
					}}
				/>
				<Box sx={{ mr: { md: 4 }, textAlign: 'left' }}>
					<Typography variant="h4" mb={3}>
						A Note from Our Co-Founder – Shahili Pawar
					</Typography>
					<Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8 }}>
						At RatanJyoti, we believe every soul deserves guidance, positivity, and healing. As a woman
						deeply rooted in tradition and spirituality, my vision is to make sacred gemstones and Rudraksha
						accessible, trustworthy, and meaningful for everyone. We ensure that every product carries
						purity, purpose, and peace into your life. Your trust means everything to us, and we are here to
						walk beside you on your spiritual journey. With love, energy, and blessings—thank you for
						choosing RatanJyoti.
					</Typography>
					<Typography variant="h6"> – Shahili Pawar, Co-Founder</Typography>
					<Typography variant="h6">RatanJyoti</Typography>
					<Typography variant="h6">Sahi Ratan... Sahi Rasta...</Typography>
				</Box>
			</Box>

			{/* Divider */}
			<Divider sx={{ borderColor: '#aaa', my: 6 }} />

			{/* <Box display="flex" justifyContent="center" gap={4}>
				<Box component="img" src={bottomImg1} alt="Bottom 1" sx={{ width: 100 }} />
				<Box component="img" src={bottomImg2} alt="Bottom 2" sx={{ width: 100 }} />
			</Box> */}
		</Container>
	);
}
