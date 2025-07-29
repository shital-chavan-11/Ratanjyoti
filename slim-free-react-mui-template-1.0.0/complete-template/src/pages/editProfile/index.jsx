import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Snackbar, Alert, Typography, CircularProgress, Stack, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
	const [form, setForm] = useState({
		first_name: '',
		last_name: '',
		birth_date: '',
		email: '',
		mobile: '',
	});
	const [originalForm, setOriginalForm] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const navigate = useNavigate();
	const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

	useEffect(() => {
		const token = localStorage.getItem('accessToken');

		// Redirect to login if no token found
		if (!token) {
			navigate('/pages/login/simple');
			return;
		}

		axios
			.get('ratanjyoti.onrender.com/auth/user/edit/', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setForm(res.data);
				setOriginalForm(res.data);
			})
			.catch((err) => {
				setSnackbar({ open: true, message: 'Failed to load profile', severity: 'error' });
				if (err.response?.status === 401) {
					localStorage.removeItem('accessToken');
					localStorage.removeItem('refreshToken');
					navigate('/pages/login/simple');
				}
			})
			.finally(() => setLoading(false));
	}, [navigate]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = () => {
		const token = localStorage.getItem('accessToken');

		axios
			.patch('ratanjyoti.onrender.com/auth/user/edit/', form, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setForm(res.data.user);
				setOriginalForm(res.data.user);
				setIsEditing(false);
				setSnackbar({ open: true, message: res.data.message, severity: 'success' });
			})
			.catch((err) => {
				const msg = err.response?.data?.error || 'Update failed';
				setSnackbar({ open: true, message: msg, severity: 'error' });
			});
	};

	const handleCancel = () => {
		setForm(originalForm);
		setIsEditing(false);
	};

	if (loading) return <CircularProgress sx={{ mt: 10, mx: 'auto', display: 'block' }} />;

	return (
		<Box sx={{ maxWidth: 600, mx: 'auto', my: 6 }}>
			<Paper elevation={3} sx={{ p: 4 }}>
				<Typography variant="h5" gutterBottom align="center">
					Profile
				</Typography>
				<TextField
					fullWidth
					label="First Name"
					name="first_name"
					value={form.first_name}
					onChange={handleChange}
					margin="normal"
					disabled={!isEditing}
				/>
				<TextField
					fullWidth
					label="Last Name"
					name="last_name"
					value={form.last_name}
					onChange={handleChange}
					margin="normal"
					disabled={!isEditing}
				/>
				<TextField
					fullWidth
					label="Birth Date"
					name="birth_date"
					type="date"
					value={form.birth_date}
					onChange={handleChange}
					margin="normal"
					InputLabelProps={{ shrink: true }}
					disabled={!isEditing}
				/>
				<TextField
					fullWidth
					label="Email"
					name="email"
					value={form.email}
					margin="normal"
					InputProps={{ readOnly: true }}
				/>
				<TextField
					fullWidth
					label="Mobile"
					name="mobile"
					value={form.mobile}
					onChange={handleChange}
					margin="normal"
					disabled={!isEditing}
				/>

				<Stack direction="row" spacing={2} sx={{ mt: 3 }} justifyContent="center">
					{isEditing ? (
						<>
							<Button variant="contained" color="primary" onClick={handleSubmit}>
								Save Changes
							</Button>
							<Button variant="outlined" color="secondary" onClick={handleCancel}>
								Cancel
							</Button>
						</>
					) : (
						<Button variant="contained" onClick={() => setIsEditing(true)}>
							Edit Profile
						</Button>
					)}
				</Stack>
			</Paper>

			<Snackbar
				open={snackbar.open}
				autoHideDuration={4000}
				onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
			>
				<Alert severity={snackbar.severity}>{snackbar.message}</Alert>
			</Snackbar>
		</Box>
	);
}

export default Profile;
