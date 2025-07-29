import getPalette from './palette';
import typography from './typography';
import { alpha } from '@mui/material/styles';

const getComponentStyleOverride = (mode) => {
	const palette = getPalette(mode);

	return {
		MuiButton: {
			styleOverrides: {
				root: {
					'&.MuiButton-containedPrimary:not(:disabled)': {
						backgroundColor: palette.primary.light,
						'&:hover': {
							backgroundColor: palette.primary.main,
						},
					},
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				elevation: {
					backgroundImage: 'none',
				},
			},
			defaultProps: {
				elevation: 26,
				variant: 'outlinedElevation',
			},
			variants: [
				{
					props: { variant: 'outlinedElevation' },
					style: ({ ownerState, theme }) => ({
						boxShadow: theme.shadows[ownerState.elevation],
						border: `1px solid ${palette.border}`,
					}),
				},
			],
		},
		MuiCard: {
			variants: [
				{ props: { type: 'none' }, style: { padding: 0 } },
				{
					props: { type: 'card' },
					style: {
						padding: 25,
						'@media (max-width: 600px)': {
							padding: '5%',
						},
					},
				},
				{
					props: { type: 'section' },
					style: {
						paddingTop: 40,
						paddingBottom: 40,
						paddingLeft: 30,
						paddingRight: 30,
						'@media (max-width: 600px)': {
							padding: '5%',
						},
					},
				},
				{
					props: { hover: 'light' },
					style: {
						'&:hover': {
							boxShadow: '0px 10px 20px -10px #0005',
						},
					},
				},
				{
					props: { hover: 'color' },
					style: {
						'&:hover': {
							boxShadow: `0px 10px 20px -15px ${palette.primary.main}`,
						},
					},
				},
			],
			defaultProps: {
				hover: 'light',
				type: 'card',
				variant: 'outlinedElevation',
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					color: palette.text.secondary,
					borderRadius: '3px',
					'&.Mui-selected': {
						color: palette.primary.contrastText,
						backgroundColor: palette.primary.light,
						'&>.MuiListItemIcon-root': {
							color: palette.primary.contrastText,
						},
						'&:hover': {
							backgroundColor: palette.primary.dark,
							color: palette.primary.contrastText,
						},
					},
					'&:hover': {
						backgroundColor: alpha(palette.primary.light, 0.2),
						color: mode === 'dark' ? palette.primary.contrastText : palette.primary.main,
						'&>.MuiListItemIcon-root': {
							color: palette.primary.main,
						},
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: ({ ownerState }) => ({
					'&:hover': {
						backgroundColor: mode === 'dark' ? '#eee1' : '#eee8',
					},
					'&:not(.Mui-error).Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: palette?.[ownerState?.color]?.main || palette.primary.main,
					},
					'&:not(.Mui-error):hover .MuiOutlinedInput-notchedOutline': {
						borderColor: palette?.[ownerState?.color]?.main || palette.primary.main,
					},
				}),
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					'&.Mui-disabled, &.Mui-readOnly': {
						pointerEvents: 'none',
					},
				},
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					backgroundColor: palette.background.default,
					'& .MuiTableCell-head': {
						...typography?.h5,
						textTransform: 'uppercase',
						borderTop: `1px solid ${palette.border}`,
						borderBottom: `1px solid ${palette.border}`,
					},
				},
			},
		},
		MuiTableRow: {
			styleOverrides: {
				root: {
					'&.MuiTableRow-hover:hover': {
						backgroundColor: alpha(palette.background.default, 0.4),
					},
				},
			},
		},
		MuiRadio: {
			styleOverrides: {
				root: {
					'& .MuiSvgIcon-root': {
						fontSize: 35,
					},
				},
			},
		},
		MuiLink: {
			styleOverrides: {
				root: {
					color: palette.primary.light,
				},
			},
		},
		MuiAlert: {
			styleOverrides: {
				outlined: {
					backgroundColor: palette.background.paper,
				},
				filled: {
					border: 0,
				},
				standard: {
					border: 0,
				},
				filledSuccess: {
					color: palette.success.contrastText,
				},
			},
		},
		MuiMobileStepper: {
			styleOverrides: {
				root: {
					background: palette.background.paper,
				},
			},
		},
		MuiPopover: {
			defaultProps: {
				elevation: 26,
			},
		},
	};
};

export default getComponentStyleOverride;
