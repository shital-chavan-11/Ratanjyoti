import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Typography,
	TextField,
	Button,
	CircularProgress,
	Card,
	Stack,
	Snackbar,
	Alert,
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import axiosInstance from '../../utils/axiosInstance'; // Adjust path if needed

function OTPVerification() {
	return (
		<Card
			elevation={20}
			sx={{
				display: 'block',
				width: { xs: '95%', sm: '55%', md: '35%', lg: '25%' },
				p: 4,
				mt: 8,
				mx: 'auto',
			}}
		>
			<Stack direction="column" spacing={5}>
				<div>
					<Typography variant="h4" fontWeight="bold" textAlign="center">
						OTP Verification
					</Typography>
					<Typography variant="body2" color="textSecondary" textAlign="center">
						Enter the OTP sent to your registered email.
					</Typography>
				</div>

				<OTPForm />
			</Stack>
		</Card>
	);
}

function OTPForm() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [otp, setOtp] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isResending, setIsResending] = useState(false);
	const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

	const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await axiosInstance.post('/auth/verify-otp/', { email, otp });

			setSnackbar({ open: true, message: 'OTP verified successfully!', severity: 'success' });
			setTimeout(() => navigate('/pages/login/simple'), 1500);
		} catch (error) {
			setSnackbar({
				open: true,
				message: error.response?.data?.error || 'OTP verification failed',
				severity: 'error',
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleResendOTP = async () => {
		if (!email) {
			setSnackbar({ open: true, message: 'Please enter your email first.', severity: 'warning' });
			return;
		}

		setIsResending(true);

		try {
			const response = await axiosInstance.post('/auth/resend-otp/', { email });

			setSnackbar({
				open: true,
				message: response.data.message || 'OTP resent successfully.',
				severity: 'success',
			});
		} catch (err) {
			setSnackbar({
				open: true,
				message: err.response?.data?.error || 'Failed to resend OTP.',
				severity: 'error',
			});
		} finally {
			setIsResending(false);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<Stack spacing={2}>
					<TextField
						name="email"
						type="email"
						label="Email"
						fullWidth
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<TextField
						name="otp"
						type="number"
						label="Enter OTP"
						fullWidth
						required
						value={otp}
						onChange={(e) => setOtp(e.target.value)}
					/>

					<Typography variant="body2" color="text.secondary" textAlign="center">
						This OTP is valid for 10 minutes.
					</Typography>

					<Button
						type="submit"
						variant="contained"
						fullWidth
						disabled={isLoading}
						endIcon={isLoading ? <CircularProgress size={20} /> : <VerifiedIcon />}
						sx={{
							textTransform: 'uppercase',
							color: 'primary.contrastText',
							background: (theme) =>
								`linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
							'&:hover': {
								background: (theme) =>
									`linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
							},
						}}
					>
						Verify
					</Button>

					<Button
						variant="text"
						fullWidth
						disabled={isResending}
						onClick={handleResendOTP}
						sx={{ textTransform: 'none', mt: 1 }}
					>
						{isResending ? 'Resending...' : 'Didn’t receive OTP? Resend'}
					</Button>
				</Stack>
			</form>

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
		</>
	);
}

export default OTPVerification;
