import { Container, Box, Typography, Divider } from '@mui/material';
// import topImage from '@/assets/images/hero1.jpg';
import leftImage from '@/assets/images/common/founder.jpg';
import rightImage from '@/assets/images/common/cofounder.jpg';
// import bottomImg1 from '@/assets/images/hero2.jpg';
// import bottomImg2 from '@/assets/images/hero3.jpg';
import mehndiLeft from '@/assets/images/common/left.png';
import mehndiRight from '@/assets/images/common/left1.png';
import storyImage from '@/assets/images/common/ourstory_image.jpg';

export default function StorySection() {
	return (
		<Container sx={{ py: 8 }}>
			{/* Heading Section */}
			<Box sx={{ width: '100%', mb: 2, textAlign: 'center' }}>
				<Box display="flex" alignItems="center" justifyContent="center" mb={3}>
					<Box component="img" src={mehndiLeft} alt="Left Decor" sx={{ width: 80, height: 80, mr: 2 }} />
					<Typography variant="h3" fontWeight="bold">
						Our Story – From Struggles to Spiritual Light
					</Typography>
					<Box component="img" src={mehndiRight} alt="Right Decor" sx={{ width: 80, height: 80, ml: 2 }} />
				</Box>
			</Box>

			{/* Main Story Paragraphs */}
			<Container sx={{ textAlign: 'center' }}>
				<Box
					component="img"
					src={storyImage}
					alt="Our Story"
					sx={{
						width: '70%',
						maxWidth: 500,
						mt: 3,
						mb: 4,
						borderRadius: 2,
						boxShadow: 3,
					}}
				/>
				<Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8, mb: 2 }}>
					RatanJyoti is more than a gemstone and Rudraksha brand — it is the soul of a 25-year legacy that
					began with Gurukrupa Jewellers, founded by Shri Suresh Pawar, a man known and respected by many, but
					whose quiet struggles remain untold.
				</Typography>
				<Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8, mb: 2 }}>
					His values live on through his children, Prasad Pawar and Shahili Pawar, who started RatanJyoti to
					carry forward his vision — not just by offering pure and certified gemstones and Rudraksha, but by
					guiding people toward spiritual clarity, peace, and the right path.
				</Typography>
				<Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8 }}>
					Every piece we offer carries a blessing, a purpose, and a part of our story — one that began with a
					father&rsquo;s dream and now continues with a family&rsquo;s devotion to helping others. We are here
					to walk with you on your journey to light, strength, and inner balance —{' '}
					<strong>Sahi Ratan... Sahi Rasta.</strong>
				</Typography>
			</Container>

			{/* Founder Section */}
			<Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mt={10} gap={4}>
				<Box
					component="img"
					src={leftImage}
					alt="Founder"
					sx={{
						width: { xs: '100%', md: '40%' },
						border: '2px solid black',
						borderRadius: '8px',
					}}
				/>
				<Box sx={{ textAlign: 'left' }}>
					<Typography variant="h4" mb={3}>
						A Note from Our Founder – Prasad Pawar
					</Typography>
					<Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8, mb: 2 }}>
						At RatanJyoti, our mission is to guide you on the right path with the power of authentic
						gemstones and sacred Rudraksha. Each piece is personally sourced and certified to ensure purity,
						energy, and positive impact in your life. Born out of a deep belief in the healing power of
						nature, this venture is close to my heart.
					</Typography>
					<Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8, mb: 2 }}>
						We are not just selling stones—we are delivering trust, tradition, and transformation. Thank you
						for letting us be part of your spiritual journey.
					</Typography>
					<Typography variant="h6">– Prasad Pawar, Founder</Typography>
					<Typography variant="h6">RatanJyoti</Typography>
					<Typography variant="h6">Sahi Ratan... Sahi Rasta...</Typography>
				</Box>
			</Box>

			{/* Co-Founder Section */}
			<Box display="flex" flexDirection={{ xs: 'column', md: 'row-reverse' }} alignItems="center" mt={8} gap={4}>
				<Box
					component="img"
					src={rightImage}
					alt="Co-Founder"
					sx={{
						width: { xs: '100%', md: '40%' },
						border: '2px solid black',
						borderRadius: '8px',
					}}
				/>
				<Box sx={{ textAlign: 'left' }}>
					<Typography variant="h4" mb={3}>
						A Note from Our Co-Founder – Shahili Pawar
					</Typography>
					<Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8, mb: 2 }}>
						At RatanJyoti, we believe every soul deserves guidance, positivity, and healing. As a woman
						deeply rooted in tradition and spirituality, my vision is to make sacred gemstones and Rudraksha
						accessible, trustworthy, and meaningful for everyone.
					</Typography>
					<Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8, mb: 2 }}>
						We ensure that every product carries purity, purpose, and peace into your life. Your trust means
						everything to us, and we are here to walk beside you on your spiritual journey.
					</Typography>
					<Typography variant="h6">– Shahili Pawar, Co-Founder</Typography>
					<Typography variant="h6">RatanJyoti</Typography>
					<Typography variant="h6">Sahi Ratan... Sahi Rasta...</Typography>
				</Box>
			</Box>

			{/* Decorative Divider or Footer Image Row */}
			{/* <Divider sx={{ borderColor: '#aaa', my: 6 }} />
			<Box display="flex" justifyContent="center" gap={4}>
				<Box component="img" src={bottomImg1} alt="Bottom Decoration 1" sx={{ width: 100, borderRadius: 2 }} />
				<Box component="img" src={bottomImg2} alt="Bottom Decoration 2" sx={{ width: 100, borderRadius: 2 }} />
			</Box> */}
		</Container>
	);
}
