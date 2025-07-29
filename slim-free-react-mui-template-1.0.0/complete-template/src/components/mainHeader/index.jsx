import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Stack, Link } from '@mui/material';
// assets
import logo from '@/assets/images/logo/favicon.svg';

import LoggedUser from './loggedUser';
import SearchBar from './searchBar';

function MainHeader({ onSearch }) {
	return (
		<Box bgcolor="background.paper" component="header" py={1.5} zIndex={1}>
			<Stack
				component={Container}
				maxWidth="lg"
				direction="row"
				height={50}
				justifyContent="space-between"
				alignItems="center"
				flexWrap="wrap"
				spacing={3}
				overflow="hidden"
			>
				<Stack direction="row" alignItems="center" spacing={1}>
					{/* Wrap both logo and text in a Link */}
					<Link
						component={RouterLink}
						to="/" // Change to your desired route
						underline="none"
						display="flex"
						alignItems="center"
					>
						<Box
							component="img"
							width={{
								xs: 65,
								sm: 50,
							}}
							src={logo}
							alt="logo"
							sx={{ mr: 1 }}
						/>
						<Typography
							component="sub"
							variant="caption"
							fontSize={{
								xs: '25px',
								sm: '25px',
								md: '25px',
							}}
							sx={{ mt: 1.5 }}
							color="text.primary"
						>
							Ratanjyoti
						</Typography>
					</Link>
				</Stack>
				<SearchBar onSearch={onSearch} sx={{ mt: 100, ml: 10 }} />
				<LoggedUser />
			</Stack>
		</Box>
	);
}

export default MainHeader;
