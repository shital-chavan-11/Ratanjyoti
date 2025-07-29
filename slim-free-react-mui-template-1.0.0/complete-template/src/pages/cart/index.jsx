import React, { useEffect, useState } from 'react';
import {
	Box,
	Typography,
	Grid,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Button,
	IconButton,
	Container,
	Divider,
	Snackbar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CartPage() {
	const [cartItems, setCartItems] = useState([]);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const navigate = useNavigate();

	const token = localStorage.getItem('accessToken');

	const headers = {
		Authorization: `Bearer ${token}`,
	};

	const fetchCart = async () => {
		try {
			const response = await axios.get('https://ratanjyoti.onrender.com/order/cart/', { headers });
			setCartItems(
				(response.data.items || []).map((item) => ({
					...item,
					selectedVariantId: item.variant_id, // ✅ Fix: map variant_id to selectedVariantId
				})),
			);
		} catch (error) {
			console.error('Error fetching cart:', error);
			setSnackbarMessage('Failed to load cart.');
		}
	};

	useEffect(() => {
		if (!token) {
			navigate('/pages/login/simple');
			return;
		}
		fetchCart();
	}, [navigate]);

	const handleQuantityChange = (action, itemIndex) => {
		const urlMap = {
			increase: 'https://ratanjyoti.onrender.com/order/increase/',
			decrease: 'https://ratanjyoti.onrender.com/order/decrease/',
		};

		const item = cartItems[itemIndex];

		if (!item) {
			console.error('Item not found at index:', itemIndex);
			return;
		}

		axios
			.post(
				urlMap[action],
				{
					product_type: item.product_type,
					product_id: item.product_id,
					variant_id: item.selectedVariantId ?? null, // Important for Gemstones
				},
				{ headers },
			)
			.then(() => {
				setSnackbarMessage(`Quantity ${action}d`);
				const updatedCartItems = [...cartItems];

				if (action === 'increase') {
					updatedCartItems[itemIndex].quantity += 1;
				} else if (action === 'decrease') {
					if (updatedCartItems[itemIndex].quantity > 1) {
						updatedCartItems[itemIndex].quantity -= 1;
					} else {
						updatedCartItems.splice(itemIndex, 1);
					}
				}

				setCartItems(updatedCartItems);
			})
			.catch((err) => {
				console.error(`${action} error:`, err);
				setSnackbarMessage(`Failed to ${action} quantity`);
			});
	};

	const handleDelete = (item) => {
		axios
			.post(
				'https://ratanjyoti.onrender.com/order/remove/',
				{
					product_type: item.product_type,
					product_id: item.product_id,
					variant_id: item.variant_id ?? null, // Also required for Gemstone
				},
				{ headers },
			)
			.then(() => {
				setSnackbarMessage('Item removed successfully');
				fetchCart();
				window.dispatchEvent(new Event('cart-updated'));
			})
			.catch((err) => {
				console.error('Delete error:', err);
				setSnackbarMessage('Failed to remove item');
			});
	};

	const handleBuyNow = (item) => {
		setSnackbarMessage(`Proceeding to buy: ${item.product_name}`);
	};

	return (
		<Container sx={{ mt: 4 }}>
			<Typography variant="h4" gutterBottom>
				Cart Page
			</Typography>

			<Divider sx={{ my: 3 }} />

			<Typography variant="h5" gutterBottom>
				Cart Items
			</Typography>

			{cartItems.length === 0 ? (
				<Typography>No items in cart.</Typography>
			) : (
				<Grid container spacing={3}>
					{cartItems.map((item, index) => (
						<Grid item xs={12} sm={6} md={4} key={`cart-${index}`}>
							<Card>
								<CardMedia
									component="img"
									height="200"
									image={item.image || '/no-image.jpg'}
									alt={item.product_name}
								/>
								<CardContent>
									<Typography variant="h6" noWrap>
										{item.product_name}
									</Typography>

									<Typography variant="body2" color="text.secondary">
										Unit Price: ₹{item.price}
									</Typography>

									{/* Show Carat if Gemstone, otherwise Quantity */}
									{item.product_type === 'Gemstone' ? (
										<>
											<Typography variant="body2" color="text.secondary">
												Carat: {item.carat ?? 'N/A'} ct
											</Typography>
											<Typography variant="body2" color="text.secondary">
												Quantity: {item.quantity}
											</Typography>
										</>
									) : (
										<Typography variant="body2" color="text.secondary">
											Quantity: {item.quantity}
										</Typography>
									)}

									<Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold', mt: 1 }}>
										Total Price: ₹{item.price * item.quantity}
									</Typography>
								</CardContent>

								<CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
									<Box>
										<IconButton
											color="primary"
											onClick={() => handleQuantityChange('decrease', index)}
										>
											<RemoveIcon />
										</IconButton>
										<IconButton
											color="primary"
											onClick={() => handleQuantityChange('increase', index)}
										>
											<AddIcon />
										</IconButton>

										<IconButton color="primary" onClick={() => handleDelete(item)}>
											<DeleteIcon />
										</IconButton>
									</Box>
									<Button
										variant="outlined"
										color="secondary"
										size="small"
										onClick={() => handleBuyNow(item)}
									>
										Buy Now
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			)}

			<Snackbar
				open={!!snackbarMessage}
				message={snackbarMessage}
				onClose={() => setSnackbarMessage('')}
				autoHideDuration={3000}
			/>
		</Container>
	);
}

export default CartPage;
