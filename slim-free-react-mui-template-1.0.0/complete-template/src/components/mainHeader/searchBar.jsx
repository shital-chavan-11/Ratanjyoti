import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
	return (
		<Stack component="form" display={{ xs: 'none', md: 'inline-block' }}>
			<InputBase
				placeholder="search"
				fullWidth
				sx={{
					width: '500px',
					bgcolor: 'background.paper',
					borderRadius: '20px',
					overflow: 'hidden',
					pl: 2,
					py: 0.5,
					border: 2,
					borderColor: 'primary.light',
					fontSize: '13px',
				}}
				endAdornment={
					<InputAdornment position="end">
						<IconButton color="primary" size="small" type="submit" sx={{ bgcolor: 'primary.main' }}>
							<SearchIcon fontSize="small" sx={{ color: 'primary.contrastText' }} />
						</IconButton>
					</InputAdornment>
				}
			/>
		</Stack>
	);
}

export default SearchBar;
