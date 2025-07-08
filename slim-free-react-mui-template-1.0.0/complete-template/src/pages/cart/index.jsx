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
			const response = await axios.get('http://localhost:8000/order/cart/', { headers });
			setCartItems(response.data.items || []);
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

	const handleQuantityChange = (action, item) => {
		const urlMap = {
			increase: 'http://localhost:8000/order/increase/',
			decrease: 'http://localhost:8000/order/decrease/',
		};

		axios
			.post(
				urlMap[action],
				{
					product_type: item.product_type,
					product_id: item.product_id,
				},
				{ headers },
			)
			.then(() => {
				setSnackbarMessage(`Quantity ${action}d`);
				fetchCart();
			})
			.catch((err) => {
				console.error(`${action} error:`, err);
				setSnackbarMessage(`Failed to ${action} quantity`);
			});
	};

	const handleDelete = (item) => {
		axios
			.post(
				'http://localhost:8000/order/remove/',
				{
					product_type: item.product_type,
					product_id: item.product_id,
				},
				{ headers },
			)
			.then(() => {
				setSnackbarMessage('Item removed from cart');
				fetchCart();
			})
			.catch((err) => {
				console.error('Delete error:', err);
				setSnackbarMessage('Failed to remove item');
			});
	};

	const handleBuyNow = (item) => {
		// In production, redirect to actual checkout
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
										Price: ₹{item.price}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										Quantity: {item.quantity}
									</Typography>
								</CardContent>

								<CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
									<Box>
										<IconButton
											color="primary"
											onClick={() => handleQuantityChange('decrease', item)}
										>
											<RemoveIcon />
										</IconButton>
										<IconButton
											color="primary"
											onClick={() => handleQuantityChange('increase', item)}
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

			{/* Snackbar outside loop */}
			<Snackbar open={!!snackbarMessage} message={snackbarMessage} onClose={() => setSnackbarMessage('')} />
		</Container>
	);
}

export default CartPage;
