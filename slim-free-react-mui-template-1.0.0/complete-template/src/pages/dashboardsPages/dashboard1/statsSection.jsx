import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import RecyclingOutlinedIcon from '@mui/icons-material/RecyclingOutlined';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const STATS_DATA = [
	{
		id: 1,
		color: 'primary.main',
		name: '100% Natural',
		Icon: SpaOutlinedIcon,
	},
	{
		id: 2,
		color: 'primary.main',
		name: 'Ethically Sourced',
		Icon: RecyclingOutlinedIcon,
	},

	{
		id: 3,
		color: 'primary.main',
		name: 'Guarantee of Purity',
		Icon: GppGoodOutlinedIcon,
	},
	{
		id: 4,
		color: 'primary.main',
		name: 'Free Shipping',
		Icon: LocalShippingOutlinedIcon,
	},
];

function Section({ statData }) {
	const { name, color, Icon } = statData;

	return (
		<Stack p={3} direction="row" spacing={1} alignItems="center">
			<Icon sx={{ fontSize: 60, color }} />
			<Typography
				color={color}
				variant="h6"
				textTransform="uppercase"
				noWrap
				sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
			>
				{name}
			</Typography>
		</Stack>
	);
}

function HorizontalSlider() {
	const sliderText =
		'🌟 Welcome to Our Gemstone Collection! Explore Natural, Certified & Premium Quality Gems at the Best Prices! 🌟';

	return (
		<Box
			sx={{
				width: '100%',
				overflow: 'hidden',
				position: 'relative',
				bgcolor: '#FFFFFF',
				color: 'primary.main',
				py: 1,
				height: '35px',
			}}
		>
			<Box
				sx={{
					display: 'inline-flex',
					whiteSpace: 'nowrap',
					position: 'absolute',
					animation: 'scroll-left 20s linear infinite',
				}}
			>
				{/* Repeat multiple times to avoid empty gaps */}
				{Array.from({ length: 10 }).map((_, idx) => (
					<Typography key={idx} component="span" sx={{ px: 2 }}>
						{sliderText}
					</Typography>
				))}
			</Box>

			<style>
				{`
					@keyframes scroll-left {
						0% {
							transform: translateX(0%);
						}
						100% {
							transform: translateX(-50%);
						}
					}
				`}
			</style>
		</Box>
	);
}
// 📦 Main Export Component
function StatsSection() {
	return (
		<>
			{/* Horizontal Sliding Banner */}
			<HorizontalSlider />

			{/* Stat Grid */}
			<Grid
				container
				sx={{
					borderRadius: 1,
					justifyContent: 'flex-end',
					overflow: 'hidden',
					bgcolor: 'background.paper',
					boxShadow: 26,
					'--Grid-borderWidth': '1px',
					borderTop: 'var(--Grid-borderWidth) solid',
					borderLeft: 'var(--Grid-borderWidth) solid',
					borderColor: 'border',
					'& > div': {
						borderRight: 'var(--Grid-borderWidth) solid',
						borderBottom: 'var(--Grid-borderWidth) solid',
						borderColor: 'border',
					},
				}}
			>
				{STATS_DATA.map((stat) => (
					<Grid item xs={15} sm={9} md={3} key={stat.id}>
						<Section statData={stat} />
					</Grid>
				))}
			</Grid>
		</>
	);
}

export default StatsSection;
