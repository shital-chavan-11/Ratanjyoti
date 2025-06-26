import { Box, Typography, Grid } from '@mui/material';
import img1 from '../../../assets/images/logo/logo.png';
import img2 from '../../../assets/images/logo/gis.jpg';
import img3 from '../../../assets/images/logo/igi.webp';
import img4 from '../../../assets/images/logo/GRS-logo.png';
import mainImage from '../../../assets/images/main.png';

function PuritySection() {
	return (
		<Box sx={{ px: 4, py: 6 }}>
			<Grid container spacing={4} alignItems="center">
				{/* Left Side */}
				<Grid item xs={12} md={6}>
					<Typography variant="h1" fontWeight="bold" gutterBottom>
						A Promise of Purity & Authenticity
					</Typography>

					<Box display="flex" gap={3} mt={4} flexWrap="wrap">
						<Box display="flex" gap={2} mt={4} flexWrap="wrap">
							<Box component="img" src={img1} alt="Gem 1" sx={{ width: '22%', borderRadius: 2 }} />
							<Box component="img" src={img2} alt="Gem 2" sx={{ width: '22%', borderRadius: 2 }} />
							<Box component="img" src={img3} alt="Gem 3" sx={{ width: '22%', borderRadius: 2 }} />
							<Box component="img" src={img4} alt="Gem 4" sx={{ width: '22%', borderRadius: 2 }} />
						</Box>
					</Box>
				</Grid>

				{/* Right Side */}
				<Grid item xs={12} md={6}>
					<Box
						component="img"
						src={mainImage}
						alt="Full Side Gemstone"
						sx={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							borderRadius: 2,
						}}
					/>
				</Grid>
			</Grid>
		</Box>
	);
}

export default PuritySection;
