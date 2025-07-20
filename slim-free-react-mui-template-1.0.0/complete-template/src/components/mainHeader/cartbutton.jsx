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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const BASE_URL = 'https://ratanjyoti.onrender.com';

// --------------------------------
// Cart Item Component (Clickable)
// --------------------------------
function CartButton() {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState(null);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

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
		const token = localStorage.getItem('accessToken');
		return token && isTokenValid(token) ? token : null;
	};

	const handleClick = (event) => {
		const token = getAccessToken();
		if (!token) {
			navigate('/pages/login/simple', { state: { from: '/cart' } });
			return;
		}
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const fetchCartCount = async (token) => {
		try {
			const res = await axios.get(`${BASE_URL}/order/count/`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setCartCount(res.data.cart_count || 0);
		} catch (error) {
			console.error('Failed to fetch cart count:', error);
		}
	};

	const fetchCartItems = async (token) => {
		try {
			const res = await axios.get(`${BASE_URL}/order/cart/`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setCartItems(res.data.items?.slice(0, 5) || []);
		} catch (error) {
			console.error('Failed to fetch cart items:', error);
		}
	};

	const fetchCartData = async () => {
		const token = getAccessToken();
		if (!token) {
			setIsAuthenticated(false);
			return;
		}
		setIsAuthenticated(true);
		await Promise.all([fetchCartCount(token), fetchCartItems(token)]);
	};
	useEffect(() => {
		const token = getAccessToken();
		if (!token) {
			setIsAuthenticated(false);
			return undefined; // ✅ make it consistent
		}

		setIsAuthenticated(true);
		fetchCartData();

		// ✅ Listen for global cart update events
		const handleCartUpdated = () => {
			fetchCartData();
		};
		window.addEventListener('cart-updated', handleCartUpdated);

		// ✅ Cleanup
		return () => {
			window.removeEventListener('cart-updated', handleCartUpdated);
		};
	}, []);

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
							<Typography variant="subtitle1">Cart</Typography>
							<Box
								component="span"
								bgcolor="secondary.main"
								borderRadius="20px"
								fontSize={12}
								px={1}
								py={0.5}
								color="secondary.contrastText"
							>
								{cartCount}
							</Box>
						</Stack>
						<IconButton onClick={handleClose} size="small" color="primary" sx={{ border: 1 }}>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					</Stack>

					<Divider sx={{ my: 1 }} />

					<Stack spacing={1} divider={<Divider flexItem />}>
						{cartItems.length > 0 ? (
							cartItems.map((item, idx) => (
								<CartItem
									key={`${item.product_id}-${item.product_type}-${idx}`}
									item={item}
									navigate={navigate}
									onClose={handleClose} // ✅ ✅ ✅ THIS WAS MISSING
								/>
							))
						) : (
							<Typography variant="body2" color="text.secondary">
								Cart is empty
							</Typography>
						)}
					</Stack>

					<Button
						variant="text"
						color="primary"
						size="small"
						fullWidth
						onClick={() => {
							handleClose();
							navigate('/cart');
						}}
					>
						View All Cart Items
					</Button>
				</Stack>
			</Menu>

			<Tooltip title="Cart">
				<IconButton onClick={handleClick} size="small">
					<Badge
						color="secondary"
						badgeContent={isAuthenticated ? cartCount : 0}
						invisible={!isAuthenticated || cartCount === 0}
					>
						<ShoppingCartIcon color="primary" />
					</Badge>
				</IconButton>
			</Tooltip>
		</>
	);
}

// Child component remains unchanged
function CartItem({ item, navigate, onClose }) {
	const handleClick = () => {
		onClose(); // ✅ Closes the dropdown
		navigate(`/${item.product_name.toLowerCase().replace(/\s+/g, '-')}`);
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
				<Avatar sx={{ bgcolor: 'grey.300', color: 'text.primary', fontWeight: 'bold' }}>
					{item.product_name?.charAt(0) || '?'}
				</Avatar>
				<Stack spacing={0.3} flexGrow={1}>
					<Typography variant="subtitle2" fontWeight="bold">
						{item.product_name}
					</Typography>
					<Typography variant="caption" color="text.secondary">
						{item.product_type} &nbsp;|&nbsp; ₹{item.price?.toLocaleString() || 0}
					</Typography>
				</Stack>
			</Stack>
		</ButtonBase>
	);
}

export default CartButton;
