import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';

// Icons
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

function LoggedUser() {
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClose = () => setAnchorEl(null);
	const navigate = useNavigate();

	// Handlers for each icon
	const handleFavoriteClick = () => navigate('pages/login/simple');
	const handleCartClick = () => navigate('/login');
	const handleProfileClick = () => navigate('pages/signup');

	return (
		<Stack direction="row" spacing={3} alignItems="center">
			{/* Favorite Icon */}
			<IconButton color="black" size="small" onClick={handleFavoriteClick}>
				<FavoriteIcon sx={{ color: 'red' }} />
			</IconButton>

			{/* Cart Icon */}
			<IconButton color="black" size="small" onClick={handleCartClick}>
				<ShoppingCartOutlinedIcon />
			</IconButton>

			{/* Profile Icon */}
			<IconButton size="small" onClick={handleProfileClick}>
				<Person2OutlinedIcon />
			</IconButton>

			{/* Optional Menu (if needed later) */}
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				{/* You can add MenuItems if needed */}
			</Menu>
		</Stack>
	);
}

export default LoggedUser;
