import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { alpha } from '@mui/material/styles';

// MUI
import Stack from '@mui/material/Stack';
import ButtonBase from '@mui/material/ButtonBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

// Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import PersonIcon from '@mui/icons-material/Person';

// Components
import NotificationsButton from './notificationButton';
import CartButton from './cartbutton';

function LoggedUser() {
	const [anchorEl, setAnchorEl] = useState(null);
	const navigate = useNavigate();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<UserMenu anchorEl={anchorEl} handleClose={handleClose} />

			<Stack height="100%" direction="row" flex={1} justifyContent="flex-end" alignItems="center" spacing={0}>
				<NotificationsButton />

				<IconButton size="small">
					<Badge color="tertiary" overlap="rectangular">
						<CartButton color="primary" fontSize="small" />
					</Badge>
				</IconButton>

				<ButtonBase
					onClick={handleClick}
					sx={{
						ml: 1,
						height: '100%',
						overflow: 'hidden',
						borderRadius: '25px',
						transition: '.2s',
						px: 1,
						transitionProperty: 'background,color',
						'&:hover': {
							bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
						},
						'&:hover .MuiSvgIcon-root': {
							opacity: '1',
						},
					}}
				>
					<Stack direction="row" alignItems="center" spacing={1}>
						<PersonIcon
							sx={{
								width: 35,
								height: 35,
								color: '#fff',
								backgroundColor: 'primary.main',
								borderRadius: '50%',
								padding: '6px',
							}}
						/>
						<ExpandMoreIcon fontSize="small" />
					</Stack>
				</ButtonBase>
			</Stack>
		</>
	);
}

function UserMenu({ anchorEl, handleClose }) {
	const navigate = useNavigate();

	const handleLogout = async () => {
	try {
		// Just call logout endpoint with credentials
		await axios.post(
			'https://api.ratanjyoti.in/auth/logout/',
			{},
			{ withCredentials: true }
		);

		// Redirect to login (no localStorage token to clear now)
		navigate('/pages/login/simple');
	} catch (error) {
		console.error('Logout failed:', error);
	}
};


	return (
		<Menu
			elevation={26}
			sx={{ '& .MuiMenuItem-root': { mt: 0.5 } }}
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={Boolean(anchorEl)}
			onClose={handleClose}
		>
			<MenuList>
				<MenuItem onClick={handleClose} to="/profile" component={RouterLink}>
					<ListItemIcon>
						<Person2OutlinedIcon fontSize="small" />
					</ListItemIcon>
					Edit Profile
				</MenuItem>

				{/* <MenuItem onClick={handleClose} to="/pages/settings" component={RouterLink}>
					<ListItemIcon>
						<SettingsOutlinedIcon fontSize="small" />
					</ListItemIcon>
					Account Settings
				</MenuItem> */}

				<MenuItem onClick={handleClose} to="/orders" component={RouterLink}>
					<ListItemIcon>
						<PaymentOutlinedIcon fontSize="small" />
					</ListItemIcon>
					Orders
				</MenuItem>

				<Divider sx={{ borderColor: 'primary.light', my: 1 }} />

				<MenuItem onClick={handleLogout}>
					<ListItemIcon>
						<ExitToAppIcon fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</MenuList>
		</Menu>
	);
}

export default LoggedUser;
