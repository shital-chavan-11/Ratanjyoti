import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import {
	Box,
	Grid,
	Typography,
	Card,
	CardMedia,
	CardContent,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import mukhi1 from '../../../assets/images/bracelets/bracemain.jpg';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';

import mehndiLeft from '@/assets/images/common/left.png';
import mehndiRight from '@/assets/images/common/left1.png';

function FilterSortBar({ minPrice, maxPrice, onMinPriceChange, onMaxPriceChange, sortOption, onSortChange }) {
	const handleSortChange = (event) => {
		onSortChange(event.target.value);
	};

	return (
		<Container sx={{ my: 4 }}>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
				<Box sx={{ display: 'flex', gap: 2 }}>
					<FormControl size="small">
						<InputLabel>Min Price</InputLabel>
						<Select
							value={minPrice}
							onChange={(e) => onMinPriceChange(e.target.value)}
							label="Min Price"
							sx={{ minWidth: 100 }}
						>
							<MenuItem value="">Any</MenuItem>
							<MenuItem value="100">₹100</MenuItem>
							<MenuItem value="500">₹500</MenuItem>
							<MenuItem value="1000">₹1000</MenuItem>
							<MenuItem value="2000">₹2000</MenuItem>
						</Select>
					</FormControl>

					<FormControl size="small">
						<InputLabel>Max Price</InputLabel>
						<Select
							value={maxPrice}
							onChange={(e) => onMaxPriceChange(e.target.value)}
							label="Max Price"
							sx={{ minWidth: 100 }}
						>
							<MenuItem value="">Any</MenuItem>
							<MenuItem value="500">₹500</MenuItem>
							<MenuItem value="1000">₹1000</MenuItem>
							<MenuItem value="2000">₹2000</MenuItem>
							<MenuItem value="5000">₹5000</MenuItem>
						</Select>
					</FormControl>
				</Box>

				<FormControl size="small" sx={{ minWidth: 200 }}>
					<InputLabel>Sort By</InputLabel>
					<Select value={sortOption} onChange={handleSortChange} label="Sort By">
						<MenuItem value="price-low-high">Price: Low to High</MenuItem>
						<MenuItem value="price-high-low">Price: High to Low</MenuItem>
						<MenuItem value="name-a-z">Name: A to Z</MenuItem>
						<MenuItem value="name-z-a">Name: Z to A</MenuItem>
					</Select>
				</FormControl>
			</Box>
		</Container>
	);
}

function BraceletPage() {
	const [braceletList, setBraceletList] = useState([]);
	const [originalList, setOriginalList] = useState([]);
	const [sortOption, setSortOption] = useState('');
	const [minPrice, setMinPrice] = useState('');
	const [maxPrice, setMaxPrice] = useState('');
	const navigate = useNavigate();
	const [likedItems, setLikedItems] = useState([]);
	const [likedLoading, setLikedLoading] = useState(true);
	const [snackbar, setSnackbar] = useState({ open: false, message: '' });
	const handleLikeClick = async (productId) => {
		try {
			const token = localStorage.getItem('accessToken');

			if (!token) {
				navigate('/pages/login/simple');
				return;
			}

			const decoded = jwtDecode(token);
			if (decoded.exp < Date.now() / 1000) {
				localStorage.removeItem('accessToken');
				navigate('/pages/login/simple');
				return;
			}

			await axios.post(
				'https://ratanjyoti.onrender.com/order/toggle-like/',
				{
					id: productId,
					model: 'bracelet',
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				},
			);

			// Toggle locally for UI feedback
			setLikedItems((prev) =>
				prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
			);

			// ✅ Trigger event so NotificationsButton updates immediately
			window.dispatchEvent(new Event('wishlistUpdated'));
		} catch (error) {
			console.error('Error toggling like:', error);
		}
	};

	const applyFiltersAndSort = () => {
		let filtered = [...originalList];

		const min = parseFloat(minPrice) || 0;
		const max = parseFloat(maxPrice) || Infinity;
		filtered = filtered.filter((item) => item.price >= min && item.price <= max);

		if (sortOption === 'price-low-high') {
			filtered.sort((a, b) => a.price - b.price);
		} else if (sortOption === 'price-high-low') {
			filtered.sort((a, b) => b.price - a.price);
		} else if (sortOption === 'name-a-z') {
			filtered.sort((a, b) => a.name.localeCompare(b.name));
		} else if (sortOption === 'name-z-a') {
			filtered.sort((a, b) => b.name.localeCompare(a.name));
		}

		setBraceletList(filtered);
	};
	useEffect(() => {
		const fetchLikes = async () => {
			try {
				const token = localStorage.getItem('accessToken');
				const response = await axios.get('https://ratanjyoti.onrender.com/order/user/likes/', {
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

	useEffect(() => {
		fetch('http://localhost:8000/product/bracelet/')
			.then((res) => res.json())
			.then((data) => {
				if (data.bracelets) {
					const parsed = data.bracelets.map((b) => ({ ...b, price: parseFloat(b.price) }));
					setBraceletList(parsed);
					setOriginalList(parsed);
				}
			})
			.catch((err) => console.error('Failed to fetch bracelet data', err));
	}, []);

	useEffect(() => {
		applyFiltersAndSort();
	}, [minPrice, maxPrice, sortOption]);

	return (
		<>
			{/* Hero Section */}
			<Box
				sx={{
					backgroundImage: `url(${mukhi1})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					height: 400,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-end',
					pr: 8,
					pl: 2,
				}}
			>
				<Box sx={{ maxWidth: 500, textAlign: 'left' }}>
					<Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
						Bracelets
					</Typography>
					<Typography variant="body1" sx={{ textAlign: 'justify', fontSize: '18px', lineHeight: 1.8 }}>
						Bracelets are believed to influence our lives through the unique energies of natural stones like
						amethyst, citrine, rose quartz, and tiger’s eye. Worn on the wrist, they are often used for
						chakra balancing, stress relief, attracting wealth, enhancing focus, and offering protection
						from negative energies. Amethyst promotes calm and spiritual awareness, citrine brings
						prosperity, rose quartz encourages love and healing, while black tourmaline provides energetic
						protection.
					</Typography>
				</Box>
			</Box>

			{/* Filter & Sort */}
			<FilterSortBar
				minPrice={minPrice}
				maxPrice={maxPrice}
				onMinPriceChange={setMinPrice}
				onMaxPriceChange={setMaxPrice}
				sortOption={sortOption}
				onSortChange={setSortOption}
			/>

			{/* Bracelet Grid */}
			<Container>
				{braceletList.length === 0 ? (
					<Typography variant="h6" align="center" sx={{ mt: 4 }}>
						No items found in this price range.
					</Typography>
				) : (
					<Box sx={{ mt: 4, textAlign: 'center' }}>
						<Box display="flex" alignItems="center" justifyContent="center">
							<Box
								component="img"
								src={mehndiLeft}
								alt="Left Decor"
								sx={{ width: 80, height: 80, mr: 2 }}
							/>
							<Typography variant="h3">Bracelets</Typography>
							<Box
								component="img"
								src={mehndiRight}
								alt="Right Decor"
								sx={{ width: 80, height: 80, ml: 2 }}
							/>
						</Box>

						<Typography variant="h5" mt={2}>
							Empower Your Energy with Healing Gemstones
						</Typography>

						<Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
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
												sx={{
													width: 160,
													height: 160,
													objectFit: 'cover',
													mx: 'auto',
												}}
											/>
											<CardContent>
												<Typography variant="h6">{item.name}</Typography>
												<Typography variant="subtitle1" sx={{ mt: 1 }}>
													₹{item.price}
												</Typography>
												<Box mt={3} display="flex" alignItems="center" justifyContent="center">
													<Button variant="outlined" color="secondary" sx={{ mr: 2 }}>
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
				)}
				<Snackbar
					open={snackbar.open}
					autoHideDuration={3000}
					onClose={() => setSnackbar({ ...snackbar, open: false })}
					message={snackbar.message}
				/>
			</Container>
		</>
	);
}

export default BraceletPage;
