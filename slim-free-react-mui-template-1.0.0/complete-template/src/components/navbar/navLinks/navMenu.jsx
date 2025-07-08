import { useState, useEffect } from 'react';
import { Link as RouterLink, useMatch, useLocation } from 'react-router-dom';
// MUI
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import Popper from '@mui/material/Popper';
// Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { NavItem, NavItemButton } from './navItem';

const MENUITEM_FONTSIZE = 14;

function NavMenu({ minWidth = '100%', menuChildren = [], Icon, title }) {
	const location = useLocation();
	const [anchorEl, setAnchorEl] = useState(null);
	const pathname = location.pathname + location.hash;

	const match = menuChildren.some((item) => pathname.includes(item.href));

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		handlePopoverClose();
	}, [location]);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const open = Boolean(anchorEl);

	return (
		<NavItemButton
			selected={match}
			onClick={handleClick}
			aria-owns={open ? `${title}-popover` : undefined}
			aria-haspopup="true"
			disableRipple
			onMouseEnter={handlePopoverOpen}
			onMouseLeave={handlePopoverClose}
		>
			<NavItem showExpand Icon={Icon} title={title} selected={match} />
			<Popper
				open={open}
				anchorEl={anchorEl}
				placement="bottom-start"
				onClose={handlePopoverClose}
				disablePortal
				sx={{ zIndex: 9999, minWidth }}
				transition
			>
				{({ TransitionProps }) => (
					<Fade {...TransitionProps} timeout={350}>
						<Paper>
							{menuChildren.some((item) => item.image) ? (
								<MenuList sx={{ px: 2, py: 2 }}>
									<Box
										sx={{
											display: 'grid',
											gridTemplateColumns: 'repeat(8, 1fr)',
											gap: 2,
											px: 1,
											py: 1,
										}}
									>
										{menuChildren.map((item, i) => (
											<MenuItem
												key={i}
												component={RouterLink}
												to={item.href}
												sx={{
													display: 'flex',
													flexDirection: 'column',
													alignItems: 'center',
													width: 150,
													textAlign: 'center',
													px: 1,
													py: 1.5,
													borderRadius: 2,
													'&:hover': {
														backgroundColor: '#f9f9f9',
													},
												}}
											>
												{item.image ? (
													<img
														src={item.image}
														alt={item.title}
														style={{
															width: 75,
															height: 75,
															objectFit: 'cover',
															borderRadius: 12,
															marginBottom: 8,
														}}
													/>
												) : null}
												<Typography variant="caption">{item.title}</Typography>
											</MenuItem>
										))}
									</Box>
								</MenuList>
							) : (
								<MenuList
									sx={{
										px: 1,
										'& .MuiMenuItem-root': {
											borderRadius: 2,
										},
									}}
								>
									{menuChildren.map((item, i) => {
										const { href = '', title, type = 'item', menuChildren, Icon } = item;
										const match = useMatch({ path: href });

										switch (type) {
											case 'group':
												return (
													<NavCollapse
														key={i}
														title={title}
														menuChildren={menuChildren}
														Icon={Icon}
													/>
												);
											case 'item':
												return (
													<MenuItem
														key={i}
														component={RouterLink}
														to={href}
														sx={{ fontSize: MENUITEM_FONTSIZE }}
														selected={Boolean(match)}
													>
														{Icon && (
															<ListItemIcon>
																<Icon />
															</ListItemIcon>
														)}
														{title}
													</MenuItem>
												);
											default:
												return (
													<Typography variant="h6" color="error" align="center">
														Menu Items Error
													</Typography>
												);
										}
									})}
								</MenuList>
							)}
						</Paper>
					</Fade>
				)}
			</Popper>
		</NavItemButton>
	);
}

function NavCollapse({ title, menuChildren, Icon, level = 1 }) {
	const { pathname } = useLocation();
	const match = menuChildren.some((el) => pathname.includes(el?.href));
	const [anchorEl, setAnchorEl] = useState(null);

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const open = Boolean(anchorEl);
	return (
		<MenuItem
			sx={{
				fontSize: MENUITEM_FONTSIZE,
			}}
			selected={open || match}
			aria-owns={open ? `${title} popover` : undefined}
			aria-haspopup="true"
			onMouseEnter={handlePopoverOpen}
			onMouseLeave={handlePopoverClose}
		>
			{Icon && (
				<ListItemIcon>
					<Icon />
				</ListItemIcon>
			)}
			<ListItemText
				primary={
					<Typography variant="inherit" align="left">
						{title}
					</Typography>
				}
			/>
			<ExpandMoreIcon fontSize="small" />
			<Popper
				open={open}
				anchorEl={anchorEl}
				placement="right-start"
				keepMounted
				onClose={handlePopoverClose}
				disablePortal
				sx={{
					zIndex: 9999,
				}}
				transition
			>
				{({ TransitionProps }) => (
					<Fade {...TransitionProps} timeout={350}>
						<Paper>
							<MenuList
								sx={{
									px: 1,
								}}
							>
								{menuChildren.map((item, i) => {
									const { href = '', title, type = 'item', menuChildren, Icon } = item;
									const match = useMatch({
										path: href,
									});
									switch (type) {
										case 'group':
											return (
												<NavCollapse
													key={i}
													title={title}
													menuChildren={menuChildren}
													level={level + 1}
													Icon={Icon}
												/>
											);
										case 'item':
											return (
												<MenuItem
													key={i}
													component={RouterLink}
													to={href}
													selected={Boolean(match)}
													sx={{
														fontSize: 'inherit',
													}}
												>
													{Icon && (
														<ListItemIcon>
															<Icon />
														</ListItemIcon>
													)}
													{item.title}
												</MenuItem>
											);
										default:
											return (
												<Typography variant="h6" color="error" align="center">
													Nav Menu Items Error
												</Typography>
											);
									}
								})}
							</MenuList>
						</Paper>
					</Fade>
				)}
			</Popper>
		</MenuItem>
	);
}

export default NavMenu;
