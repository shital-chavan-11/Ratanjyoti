import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';

const BASE_URL = ' https://ratanjyoti.onrender.com'; // Update in production

function LikesPage() {
	const [likedItems, setLikedItems] = useState([]);
	const navigate = useNavigate();

	const fetchLikes = async () => {
		const token = localStorage.getItem('accessToken');

		if (!token) {
			navigate('/pages/login/simple');
			return;
		}

		try {
			const res = await axios.get(`${BASE_URL}/order/user/likes/`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setLikedItems(res.data.likes || []);
		} catch (err) {
			console.error('Error fetching liked items:', err);
			if (err.response?.status === 401) {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				navigate('/pages/login/simple');
			}
		}
	};

	useEffect(() => {
		fetchLikes();
	}, []);

	const handleBuyNow = (item) => {
		alert(`Buying ${item.name} (${item.type})`);
	};

	const slugify = (text) =>
		text
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)+/g, '');

	return (
		<Box sx={{ p: 4 }}>
			<Typography variant="h4" gutterBottom textAlign="center">
				Liked Products
			</Typography>

			{likedItems.length === 0 ? (
				<Typography variant="body1" textAlign="center">
					No liked items found.
				</Typography>
			) : (
				<Grid container spacing={3}>
					{likedItems.map((item) => (
						<Grid item xs={12} sm={6} md={4} key={`${item.type}-${item.id}`}>
							<Box
								sx={{ cursor: 'pointer' }}
								onClick={() => navigate(`/${item.name.toLowerCase().replace(/\s+/g, '-')}`)}
							>
								<Card sx={{ maxWidth: 345 }}>
									<CardMedia
										component="img"
										height="180"
										image={item.image || '/no-image.jpg'}
										alt={item.name}
									/>
									<CardContent>
										<Typography gutterBottom variant="h6">
											{item.name}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											Type: {item.type}
										</Typography>
										{item.price && (
											<Typography variant="body2" color="text.primary">
												Price: ₹{item.price}
											</Typography>
										)}
										{item.origin && <Typography variant="body2">Origin: {item.origin}</Typography>}
										{item.mukhi && <Typography variant="body2">Mukhi: {item.mukhi}</Typography>}
										{item.material && (
											<Typography variant="body2">Material: {item.material}</Typography>
										)}
										<Typography variant="caption" display="block" mt={1}>
											Liked at: {item.liked_at}
										</Typography>
									</CardContent>
									<Box sx={{ p: 2, pt: 0 }}>
										<Button
											variant="outlined"
											color="secondary"
											fullWidth
											onClick={(e) => {
												e.stopPropagation(); // prevent triggering card navigation
												handleBuyNow(item);
											}}
										>
											Buy Now
										</Button>
									</Box>
								</Card>
							</Box>
						</Grid>
					))}
				</Grid>
			)}
		</Box>
	);
}

export default LikesPage;
