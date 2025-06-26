import { Outlet, useLocation } from 'react-router-dom';
import withScrollTopFabButton from '@hocs/withScrollTopFabButton';
import WidthPageTransition from '@hocs/widthPageTransition';

import { useSelector } from '@/store';
import { selectThemeConfig } from '@/store/theme/selectors';
// MUI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
// Icons
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import navItems from './navItems';

// Components
import Footer from '@/components/footer';
import MainHeader from '@/components/mainHeader';
import Navbar from '@/components/navbar';
import { useState } from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse, Avatar } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export function Navbarmenu({ navItems, position = 'static' }) {
	const [openGroup, setOpenGroup] = useState(null);

	const handleClick = (id) => {
		setOpenGroup((prev) => (prev === id ? null : id));
	};

	return (
		<Box sx={{ position, backgroundColor: '#fff', borderTop: '1px solid #ddd' }}>
			<List component="nav" sx={{ display: 'flex', px: 2 }}>
				{navItems.map((item) =>
					item.type === 'group' ? (
						<Box key={item.id} sx={{ mx: 1 }}>
							<ListItemButton onClick={() => handleClick(item.id)} sx={{ borderRadius: 1 }}>
								<ListItemIcon>
									<item.Icon />
								</ListItemIcon>
								<ListItemText primary={item.title} />
								{openGroup === item.id ? <ExpandLess /> : <ExpandMore />}
							</ListItemButton>

							<Collapse in={openGroup === item.id} timeout="auto" unmountOnExit>
								<List component="div" disablePadding>
									{item.menuChildren.map((child, index) => (
										<ListItemButton
											key={index}
											component="a"
											href={child.href}
											sx={{
												pl: 4,
												py: 1,
												display: 'flex',
												alignItems: 'center',
												gap: 1.5,
											}}
										>
											<Avatar
												src={child.image}
												alt={child.title}
												sx={{ width: 36, height: 36 }}
											/>
											<ListItemText primary={child.title} />
										</ListItemButton>
									))}
								</List>
							</Collapse>
						</Box>
					) : null,
				)}
			</List>
		</Box>
	);
}

function FabButton() {
	/* <Fab
		size="small"
		aria-label="scroll back to top"
		sx={{ bgcolor: 'primary.light' }}
	>
		<KeyboardArrowUpIcon color="primary" />
	</Fab> */
	return (
		<Fab size="small" aria-label="scroll back to top" color="primary">
			<KeyboardArrowUpIcon />
		</Fab>
	);
}
function MainLayout({ container = 'lg', pb = true }) {
	const location = useLocation();
	const { pageTransitions } = useSelector(selectThemeConfig);

	return (
		<Box display="flex" minHeight="100vh" flexDirection="column">
			<Header />
			<Container
				maxWidth={container}
				component="main"
				sx={{
					flex: '1 0 auto',
					...(pb && {
						pb: 5,
					}),
				}}
			>
				{pageTransitions ? (
					<WidthPageTransition location={location.key}>
						<Outlet />
					</WidthPageTransition>
				) : (
					<Outlet />
				)}
			</Container>
			{withScrollTopFabButton(FabButton)}
			<Footer />
		</Box>
	);
}

function Header() {
	const { stickyHeader } = useSelector(selectThemeConfig);

	return (
		<>
			<MainHeader />
			<Navbar navItems={navItems} position={stickyHeader ? 'sticky' : 'static'} />
		</>
	);
}

export default MainLayout;
