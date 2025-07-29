import Stack from '@mui/material/Stack';

import StatsSection from './statsSection';
import GraphsSection from './graphsSection';
import BitcoinSection from './bitcoinSection';
import Bracelet from './bracelets';
import Gemstones from './gemstones';
import Reviews from './reviews';
import Blog from './blog';
import Purity from './purity';
import Rudra from './rudra';

function Dashboard1Page() {
	return (
		<Stack spacing={3}>
			<GraphsSection />
			<StatsSection />
			<section>
				<BitcoinSection />
			</section>
			<Gemstones />
			<Bracelet />
			<Rudra />
			<Reviews />
			<Blog />
			<Purity />
		</Stack>
	);
}

export default Dashboard1Page;
