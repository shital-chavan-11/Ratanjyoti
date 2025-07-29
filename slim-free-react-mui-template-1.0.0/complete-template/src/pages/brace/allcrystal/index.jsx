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
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Close as CloseIcon, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';

function RudrakshaDetails() {
	const navigate = useNavigate();
	const { braceletName } = useParams(); // get dynamic name from URL (optional)

	const [rudrakshaData, setRudrakshaData] = useState(null);
	const [braceletList, setBraceletList] = useState([]);
	const [selectedImage, setSelectedImage] = useState('');
	const [openDialog, setOpenDialog] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [imageIndex, setImageIndex] = useState(0);

	// Fetch specific bracelet
	useEffect(() => {
		const encodedName = encodeURIComponent(braceletName || 'Dhan Yog Bracelet'); // fallback
		const API_URL = `https://ratanjyoti.onrender.com/product/bracelet/${encodedName}/`;

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

	// Fetch all bracelets for list
	useEffect(() => {
		fetch('https://ratanjyoti.onrender.com/product/bracelet/')
			.then((res) => res.json())
			.then((data) => {
				setBraceletList(data.bracelets);
			})
			.catch((err) => {
				console.error('Error loading bracelet list:', err);
			});
	}, []);

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
	const handleNextImage = () => setImageIndex((i) => (i + 1) % images.length);
	const handlePrevImage = () => setImageIndex((i) => (i - 1 + images.length) % images.length);
	const handleSelectImage = (index) => {
		setImageIndex(index);
		setSelectedImage(images[index]);
	};

	return (
		<Container sx={{ marginTop: 5 }}>
			{/* Top: Selected Bracelet Details */}
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
								The Dhanyog Bracelet is a powerful combination of six prosperity-aligned crystals:
								Citrine, Pyrite, Green Aventurine, Green Jade, Quartz, and Tiger Eye. Each of these
								stones is known for attracting abundance, boosting confidence, and supporting emotional
								and financial well-being. It is ideal for those who wish to enhance focus, unlock
								opportunities, and maintain steady energy in their daily lives.
							</Typography>
							<Typography variant="h5" mt={3}>
								Price: ₹{rudrakshaData.price}
							</Typography>

							<Box mt={3} display="flex" alignItems="center">
								<Button variant="contained" color="primary" sx={{ mr: 2 }}>
									Add to Cart
								</Button>
								<Button variant="outlined" color="secondary" sx={{ mr: 2 }} zzz>
									Buy Now
								</Button>
								<IconButton color="error">
									<FavoriteIcon />
								</IconButton>
							</Box>
						</CardContent>
					</Grid>
				</Grid>
			</Card>

			{/* Image Dialog */}
			<Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
				<DialogContent sx={{ position: 'relative', p: 0, background: '#000', textAlign: 'center' }}>
					<IconButton
						onClick={handleCloseDialog}
						sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
					>
						<CloseIcon />
					</IconButton>
					<IconButton
						onClick={handlePrevImage}
						sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }}
					>
						<ArrowBackIos />
					</IconButton>
					<img
						src={selectedImage}
						alt="Preview"
						style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', objectFit: 'contain' }}
					/>
					<IconButton
						onClick={handleNextImage}
						sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}
					>
						<ArrowForwardIos />
					</IconButton>
				</DialogContent>
			</Dialog>

			{/* All Bracelets List */}
			<Box sx={{ py: 6 }}>
				<Typography variant="h4" textAlign="center" gutterBottom>
					Explore More Bracelets
				</Typography>

				<Grid container spacing={4} sx={{ mt: 2 }}>
					{braceletList.map((item) => (
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
										sx={{ width: 160, height: 140, objectFit: 'cover', mx: 'auto' }}
									/>
									<CardContent>
										<Typography variant="h6">{item.name}</Typography>
										<Typography variant="subtitle1" sx={{ mt: 1 }}>
											₹{item.price}
										</Typography>
										<Box mt={3} display="flex" alignItems="center">
											<Button variant="outlined" color="secondary" sx={{ mr: 2 }}>
												Buy Now
											</Button>
											<IconButton color="error">
												<FavoriteIcon />
											</IconButton>
										</Box>
									</CardContent>
								</Card>
							</Box>
						</Grid>
					))}
				</Grid>
			</Box>
		</Container>
	);
}

export default RudrakshaDetails;
