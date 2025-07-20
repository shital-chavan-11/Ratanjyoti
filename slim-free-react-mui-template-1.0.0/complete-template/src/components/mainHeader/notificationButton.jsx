import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

import {
	Typography,
	Tooltip,
	Box,
	Badge,
	IconButton,
	Menu,
	Stack,
	Divider,
	Button,
	Avatar,
	ButtonBase,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavouriteIcon from '@mui/icons-material/FavoriteOutlined';

const BASE_URL = 'https://ratanjyoti.onrender.com'; // Update for production

function NotificationsButton() {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState(null);
	const [likes, setLikes] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [likeCount, setLikeCount] = useState(0);

	const open = Boolean(anchorEl);

	const isTokenValid = (token) => {
		try {
			const decoded = jwtDecode(token);
			return decoded.exp > Math.floor(Date.now() / 1000);
		} catch {
			return false;
		}
	};

	const getAccessToken = () => {
		const access = localStorage.getItem('accessToken');
		return access && isTokenValid(access) ? access : null;
	};

	const handleClick = (event) => {
		const access = getAccessToken();
		if (!access) {
			navigate('/pages/login/simple', { state: { from: '/likes' } });
			return;
		}
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const fetchLikes = async () => {
		const token = getAccessToken();
		if (!token) {
			setIsAuthenticated(false);
			setLikes([]);
			return;
		}

		setIsAuthenticated(true);
		setLoading(true);

		try {
			const res = await axios.get(`${BASE_URL}/order/user/likes/`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const userLikes = res.data.likes || [];
			setLikes(userLikes);
			setLikeCount(userLikes.length);
		} catch (err) {
			console.error('Failed to load likes:', err);
			setIsAuthenticated(false);
			setLikes([]);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchLikes();

		// Listen to custom event when like is added
		window.addEventListener('wishlistUpdated', fetchLikes);

		// Cleanup
		return () => {
			window.removeEventListener('wishlistUpdated', fetchLikes);
		};
	}, []);

	// ✅ Move conditional rendering logic outside JSX
	let content;
	if (loading) {
		content = (
			<Typography variant="body2" color="text.secondary">
				Loading...
			</Typography>
		);
	} else if (likes.length > 0) {
		content = likes
			.slice(0, 5)
			.map((item) => <LikeItem key={`${item.type}-${item.id}`} item={item} onClose={handleClose} />);
	} else {
		content = (
			<Typography variant="body2" color="text.secondary">
				No liked items found.
			</Typography>
		);
	}

	return (
		<>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Stack sx={{ maxWidth: 400, p: 2, pb: 0 }} spacing={2}>
					<Stack direction="row" justifyContent="space-between">
						<Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
							<Typography variant="subtitle1">Wishlist</Typography>
							<Box
								component="span"
								bgcolor="secondary.main"
								borderRadius="20px"
								fontSize={12}
								px={1}
								py={0.5}
								color="secondary.contrastText"
							>
								{likes.length}
							</Box>
						</Stack>

						<IconButton onClick={handleClose} size="small" color="primary" sx={{ border: 1 }}>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					</Stack>

					<Divider sx={{ my: 1 }} />

					<Stack spacing={1} divider={<Divider flexItem />}>
						{content}
					</Stack>

					<Button
						variant="text"
						color="primary"
						size="small"
						fullWidth
						onClick={() => {
							handleClose();
							navigate('/likes');
						}}
					>
						View All Liked Items
					</Button>
				</Stack>
			</Menu>

			<Tooltip title="Wishlist">
				<IconButton onClick={handleClick} size="small">
					<Badge
						color="secondary"
						overlap="rectangular"
						badgeContent={likes.length} // ✅ shows actual number
						invisible={!isAuthenticated || likes.length === 0}
					>
						<FavouriteIcon color="primary" fontSize="small" />
					</Badge>
				</IconButton>
			</Tooltip>
		</>
	);
}

function LikeItem({ item, onClose }) {
	const navigate = useNavigate(); // No redeclaration issue now

	const handleClick = () => {
		// Closes the menu
		if (item?.name) {
			navigate(`/${item.name.toLowerCase().replace(/\s+/g, '-')}`);
		}

		onClose();
	};

	return (
		<ButtonBase
			onClick={handleClick}
			sx={{
				py: 1.5,
				px: 2,
				width: '100%',
				textAlign: 'left',
				borderLeft: 3,
				borderLeftColor: 'primary.main',
				alignItems: 'flex-start',
				'&:hover': {
					bgcolor: (theme) => alpha(theme.palette.primary.light, 0.1),
				},
			}}
		>
			<Stack direction="row" spacing={2} alignItems="center" width="100%">
				<Avatar sx={{ width: 40, height: 40 }}>{item.name?.charAt(0)}</Avatar>
				<Stack spacing={0.5} width="100%" overflow="hidden">
					<Typography variant="body2" fontWeight="bold" noWrap sx={{ width: '100%' }}>
						{item.name}{' '}
						<Typography component="span" variant="caption" color="text.secondary">
							({item.type})
						</Typography>
					</Typography>
					<Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
						<AccessTimeIcon fontSize="inherit" sx={{ mr: 0.5 }} />
						{item.liked_at}
					</Typography>
				</Stack>
			</Stack>
		</ButtonBase>
	);
}

export default NotificationsButton;
