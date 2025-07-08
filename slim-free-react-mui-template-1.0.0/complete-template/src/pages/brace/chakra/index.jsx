// File: BraceletDetails.jsx or RudrakshaDetails.jsx (Bracelet version)

import React, { useEffect, useState } from 'react';
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	Grid,
	CircularProgress,
	Alert,
	Container,
	Box,
	Button,
	Dialog,
	DialogContent,
	IconButton,
	Snackbar,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Close as CloseIcon, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function BraceletDetails() {
	const navigate = useNavigate();
	const { braceletName } = useParams();

	const [rudrakshaData, setRudrakshaData] = useState(null);
	const [braceletList, setBraceletList] = useState([]);
	const [selectedImage, setSelectedImage] = useState('');
	const [openDialog, setOpenDialog] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [imageIndex, setImageIndex] = useState(0);
	const [likedItems, setLikedItems] = useState([]);
	const [snackbar, setSnackbar] = useState({ open: false, message: '' });

	// Fetch specific bracelet
	useEffect(() => {
		const encodedName = encodeURIComponent(braceletName || '7 Chakra Bracelet');
		const API_URL = `http://localhost:8000/product/bracelet/${encodedName}/`;

		fetch(API_URL)
			.then((res) => {
				if (!res.ok) throw new Error('Bracelet not found');
				return res.json();
			})
			.then((data) => {
				const bracelet = data.bracelets[0];
				setRudrakshaData(bracelet);
				setSelectedImage(bracelet.image1);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, [braceletName]);

	// Fetch all bracelets
	useEffect(() => {
		fetch('http://localhost:8000/product/bracelet/')
			.then((res) => res.json())
			.then((data) => setBraceletList(data.bracelets))
			.catch((err) => console.error('Error loading bracelet list:', err));
	}, []);

	useEffect(() => {
		const fetchLikes = async () => {
			try {
				const token = localStorage.getItem('accessToken');
				const response = await axios.get('http://127.0.0.1:8000/order/user/likes/', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const likes = response.data.likes || [];
				const braceletLikes = likes.filter((like) => like.type === 'bracelet').map((like) => like.id);
				setLikedItems(braceletLikes);
			} catch (err) {
				console.error('Failed to fetch user likes:', err);
			}
		};

		fetchLikes();
	}, []);

	// LIKE FUNCTION
	const handleLikeClick = async (productId) => {
		try {
			const token = localStorage.getItem('accessToken');
			await axios.post(
				'http://127.0.0.1:8000/order/toggle-like/',
				{
					id: productId,
					model: 'bracelet', // ✅ Correct model here
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				},
			);

			// Toggle locally for immediate UI feedback
			setLikedItems((prev) =>
				prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
			);
		} catch (error) {
			console.error('Error toggling like:', error);
		}
	};

	const handleAddToCart = async () => {
		try {
			const token = localStorage.getItem('accessToken');
			if (!token) {
				navigate('/pages/login/simple');
				return null;
			}

			const decoded = jwtDecode(token);
			if (decoded.exp < Date.now() / 1000) {
				localStorage.removeItem('accessToken');
				navigate('/pages/login/simple');
				return null;
			}

			const res = await axios.post(
				'http://127.0.0.1:8000/order/add/',
				{ product_type: 'Bracelet', product_id: rudrakshaData.id },
				{ headers: { Authorization: `Bearer ${token}` } },
			);

			console.log('Added to cart:', res.data.message);
			setSnackbar({ open: true, message: 'Bracelet added to cart!' });
			return true;
		} catch (error) {
			console.error('Cart error:', error);
			setSnackbar({ open: true, message: 'Failed to add to cart' });
			return null;
		}
	};

	if (loading) {
		return (
			<Container sx={{ textAlign: 'center', marginTop: 5 }}>
				<CircularProgress />
				<Typography mt={2}>Loading bracelet...</Typography>
			</Container>
		);
	}

	if (error || !rudrakshaData) {
		return (
			<Container sx={{ textAlign: 'center', marginTop: 5 }}>
				<Alert severity="error">{error || 'Bracelet data unavailable'}</Alert>
			</Container>
		);
	}

	const images = [rudrakshaData.image1, rudrakshaData.image2, rudrakshaData.image3, rudrakshaData.image4].filter(
		Boolean,
	);

	const handleOpenDialog = (index) => {
		setImageIndex(index);
		setSelectedImage(images[index]);
		setOpenDialog(true);
	};
	const handleCloseDialog = () => setOpenDialog(false);
	const handleNextImage = () => setImageIndex((prev) => (prev + 1) % images.length);
	const handlePrevImage = () => setImageIndex((prev) => (prev - 1 + images.length) % images.length);
	const handleSelectImage = (index) => {
		setImageIndex(index);
		setSelectedImage(images[index]);
	};

	return (
		<Container sx={{ marginTop: 5 }}>
			<Card sx={{ p: 3, mb: 4 }}>
				<Grid container spacing={4}>
					<Grid item xs={12} md={6}>
						<Grid container spacing={1}>
							{images.map((img, index) => (
								<Grid item xs={4} key={index}>
									<CardMedia
										component="img"
										image={img}
										height="80"
										onClick={() => handleSelectImage(index)}
										sx={{
											cursor: 'pointer',
											border: selectedImage === img ? '2px solid black' : '1px solid black',
											borderRadius: 2,
										}}
									/>
								</Grid>
							))}
						</Grid>
						<Box mt={2}>
							<CardMedia
								component="img"
								image={selectedImage}
								onClick={() => handleOpenDialog(imageIndex)}
								sx={{ width: '100%', height: 300, borderRadius: 2, cursor: 'pointer' }}
							/>
						</Box>
					</Grid>

					<Grid item xs={12} md={6}>
						<CardContent>
							<Typography variant="h4" gutterBottom>
								{rudrakshaData.name}
							</Typography>
							<Typography variant="body1" mt={2}>
								{/* You can dynamically show description later */}
								The Amethyst crystal bracelet promotes relaxation and balance.
							</Typography>
							<Typography variant="h5" mt={3}>
								Price: ₹{rudrakshaData.price}
							</Typography>
							<Box mt={3} display="flex" alignItems="center" gap={2}>
								<Button variant="contained" color="primary" onClick={handleAddToCart}>
									Add to Cart
								</Button>
								<Button variant="outlined" color="secondary">
									Buy Now
								</Button>
								<FavoriteIcon
									onClick={() => handleLikeClick(rudrakshaData.id)}
									sx={{
										fontSize: 30,
										cursor: 'pointer',
										'& path': {
											fill: likedItems.includes(rudrakshaData.id) ? 'black' : 'white',
											stroke: 'black',
											strokeWidth: 1.5,
										},
									}}
								/>
							</Box>
						</CardContent>
					</Grid>
				</Grid>
			</Card>

			{/* Image Preview Dialog */}
			<Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
				<DialogContent
					sx={{
						position: 'relative',
						p: 0,
						background: '#000',
						textAlign: 'center',
						height: '90vh',
						width: '800px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<IconButton
						onClick={handleCloseDialog}
						sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
					>
						<CloseIcon />
					</IconButton>
					<IconButton
						onClick={handlePrevImage}
						sx={{
							position: 'absolute',
							left: 8,
							top: '50%',
							transform: 'translateY(-50%)',
							color: 'white',
						}}
					>
						<ArrowBackIos />
					</IconButton>
					<img
						src={selectedImage}
						alt="Preview"
						style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
					/>
					<IconButton
						onClick={handleNextImage}
						sx={{
							position: 'absolute',
							right: 8,
							top: '50%',
							transform: 'translateY(-50%)',
							color: 'white',
						}}
					>
						<ArrowForwardIos />
					</IconButton>
				</DialogContent>
			</Dialog>

			{/* Other Bracelets List */}
			<Box sx={{ mt: 6 }}>
				<Typography variant="h4" textAlign="center" gutterBottom>
					Explore More Bracelets
				</Typography>
				<Grid container spacing={4}>
					{braceletList.map((item) => (
						<Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
							<Box
								onClick={() => navigate(`/${item.name.toLowerCase().replace(/\s+/g, '-')}`)}
								sx={{ cursor: 'pointer' }}
							>
								<Card sx={{ p: 2, borderRadius: 4, boxShadow: 3 }}>
									<CardMedia
										component="img"
										image={item.image1}
										alt={item.name}
										sx={{ width: 160, height: 140, objectFit: 'cover', mx: 'auto' }}
									/>
									<CardContent>
										<Typography variant="h6">{item.name}</Typography>
										<Typography variant="subtitle1" sx={{ mt: 1 }}>
											₹{item.price}
										</Typography>
										<Box mt={3} display="flex" alignItems="center" gap={2}>
											<Button variant="outlined" color="secondary">
												Buy Now
											</Button>
											<FavoriteIcon
												onClick={(e) => {
													e.stopPropagation();
													handleLikeClick(item.id);
												}}
												sx={{
													fontSize: 30,
													cursor: 'pointer',
													'& path': {
														fill: likedItems.includes(item.id) ? 'black' : 'white',
														stroke: 'black',
														strokeWidth: 1.5,
													},
												}}
											/>
										</Box>
									</CardContent>
								</Card>
							</Box>
						</Grid>
					))}
				</Grid>
			</Box>

			<Snackbar
				open={snackbar.open}
				autoHideDuration={3000}
				onClose={() => setSnackbar({ ...snackbar, open: false })}
				message={snackbar.message}
			/>
		</Container>
	);
}

export default BraceletDetails;
