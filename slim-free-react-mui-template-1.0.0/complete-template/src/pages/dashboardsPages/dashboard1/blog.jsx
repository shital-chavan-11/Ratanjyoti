import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import mehndiLeft from '@/assets/images/common/left.png';
import mehndiRight from '@/assets/images/common/left1.png';

// Sample blog post data
const blogPosts = [
	{
		title: 'How to Choose the Right Gemstone for You',
		image: '/assets/images/gem_blog1.jpg',
		excerpt: 'Learn how to find a gemstone that aligns with your energy and personality.',
	},
	{
		title: '5 Reasons to Wear Natural Gemstones',
		image: '/assets/images/gem_blog2.jpg',
		excerpt: 'Discover the real benefits of wearing authentic gemstones in daily life.',
	},
	{
		title: 'Caring for Your Gemstones',
		image: '/assets/images/gem_blog3.jpg',
		excerpt: 'Simple tips to keep your gemstone jewelry clean and powerful.',
	},
];

function BlogSection() {
	return (
		<Box sx={{ p: 4 }}>
			<Box display="flex" justifyContent="center" alignItems="center" mb={4}>
				<Box component="img" src={mehndiLeft} alt="Mehndi Left" sx={{ width: 60, height: 60, mr: 2 }} />
				<Typography variant="h3" textAlign="center">
					Blogs & Update
				</Typography>
				<Box component="img" src={mehndiRight} alt="Mehndi Right" sx={{ width: 60, height: 60, ml: 2 }} />
			</Box>

			<Grid container spacing={3}>
				{blogPosts.map((post, index) => (
					<Grid item xs={12} md={4} key={index}>
						<Card sx={{ height: '100%' }}>
							<CardMedia component="img" height="200" image={post.image} alt={post.title} />
							<CardContent>
								<Typography variant="h6" gutterBottom>
									{post.title}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{post.excerpt}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

export default BlogSection;
