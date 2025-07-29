import React, { useState } from 'react';
import axios from 'axios';
import {
	IconButton,
	InputAdornment,
	InputBase,
	Grid,
	Card,
	CardContent,
	CardMedia,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close'; // ❗️Import Close Icon
import { useNavigate } from 'react-router-dom';

function SearchBar() {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const BASE_URL = 'https://ratanjyoti.onrender.com/product';

	const getImageUrl = (image) => {
		if (!image) return 'https://via.placeholder.com/150';
		if (image.startsWith('http')) return image;
		return `https://ratanjyoti.onrender.com${image}`;
	};
	const handleSearch = async (value) => {
		setQuery(value);
		if (value.trim() === '') {
			setResults([]);
			return;
		}
		try {
			const { data } = await axios.get(`${BASE_URL}/search/?q=${value}`);
			setResults(data.results || []);
			setError(null);
		} catch (err) {
			console.error('Error fetching results:', err);
			setError('Something went wrong while fetching results.');
			setResults([]);
		}
	};

	const handleChange = (e) => {
		handleSearch(e.target.value);
	};

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setQuery('');
		setResults([]);
		setError(null);
	};

	return (
		<>
			{/* Search Icon to open popup */}
			<Stack direction="column">
				<IconButton onClick={handleOpen} color="primary" sx={{ mt: 1 }}>
					<SearchIcon />
				</IconButton>
			</Stack>

			{/* Search Popup */}
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
				<DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					Search Products
					<IconButton onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>

				<DialogContent>
					<Box
						component="form"
						onSubmit={(e) => {
							e.preventDefault();
							handleSearch(query);
						}}
					>
						<InputBase
							autoFocus
							fullWidth
							placeholder="Search gemstones, rudraksha, bracelets..."
							value={query}
							onChange={handleChange}
							sx={{
								bgcolor: 'background.paper',
								borderRadius: '20px',
								pl: 2,
								py: 0.5,
								border: 2,
								borderColor: 'primary.light',
								fontSize: '13px',
								mb: 2,
							}}
							endAdornment={
								<InputAdornment position="end">
									<IconButton type="submit" sx={{ bgcolor: 'primary.main' }}>
										<SearchIcon sx={{ color: 'primary.contrastText' }} />
									</IconButton>
								</InputAdornment>
							}
						/>
					</Box>

					{/* Error Message */}
					{error && (
						<Typography color="error" mt={2}>
							{error}
						</Typography>
					)}

					{/* Search Results */}
					{Array.isArray(results) && results.length > 0 && (
						<Grid container spacing={2} sx={{ mt: 1 }}>
							{results.map(({ image, name, price, category }, index) => (
								<Grid item xs={12} sm={6} md={4} key={index}>
									<Card
										sx={{ height: '100%', cursor: 'pointer' }}
										onClick={() => {
											handleClose(); // 👈 Close popup before navigation
											navigate(`/${name.toLowerCase().replace(/\s+/g, '-')}`);
										}}
									>
										<CardMedia
											component="img"
											image={getImageUrl(image)}
											alt={name}
											sx={{ height: 200, objectFit: 'cover' }}
										/>
										<CardContent>
											<Typography variant="subtitle1" fontWeight="bold">
												{name}
											</Typography>
											<Typography variant="body2" color="text.secondary">
												₹ {price}
											</Typography>
											<Typography variant="caption" color="text.secondary">
												{category}
											</Typography>
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
}

export default SearchBar;
