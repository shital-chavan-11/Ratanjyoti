import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// MUI
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
// Icons
import LoginIcon from '@mui/icons-material/Login';

// assets
import logo from '@/assets/images/logo/png/Color_logo_nobg.png';

function SignupPage() {
	return (
		<Card
			elevation={20}
			sx={{
				display: 'block',
				width: {
					xs: '95%',
					sm: '450px ',
					md: '50%',
					lg: '30%',
				},
			}}
			hover={false}
		>
			<Stack direction="column" spacing={3}>
				<Box component="img" src={logo} width="80%" mx="auto" alt="slim logo" />
				<div>
					<Typography variant="h1" fontWeight="light">
						Get Started!
					</Typography>
					<Typography variant="body2" color="textSecondary">
						It&#39;s free to signup and only takes a minute.
					</Typography>
				</div>

				<LoginForm />
				<Typography>
					Already have an account?{' '}
					<Link to="/pages/login" component={RouterLink}>
						Sign In
					</Link>
				</Typography>
			</Stack>
		</Card>
	);
}

function LoginForm() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [formPassword, setFormPassword] = useState('');
	const [level, setLevel] = useState(0);
	const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

	const changePassword = (value) => {
		const temp = strengthIndicator(value);
		setLevel(strengthColor(temp));
	};

	const handleCloseSnackbar = () => {
		setSnackbar({ ...snackbar, open: false });
	};

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		mobile: '',
		birthDate: '',
		password: '',
		confirmPassword: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		const payload = {
			first_name: formData.firstName,
			last_name: formData.lastName,
			birth_date: formData.birthDate,
			email: formData.email,
			mobile: formData.mobile,
			password: formData.password,
			confirm_password: formData.confirmPassword,
		};

		try {
			const response = await fetch('http://127.0.0.1:8000/auth/signup/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify(payload),
			});

			const data = await response.json();

			if (response.ok) {
				setSnackbar({
					open: true,
					message: data.message || 'Signup successful. OTP sent.',
					severity: 'success',
				});
				setTimeout(() => navigate('/pages/otpverification'), 1500);
			} else {
				setSnackbar({
					open: true,
					message: data.error || 'Signup failed.',
					severity: 'error',
				});
			}
		} catch (error) {
			console.error('Signup error:', error);
			setSnackbar({
				open: true,
				message: 'Something went wrong.',
				severity: 'error',
			});
		}
		setIsLoading(false);
	};

	useEffect(() => {
		changePassword('123456');
	}, []);

	return (
		<form onSubmit={handleSubmit}>
			<Grid container spacing={2}>
				{/* First Name & Last Name */}
				<Grid item xs={12} sm={6}>
					<TextField
						label="First Name"
						variant="outlined"
						value={formData.firstName}
						onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						label="Last Name"
						variant="outlined"
						value={formData.lastName}
						onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
						fullWidth
					/>
				</Grid>

				{/* Email */}
				<Grid item xs={12}>
					<TextField
						type="email"
						label="Email"
						variant="outlined"
						value={formData.email}
						onChange={(e) => setFormData({ ...formData, email: e.target.value })}
						fullWidth
					/>
				</Grid>

				{/* Mobile & Birth Date */}
				<Grid item xs={12} sm={6}>
					<TextField
						label="Mobile"
						variant="outlined"
						value={formData.mobile}
						onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						label="Birth Date"
						type="date"
						InputLabelProps={{ shrink: true }}
						variant="outlined"
						value={formData.birthDate}
						onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
						fullWidth
					/>
				</Grid>

				{/* Password & Confirm Password */}
				<Grid item xs={12} sm={6}>
					<TextField
						label="Password"
						type="password"
						variant="outlined"
						value={formPassword}
						onChange={(e) => {
							setFormPassword(e.target.value);
							changePassword(e.target.value);
							setFormData({ ...formData, password: e.target.value });
						}}
						fullWidth
					/>
					<Box mt={1}>
						<Box
							style={{ backgroundColor: level?.color }}
							sx={{ width: 85, height: 8, borderRadius: '7px' }}
						/>
						<Typography variant="body2" color="textSecondary">
							{level?.label}&nbsp;
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						label="Confirm Password"
						type="password"
						variant="outlined"
						value={formData.confirmPassword}
						onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
						fullWidth
					/>
				</Grid>

				{/* Submit */}
				<Grid item xs={12}>
					<Button
						type="submit"
						variant="contained"
						fullWidth
						disabled={isLoading}
						endIcon={isLoading ? <CircularProgress color="secondary" size={25} /> : <LoginIcon />}
					>
						Sign Up
					</Button>
				</Grid>
			</Grid>

			<Snackbar
				open={snackbar.open}
				autoHideDuration={3000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert severity={snackbar.severity} variant="filled" onClose={handleCloseSnackbar}>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</form>
	);
}

export default SignupPage;
