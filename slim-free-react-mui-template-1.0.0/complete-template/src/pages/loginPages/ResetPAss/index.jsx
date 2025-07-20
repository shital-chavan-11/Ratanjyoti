import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import LoginIcon from '@mui/icons-material/Login';
import SendIcon from '@mui/icons-material/Send';

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

function ResetPassword() {
	const [email, setEmail] = useState('');
	const [otp, setOtp] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [otpSent, setOtpSent] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: '',
		severity: 'success',
	});
	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbar((prev) => ({ ...prev, open: false }));
	};

	const navigate = useNavigate();

	const handleSendOtp = async () => {
		if (!email) {
			setSnackbar({ open: true, message: 'Please enter your email.', severity: 'warning' });
			return;
		}

		setIsSubmitting(true);
		try {
			const res = await fetch(' https://ratanjyoti.onrender.com/auth/forgot-password/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			});
			const data = await res.json();

			if (res.ok) {
				setSnackbar({ open: true, message: data.message || 'OTP sent to your email.', severity: 'success' });
				setOtpSent(true);
			} else {
				setSnackbar({ open: true, message: data.error || 'Failed to send OTP.', severity: 'error' });
			}
		} catch (err) {
			setSnackbar({ open: true, message: 'Network error. Try again.', severity: 'error' });
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleResetPassword = async (e) => {
		e.preventDefault();

		if (!email || !otp || !newPassword) {
			setSnackbar({ open: true, message: 'All fields are required.', severity: 'warning' });
			return;
		}

		setIsSubmitting(true);
		try {
			const res = await fetch(' https://ratanjyoti.onrender.com/auth/reset-password/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, otp, new_password: newPassword }),
			});
			const data = await res.json();

			if (res.ok) {
				setSnackbar({ open: true, message: data.message || 'Password reset successful!', severity: 'success' });
				setTimeout(() => navigate('/pages/login/simple'), 1500);
			} else {
				setSnackbar({ open: true, message: data.error || 'Failed to reset password.', severity: 'error' });
			}
		} catch (err) {
			setSnackbar({ open: true, message: 'Network error. Try again.', severity: 'error' });
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Container>
			<Card elevation={20} sx={{ my: 8, px: 4, py: 5, maxWidth: 500, mx: 'auto' }}>
				<Stack spacing={3}>
					<Typography variant="h5" fontWeight="bold">
						Reset Password
					</Typography>
					<Stack spacing={2}>
						<TextField
							label="Email"
							fullWidth
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>

						<Button
							variant="outlined"
							endIcon={isSubmitting && !otpSent ? <CircularProgress size={20} /> : <SendIcon />}
							onClick={handleSendOtp}
							disabled={isSubmitting}
						>
							Send OTP
						</Button>

						{otpSent && (
							<form onSubmit={handleResetPassword}>
								<Stack spacing={2}>
									<TextField
										label="OTP"
										fullWidth
										value={otp}
										onChange={(e) => setOtp(e.target.value)}
										required
									/>
									<TextField
										label="New Password"
										type="password"
										fullWidth
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
										required
									/>
									<Button
										sx={{
											textTransform: 'uppercase',
											color: 'primary.contrastText',
											'&:not(:disabled)': {
												background: (theme) =>
													`linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.tertiary.main} 100%)`,
											},
											'&:hover': {
												background: (theme) =>
													`linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.tertiary.dark} 100%)`,
											},
										}}
										type="submit"
										variant="contained"
										fullWidth
										disabled={isSubmitting}
										endIcon={
											isSubmitting ? (
												<CircularProgress color="secondary" size={25} />
											) : (
												<LoginIcon />
											)
										}
									>
										Reset Password
									</Button>
								</Stack>
							</form>
						)}
					</Stack>
				</Stack>
			</Card>

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
		</Container>
	);
}

export default ResetPassword;
