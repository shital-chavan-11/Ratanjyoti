import React from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';

function Refund() {
	return (
		<Container maxWidth="md" sx={{ py: 6 }}>
			<Box sx={{ textAlign: 'center', mb: 4 }}>
				<Typography variant="h2" sx={{ fontWeight: 'bold' }}>
					Refund Policy- Ratanjyoti
				</Typography>
				<Divider sx={{ my: 2 }} />
			</Box>

			<Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8, mb: 2 }}>
				Thank you for shopping at <strong>RatanJyoti</strong>. We appreciate your trust in us and strive to
				deliver quality Rudrakshas, Gemstones, and spiritual items. If you are not entirely satisfied with your
				purchase, we&rsquo;re here to help.
			</Typography>

			<Typography variant="h3" sx={{ mt: 4, mb: 1 }}>
				Returns
			</Typography>
			<Typography variant="body1" sx={{ mb: 2, fontSize: '18px', lineHeight: 1.8 }} component="div">
				You have <strong>7 calendar days</strong> to return an item from the date you received it. To be
				eligible for a return:
				<ul>
					<li>The item must be unused and in the same condition that you received it.</li>
					<li>The item must be in the original packaging.</li>
					<li>You must have the receipt or proof of purchase.</li>
				</ul>
			</Typography>

			<Typography variant="h3" sx={{ mt: 4, mb: 1 }}>
				Refunds
			</Typography>
			<Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8, mb: 2 }}>
				Once we receive your item, we will inspect it and notify you that we have received your returned item.
				We will immediately notify you on the status of your refund after inspecting the item.
				<br />
				If your return is approved, we will initiate a refund to your original method of payment. You will
				receive the credit within 7-10 business days, depending on your card issuer&rsquo;s policies.
			</Typography>

			<Typography variant="h3" sx={{ mt: 4, mb: 1 }}>
				Shipping
			</Typography>
			<Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8, mb: 2 }}>
				You will be responsible for paying your own shipping costs for returning your item. Shipping costs are
				non­refundable.
				<br />
				If you receive a refund, the cost of return shipping will be deducted from your refund (if applicable).
			</Typography>

			<Typography variant="h3" sx={{ mt: 4, mb: 1 }}>
				Non-Returnable Items
			</Typography>
			<Typography variant="body1" sx={{ mb: 2, fontSize: '18px', lineHeight: 1.8 }} component="div">
				Certain types of items cannot be returned, such as:
				<ul>
					<li>Customized or personalized products</li>
					<li>Used Rudrakshas or worn gemstones</li>
					<li>Opened spiritual kits</li>
				</ul>
				Please contact our team to check the eligibility before returning any item.
			</Typography>

			<Typography variant="h3" sx={{ mt: 4, mb: 1 }}>
				Damaged or Incorrect Products
			</Typography>
			<Typography variant="body1" sx={{ mb: 2, fontSize: '18px', lineHeight: 1.8 }}>
				If you received a damaged or incorrect product, please notify us within 24 hours of delivery with photos
				and details at <strong>ratanjyotiofficial@gmail.com</strong>. We will assist you promptly with a
				replacement or refund as per the policy.
			</Typography>

			<Typography variant="h3" sx={{ mt: 4, mb: 1 }}>
				Contact Us
			</Typography>
			<Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8, mb: 2 }}>
				If you have any questions on how to return your item to us, contact us at:
				<br />
				📧 <strong>ratanjyoti001@gmail.com</strong>
				<br />
				📞 <strong>+918595403460</strong>
				<br />
				We&rsquo;re here to help you with any issues regarding your order or refund.
			</Typography>
		</Container>
	);
}

export default Refund;
