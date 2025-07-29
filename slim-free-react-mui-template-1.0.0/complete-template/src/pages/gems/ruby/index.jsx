import React, { useState } from 'react';
import axios from 'axios';
import {
	Box,
	Button,
	MenuItem,
	Select,
	Typography,
	FormControl,
	InputLabel,
	Dialog,
	DialogContent,
	IconButton,
	Snackbar,
	Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function GemstoneForm() {
	const [name, setName] = useState('');
	const [origin, setOrigin] = useState('');
	const [carat, setCarat] = useState('');
	const [gemstoneData, setGemstoneData] = useState(null);
	const [error, setError] = useState('');
	const [openDialog, setOpenDialog] = useState(false);
	const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

	const handleImageClick = () => setOpenDialog(true);
	const handleCloseDialog = () => setOpenDialog(false);

	const handleSnackbarClose = () => {
		setSnackbar({ ...snackbar, open: false });
	};

	const handleSubmit = async () => {
		try {
			const response = await axios.get('https://ratanjyoti.onrender.com/product/get-gemstone-variant/', {
				params: { name, origin, carat },
			});
			setGemstoneData(response.data);
			setError('');
		} catch (err) {
			setGemstoneData(null);
			if (err.response?.data?.error) {
				setError(err.response.data.error);
			} else {
				setError('Something went wrong.');
			}
		}
	};

	const handleAddToCart = () => {
		setSnackbar({ open: true, message: 'Item added to cart!', severity: 'success' });
	};

	const handleBuyNow = () => {
		setSnackbar({ open: true, message: 'Proceeding to buy now!', severity: 'info' });
	};

	return (
		<>
			<Snackbar
				open={snackbar.open}
				autoHideDuration={3000}
				onClose={handleSnackbarClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
					{snackbar.message}
				</Alert>
			</Snackbar>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'flex-start',
					gap: 4,
					mt: 5,
					px: 2,
					flexWrap: 'wrap',
				}}
			>
				{gemstoneData && (
					<Box sx={{ width: 500, p: 2, boxShadow: 3, borderRadius: 2 }}>
						{gemstoneData.origin_image && (
							<>
								<Box
									sx={{
										width: 300,
										height: 300,
										borderRadius: 2,
										overflow: 'hidden',
										mb: 2,
										cursor: 'pointer',
									}}
									onClick={handleImageClick}
								>
									<img
										src={gemstoneData.origin_image}
										alt={gemstoneData.name}
										style={{
											width: '100%',
											height: '100%',
											objectFit: 'cover',
											borderRadius: '8px',
										}}
									/>
								</Box>

								<Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
									<DialogContent
										sx={{ position: 'relative', p: 0, background: '#000', textAlign: 'center' }}
									>
										<IconButton
											onClick={handleCloseDialog}
											sx={{ position: 'absolute', top: 8, right: 8, color: 'black', zIndex: 1 }}
										>
											<CloseIcon />
										</IconButton>
										<img
											src={gemstoneData.origin_image}
											alt="Enlarged Gemstone"
											style={{ width: '100%', height: 'auto' }}
										/>
									</DialogContent>
								</Dialog>
							</>
						)}

						<Typography variant="subtitle1" gutterBottom>
							Gemstone Details:
						</Typography>
						<Typography>Name: {gemstoneData.name}</Typography>
						<Typography>Origin: {gemstoneData.origin}</Typography>
						<Typography>Carat: {gemstoneData.carat}</Typography>
						<Typography>Price: ₹{gemstoneData.price}</Typography>

						<Box mt={3} display="flex" gap={2}>
							<Button variant="outlined" color="primary" onClick={handleAddToCart}>
								Add to Cart
							</Button>
							<Button variant="contained" color="secondary" onClick={handleBuyNow}>
								Buy Now
							</Button>
						</Box>
					</Box>
				)}

				<Box sx={{ maxWidth: 500, width: '100%', p: 3, boxShadow: 3, borderRadius: 2 }}>
					<Typography variant="h6" gutterBottom>
						Find Your Gemstone
					</Typography>

					<FormControl fullWidth margin="normal">
						<InputLabel id="gemstone-label">Gemstone</InputLabel>
						<Select
							labelId="gemstone-label"
							value={name}
							label="Gemstone"
							onChange={(e) => setName(e.target.value)}
						>
							<MenuItem value="Ruby (Manik)">Ruby (Manik)</MenuItem>
						</Select>
					</FormControl>

					<FormControl fullWidth margin="normal">
						<InputLabel id="origin-label">Origin</InputLabel>
						<Select
							labelId="origin-label"
							value={origin}
							label="Origin"
							onChange={(e) => setOrigin(e.target.value)}
						>
							<MenuItem value="Africa">Africa</MenuItem>
							<MenuItem value="Myanmmar (Burma)">Myanmmar (Burma)</MenuItem>
						</Select>
					</FormControl>
					<FormControl fullWidth margin="normal">
						<InputLabel id="carat-label">Carat</InputLabel>
						<Select
							labelId="carat-label"
							value={carat}
							label="Carat"
							onChange={(e) => setCarat(e.target.value)}
						>
							{Array.from({ length: (10 - 3) * 2 + 1 }, (_, i) => {
								const value = (3 + i * 0.5).toFixed(1);
								return (
									<MenuItem key={value} value={value}>
										{value}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>

					<Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
						Get Gemstone
					</Button>

					{error && (
						<Typography color="error" mt={2}>
							{error}
						</Typography>
					)}
				</Box>
			</Box>
		</>
	);
}

export default GemstoneForm;
