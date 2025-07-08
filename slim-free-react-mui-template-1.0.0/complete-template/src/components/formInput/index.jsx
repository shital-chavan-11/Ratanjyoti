import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, CircularProgress, Alert, Container } from '@mui/material';

function RudrakshaDetails() {
	const [rudrakshaData, setRudrakshaData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Replace with your actual API
	const API_URL = 'http://127.0.0.1:8000/product/rudraksha/1-mukhi/';

	useEffect(() => {
		fetch(API_URL)
			.then((response) => {
				if (!response.ok) throw new Error('Rudraksha not found');
				return response.json();
			})
			.then((data) => {
				setRudrakshaData(data.rudrakshas[0]);
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

	return (
		<Container sx={{ marginTop: 5 }}>
			<Card>
				<CardContent>
					<Typography variant="h4" gutterBottom>
						{rudrakshaData.name}
					</Typography>
					<Typography variant="h6" color="text.secondary">
						Price: ₹{rudrakshaData.price}
					</Typography>
				</CardContent>

				<Grid container spacing={2} sx={{ padding: 2 }}>
					{[rudrakshaData.image1, rudrakshaData.image2, rudrakshaData.image3].map((img, index) =>
						img ? (
							<Grid item xs={12} sm={4} key={index}>
								<CardMedia
									component="img"
									height="200"
									image={img}
									alt={`Image ${index + 1}`}
									sx={{ borderRadius: 2 }}
								/>
							</Grid>
						) : null,
					)}
				</Grid>
			</Card>
		</Container>
	);
}

export default RudrakshaDetails;
