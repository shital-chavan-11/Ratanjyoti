import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const TermsAndConditions = () => {
	return (
		<Container sx={{ py: 5 }}>
			<Typography variant="h3" fontWeight="bold" gutterBottom textAlign="center">
				Terms and Conditions - Ratanjyoti
			</Typography>

			<Typography paragraph>
				This website, https://ratanjyoti.com ("Website"), is owned and operated by Astro Arun Pandit Private
				Limited (hereinafter referred to as "Ratanjyoti" or "the Website" or "the Site" or "we" or "us" or
				"our"). We provide our services to you subject to the following terms & conditions. By accessing,
				browsing, or registering on this Website, you agree to be legally bound by all of the terms and
				conditions stated herein. If you do not agree, please refrain from using our website or services.
			</Typography>

			<Box>
				<Typography variant="h5" fontWeight="bold" gutterBottom>
					1. Electronic Agreement
				</Typography>
				<Typography paragraph>
					This Agreement is an electronic contract that sets out the legally binding terms of your use of the
					Website and your membership in the Service. By using the website, you agree to receive
					communications from us electronically and accept these terms.
				</Typography>
			</Box>

			<Box>
				<Typography variant="h5" fontWeight="bold" gutterBottom>
					2. Privacy
				</Typography>
				<Typography paragraph>
					Use of the Website and/or the Service is also governed by our Privacy Policy. Please read it to
					understand our practices and how we handle your information.
				</Typography>
			</Box>

			<Box>
				<Typography variant="h5" fontWeight="bold" gutterBottom>
					3. Eligibility
				</Typography>
				<Typography paragraph>
					The services are only available to individuals who can form legally binding contracts under Indian
					law. If you are under 18, you are prohibited from using the Website.
				</Typography>
			</Box>

			{/* You can repeat this pattern for remaining clauses */}
			{/* For large content, you can also consider rendering from a markdown or JSON file for better maintainability */}

			<Box mt={4}>
				<Typography>
					Please contact our support team at{' '}
					<a href="mailto:support@ratanjyoti.com">support@ratanjyoti.com</a> for any questions regarding this
					agreement.
				</Typography>
			</Box>

			<Box mt={3}>
				<Typography variant="h6" fontWeight="medium">
					I HAVE READ THIS AGREEMENT AND AGREE TO ALL OF THE PROVISIONS CONTAINED ABOVE.
				</Typography>
			</Box>
		</Container>
	);
};

export default TermsAndConditions;
