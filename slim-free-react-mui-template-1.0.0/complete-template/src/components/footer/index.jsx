import { useState } from 'react';

// MUI
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsappIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
// Assets
import logo from '@/assets/images/logo/png/ratan.png';

function NewsletterForm() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		mobile: '',
		message: '',
	});
	const [success, setSuccess] = useState(false);

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await fetch('https://formspree.io/f/xeokkvwv', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
			},
			body: new FormData(e.target),
		});

		if (res.ok) {
			setSuccess(true);
			setFormData({
				name: '',
				email: '',
				mobile: '',
				message: '',
			});
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<TextField
					label="Name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					fullWidth
					margin="dense"
					size="small"
				/>
				<TextField
					label="Email"
					name="email"
					type="email"
					value={formData.email}
					onChange={handleChange}
					fullWidth
					margin="dense"
					size="small"
				/>
				<TextField
					label="Mobile"
					name="mobile"
					type="tel"
					value={formData.mobile}
					onChange={handleChange}
					fullWidth
					margin="dense"
					size="small"
				/>
				<TextField
					label="Message"
					name="message"
					multiline
					rows={2}
					value={formData.message}
					onChange={handleChange}
					fullWidth
					margin="dense"
					size="small"
				/>
				<Button
					type="submit"
					variant="contained"
					disableElevation
					sx={{ mt: 0.5 }} // reduced top margin from 1 to 0.5
					fullWidth
				>
					Send Message
				</Button>
			</form>

			<Snackbar
				open={success}
				autoHideDuration={5000}
				onClose={() => setSuccess(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert severity="success" onClose={() => setSuccess(false)}>
					Message sent successfully!
				</Alert>
			</Snackbar>
		</>
	);
}

function ContactLink({ Icon, text, href, target, rel }) {
	return (
		<Link
			href={href}
			target={target}
			rel={rel}
			underline="hover"
			sx={{
				display: 'flex',
				alignItems: 'center',
				color: 'text.primary',
				textDecoration: 'none',
				'&:hover': {
					textDecoration: 'underline',
				},
			}}
		>
			<Icon
				color="primary"
				sx={{
					mr: 1.5,
				}}
			/>
			<Typography variant="body1" component="span">
				{text}
			</Typography>
		</Link>
	);
}

function Footer() {
	return (
		<Box bgcolor={(theme) => theme.palette.background.paper} py={3} borderTop={1} borderColor="cuaternary.300">
			<Container maxWidth="lg" component={Stack} direction="column" spacing={5}>
				<Grid container spacing={4} justifyContent="space-between" alignItems="flex-start">
					{/* Logo & Company Links */}
					<Grid item xs={12} sm={6} md={4}>
						<Stack spacing={2} alignItems="flex-start">
							<Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
								<Box
									component="img"
									src={logo}
									alt="slim logo"
									sx={{ width: '100%', mr: 1, height: '200px' }}
								/>
								<Typography
									component="sub"
									variant="caption"
									fontSize={{ xs: '20px', sm: '24px', md: '28px' }}
									color="text.primary"
								>
									Ratanjyoti
								</Typography>
							</Link>

							<Stack direction="row" spacing={1}>
								<Link href="https://www.facebook.com" target="_blank" rel="noreferrer noopener">
									<IconButton aria-label="facebook" color="primary">
										<FacebookIcon />
									</IconButton>
								</Link>
								<Link href="https://twitter.com" target="_blank" rel="noreferrer noopener">
									<IconButton aria-label="twitter" color="primary">
										<TwitterIcon />
									</IconButton>
								</Link>
								<Link href="https://wa.me/+918595403460" target="_blank" rel="noreferrer noopener">
									<IconButton aria-label="whatsapp" color="primary">
										<WhatsappIcon />
									</IconButton>
								</Link>
								<Link
									href="https://instagram.com/ratan.jyotii"
									target="_blank"
									rel="noreferrer noopener"
								>
									<IconButton aria-label="instagram" color="primary">
										<InstagramIcon />
									</IconButton>
								</Link>
							</Stack>

							{/* Company Links */}
							<Stack spacing={1} mt={2}>
								<Typography variant="h6">Company</Typography>
								<Link
									href="/aboutus"
									underline="hover"
									color="text.primary"
								>
									About Us
								</Link>
								{/* <Link href="/our-story" underline="hover" color="text.primary">
									Our Story
								</Link> */}
							</Stack>
						</Stack>
					</Grid>

					{/* Newsletter */}
					<Grid item xs={12} sm={6} md={4} sx={{ mt: { xs: -2, sm: -3 } }}>
						<Stack spacing={2}>
							<Typography variant="h6" my={1}>
								Drop Us Here
							</Typography>
							<NewsletterForm />
						</Stack>
					</Grid>

					{/* Contact + Policies */}
					<Grid item xs={12} sm={6} md={4}>
						<Stack spacing={2}>
							<Typography variant="h6">Contact Us</Typography>
							<Stack spacing={2}>
								<ContactLink
									Icon={LocalPhoneOutlinedIcon}
									text="+918595403460"
									href="tel:+918595403460"
								/>
								<ContactLink
									Icon={EmailOutlinedIcon}
									text="ratanjyoti001@gmail.com"
									href="mailto:ratanjyoti001@gmail.com"
								/>
								<ContactLink
									Icon={LocationOnOutlinedIcon}
									text="S-452, School Block, Laxmi Nagar-110092, Delhi"
									href="https://www.google.com/maps?q=S-452,+School+Block,+Laxmi+Nagar,+Delhi+110092"
									target="_blank"
									rel="noopener noreferrer"
								/>
							</Stack>

							{/* Policies Section */}
							<Stack spacing={1} mt={2}>
								<Typography variant="h6">Policies</Typography>
								<Link
									href="/slim-free-react-mui-template/refund-policy"
									underline="hover"
									color="text.primary"
								>
									Refund Policy
								</Link>
								{/* <Link href="/shipping-policy" underline="hover" color="text.primary">
									Shipping Policy
								</Link>
								<Link href="/privacy-policy" underline="hover" color="text.primary">
									Privacy Policy
								</Link> */}
								<Link
									href="/slim-free-react-mui-template/termsandcondition"
									underline="hover"
									color="text.primary"
								>
									Terms & Conditions
								</Link>
							</Stack>
						</Stack>
					</Grid>
				</Grid>

				<Divider
					variant="middle"
					sx={{
						bgcolor: (theme) => theme.palette.secondary.main,
					}}
				/>

				<Stack direction="column" justifyContent="center" alignItems="center" mt={2}>
					<Typography variant="body1" textAlign="center">
						© RatanJyoti 2025 All Rights Reserved
					</Typography>
				</Stack>
			</Container>
		</Box>
	);
}

export default Footer;
