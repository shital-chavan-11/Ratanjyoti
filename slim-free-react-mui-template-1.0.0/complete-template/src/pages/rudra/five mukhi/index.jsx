import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	Grid,
	CircularProgress,
	Container,
	Box,
	Button,
	Alert,
	Dialog,
	DialogContent,
	IconButton,
	Snackbar,
} from '@mui/material';
import axios from 'axios'; // ✅ Add this to fix "axios is not defined"
import { useNavigate } from 'react-router-dom';
import { Close as CloseIcon, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AuraImg from '@/assets/images/common/Aura_Cleansing.webp';
import PositiveImg from '@/assets/images/common/Positive_Energies.webp';
import ProtectionImg from '@/assets/images/common/provides_protection.webp';
import GrowthImg from '@/assets/images/common/spiritual_Growth.webp';

function RudrakshaDetails() {
	const [rudrakshaData, setRudrakshaData] = useState(null);
	const [selectedImage, setSelectedImage] = useState('');
	const [openDialog, setOpenDialog] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [imageIndex, setImageIndex] = useState(0);
	const navigate = useNavigate();
	const [likedItems, setLikedItems] = useState([]);
	const isLiked = (id) => Array.isArray(likedItems) && likedItems.includes(id);
	const [likedLoading, setLikedLoading] = useState(true);
	const [rudrakshaList, setRudrakshaList] = useState([]);
	const [snackbar, setSnackbar] = useState({ open: false, message: '' });
	const handleLikeClick = async (productId) => {
		try {
			const token = localStorage.getItem('accessToken');
			if (!token) {
				navigate('/pages/login/simple');
				return;
			}

			const decoded = jwtDecode(token);
			const isTokenExpired = decoded.exp < Date.now() / 1000;
			if (isTokenExpired) {
				localStorage.removeItem('accessToken');
				navigate('/pages/login/simple');
				return;
			}

			// Make API call to toggle like
			const response = await axios.post(
				' https://ratanjyoti.onrender.com/order/toggle-like/',
				{
					id: productId,
					model: 'rudraksha', // Make this dynamic if needed
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				},
			);

			// Extract and update liked items
			const updatedLikedIds = response.data?.liked_items;
			if (Array.isArray(updatedLikedIds)) {
				setLikedItems((prev) => {
					// Remove previous rudraksha likes, keep other model likes
					const otherModelLikes = rudrakshaList.length
						? prev.filter((id) => !rudrakshaList.some((r) => r.id === id))
						: prev;

					return [...otherModelLikes, ...updatedLikedIds];
				});
			} else {
				console.error('liked_items is not an array:', updatedLikedIds);
			}
			window.dispatchEvent(new Event('wishlistUpdated'));
		} catch (error) {
			console.error('Error toggling like:', error);
		}
	};

	useEffect(() => {
		const fetchLikedItems = async () => {
			try {
				const token = localStorage.getItem('accessToken');
				const response = await axios.get(' https://ratanjyoti.onrender.com/order/user/likes/', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const likedData = response.data.likes || [];
				const likedIds = likedData.map((item) => item.id);
				setLikedItems(likedIds);
			} catch (error) {
				console.error('Failed to fetch liked items:', error);
			} finally {
				setLikedLoading(false);
			}
		};

		fetchLikedItems();
	}, []);

	useEffect(() => {
		fetch(' https://ratanjyoti.onrender.com/product/rudraksha/') // Replace with actual endpoint
			.then((res) => res.json())
			.then((data) => setRudrakshaList(data.rudrakshas))
			.catch((err) => console.error('Failed to fetch collection', err));
	}, []);

	const API_URL = ' https://ratanjyoti.onrender.com/product/rudraksha/Natural  5 Mukhi Rudraksha Savar (Nepali)/';

	useEffect(() => {
		fetch(API_URL)
			.then((response) => {
				if (!response.ok) throw new Error('Rudraksha not found');
				return response.json();
			})
			.then((data) => {
				const rudraksha = data.rudrakshas[0];
				setRudrakshaData(rudraksha);
				setSelectedImage(rudraksha.image1);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return (
			<Container sx={{ textAlign: 'center', marginTop: 5 }}>
				<CircularProgress />
				<Typography mt={2}>Loading Rudraksha...</Typography>
			</Container>
		);
	}

	if (error) {
		return (
			<Container sx={{ textAlign: 'center', marginTop: 5 }}>
				<Alert severity="error">{error}</Alert>
			</Container>
		);
	}
	const iconButtonStyle = {
		position: 'absolute',
		zIndex: 10,
		backgroundColor: '#ffffff',
		color: 'black',
		padding: '4px',
		width: '40px',
		height: '40px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: '50%',
		boxShadow: 2,
		border: '2px solid black',
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: '#f0f0f0',
		},
	};
	const handleAddToCart = async () => {
		const token = localStorage.getItem('accessToken');
		if (!token) {
			navigate('/pages/login/simple');
			return;
		}

		try {
			const decoded = jwtDecode(token);
			if (decoded.exp < Date.now() / 1000) {
				localStorage.removeItem('accessToken');
				navigate('/pages/login/simple');
				return;
			}

			const response = await axios.post(
				' https://ratanjyoti.onrender.com/order/add/',
				{
					product_type: 'Rudraksha',
					product_id: rudrakshaData.id,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			console.log('Added to cart:', response.data.message);
			navigate('/cart');
			setSnackbar({ open: true, message: 'Item added to cart!' });
			window.dispatchEvent(new Event('cart-updated')); // Replace with toast/snackbar if preferred
		} catch (error) {
			console.error('Add to cart error:', error);
			setSnackbar({ open: true, message: 'Failed to add to cart. Please try again.' });
		}
	};

	const images = [
		rudrakshaData.image1,
		rudrakshaData.image2,
		rudrakshaData.image3,
		rudrakshaData.image4, // ✅ add image4 if available
	].filter(Boolean);

	const handleOpenDialog = (index) => {
		setImageIndex(index);
		setSelectedImage(images[index]);
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const handleNextImage = () => {
		const nextIndex = (imageIndex + 1) % images.length;
		setImageIndex(nextIndex);
		setSelectedImage(images[nextIndex]);
	};

	const handlePrevImage = () => {
		const prevIndex = (imageIndex - 1 + images.length) % images.length;
		setImageIndex(prevIndex);
		setSelectedImage(images[prevIndex]);
	};

	const handleSelectImage = (index) => {
		setImageIndex(index);
		setSelectedImage(images[index]);
	};

	return (
		<Container sx={{ marginTop: 5 }}>
			<Card sx={{ p: 3 }}>
				<Grid container spacing={4}>
					{/* Left: Images */}
					<Grid item xs={12} md={6}>
						<Grid container spacing={1}>
							{images.map((img, index) => (
								<Grid item xs={4} key={index}>
									<CardMedia
										component="img"
										image={img}
										alt={`Thumb ${index + 1}`}
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

						{/* Main image */}
						<Box mt={2}>
							<CardMedia
								component="img"
								image={selectedImage}
								alt="Selected"
								onClick={() => handleOpenDialog(imageIndex)}
								sx={{ width: '100%', height: 300, borderRadius: 2, cursor: 'pointer' }}
							/>
						</Box>
					</Grid>

					{/* Right: Info */}
					<Grid item xs={12} md={6}>
						<CardContent>
							<Typography variant="h4" gutterBottom>
								{rudrakshaData.name}
							</Typography>
							<Typography variant="subtitle1" color="text.secondary">
								Origin: {rudrakshaData.origin || 'N/A'}
							</Typography>
							<Typography variant="body1" mt={2}>
								The 5 Mukhi Original Rudraksha holds immense spiritual significance and is revered as a
								powerful symbol of divine energy and inner awakening. Often associated with Lord Shiva,
								this sacred bead embodies purity, clarity, and spiritual enlightenment. With its five
								faces representing the five elements—sky, air, fire, water, and earth—this Rudraksha
								connects to the natural forces that govern the universe. It is considered an ideal
								companion for those seeking peace, protection, and mental clarity, making it an
								essential bead for spiritual and emotional well-being.
								<Typography>Beej Mantra: ॐ ह्रीं नमः</Typography>
							</Typography>

							<Typography variant="h6" color="text.primary" mt={3}>
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
									onClick={(e) => {
										e.stopPropagation();
										handleLikeClick(rudrakshaData.id);
									}}
									sx={{
										mr: 2,
										fontSize: 30,
										cursor: 'pointer',
										'& path': {
											fill: isLiked(rudrakshaData.id) ? 'black' : 'white',
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

			{/* Dialog with enlarged image and navigation */}

			<Dialog
				open={openDialog}
				onClose={handleCloseDialog}
				PaperProps={{
					sx: {
						width: 1000,
						height: 1000,
						maxWidth: 'none',
						margin: 'auto',
						borderRadius: 3,
						position: 'relative',
						overflow: 'hidden',
					},
				}}
			>
				<DialogContent
					sx={{
						background: '#ffffff',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: 4,
						width: '100%',
						height: '100%',
						overflow: 'hidden',
					}}
				>
					{/* Close Button */}
					<IconButton
						onClick={handleCloseDialog}
						sx={{
							...iconButtonStyle,
							top: 16,
							right: 16,
						}}
					>
						<CloseIcon />
					</IconButton>

					{/* Prev Button */}
					<IconButton
						onClick={handlePrevImage}
						sx={{
							...iconButtonStyle,
							left: 20,
							top: '50%',
							transform: 'translateY(-50%)',
						}}
					>
						<ArrowBackIos />
					</IconButton>
					{/* Image */}
					<img
						src={selectedImage}
						alt="Preview"
						style={{
							maxWidth: '90vw',
							maxHeight: '90vh',
							objectFit: 'contain',
						}}
					/>

					{/* Next Button */}
					<IconButton
						onClick={handleNextImage}
						sx={{
							...iconButtonStyle,
							right: 20,
							top: '50%',
							transform: 'translateY(-50%)',
						}}
					>
						<ArrowForwardIos />
					</IconButton>
				</DialogContent>
			</Dialog>
			<Box sx={{ mt: 4, px: 2, mb: 10, textAlign: 'center' }}>
				<Typography variant="h3" sx={{ mb: 6 }} gutterBottom>
					How will a Rudraksha Benefit change your life
				</Typography>

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						flexWrap: 'wrap',
						gap: 4,
						mt: 2,
					}}
				>
					{[{ src: AuraImg }, { src: PositiveImg }, { src: ProtectionImg }, { src: GrowthImg }].map(
						(item, index) => (
							<Card
								key={index}
								sx={{
									width: 240,
									height: 240,
									textAlign: 'center',
									transition: 'transform 0.3s ease',
									'&:hover': {
										transform: 'scale(1.05)',
									},
								}}
								elevation={4}
							>
								<CardContent>
									<Box
										component="img"
										src={item.src}
										alt={item.label}
										sx={{
											width: 180,
											height: 180,
											objectFit: 'cover',
											mb: 1,
											mx: 'auto',
										}}
									/>
									<Typography variant="body2">{item.label}</Typography>
								</CardContent>
							</Card>
						),
					)}
				</Box>
			</Box>
			<Box sx={{ mt: 8, textAlign: 'center' }}>
				<Typography variant="h3" gutterBottom>
					Explore Our Full Rudraksha Collection
				</Typography>

				<Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
					{!likedLoading &&
						rudrakshaList.map((item) => (
							<Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
								<Box
									sx={{ cursor: 'pointer' }}
									onClick={() => navigate(`/${item.name.toLowerCase().replace(/\s+/g, '-')}`)}
								>
									<Card sx={{ p: 2, borderRadius: 4, boxShadow: 3 }}>
										<CardMedia
											component="img"
											image={item.image1}
											alt={item.name}
											sx={{
												width: 160,
												height: 140,
												objectFit: 'cover',
												mx: 'auto',
											}}
										/>
										<CardContent>
											<Typography variant="h6">{item.name}</Typography>
											<Typography variant="body2" color="text.secondary">
												Origin: {item.origin || 'N/A'}
											</Typography>
											<Typography variant="subtitle1" sx={{ mt: 1 }}>
												₹{item.price}
											</Typography>
											<Box mt={3} display="flex" alignItems="center">
												<Button variant="outlined" color="secondary" sx={{ mr: 2 }}>
													Buy Now
												</Button>

												{/* Like Icon */}
												<FavoriteIcon
													onClick={(e) => {
														e.stopPropagation();
														handleLikeClick(item.id);
													}}
													sx={{
														mr: 2,
														fontSize: 30,
														cursor: 'pointer',
														'& path': {
															fill: isLiked(item.id) ? 'black' : 'white',
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
					<Snackbar
						open={snackbar.open}
						autoHideDuration={3000}
						onClose={() => setSnackbar({ ...snackbar, open: false })}
						message={snackbar.message}
					/>
				</Grid>
			</Box>
		</Container>
	);
}

export default RudrakshaDetails;
