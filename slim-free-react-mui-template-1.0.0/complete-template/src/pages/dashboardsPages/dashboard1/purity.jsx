import { Box, Typography, Grid } from '@mui/material';
import mainImage from '../../../assets/images/common/footer-banner-mob.webp';

function PuritySection() {
	return (
		<Box sx={{ px: 4, py: 6 }}>
			{/* Right Side */}

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
		</Box>
	);
}

export default PuritySection;
