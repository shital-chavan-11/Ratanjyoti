import { v4 as uuid } from 'uuid';

import Emerald from '../../../assets/images/Emerald.webp';
import Pearl from '../../../assets/images/pearl.webp';
import Opal from '../../../assets/images/O.webp';
import Yellowsapphire from '../../../assets/images/Yellow_Sapphire.webp';
import Bluesapphire from '../../../assets/images/Blue_Sapphire_Neelam_-_Gemsmantra-4015499.webp';
import Ruby from '../../../assets/images/rubynew.webp';
import Amethyst from '../../../assets/images/Amethyst.webp';
import Redcoral from '../../../assets/images/Redcoral.webp';
import Hessonite from '../../../assets/images/Hessonite_Gomed.webp';

import mukhi1 from '../../../assets/images/1_Mukhi.avif';
import mukhi2 from '../../../assets/images/2_mukhi.avif';
import mukhi3 from '../../../assets/images/3_Mukhi.avif';
import mukhi4 from '../../../assets/images/4_Mukhi.avif';
import mukhi5 from '../../../assets/images/5_Mukhi.avif';
import mukhi6 from '../../../assets/images/6_Mukhi.avif';
import mukhi7 from '../../../assets/images/7_Mukhi.avif';
import mukhi8 from '../../../assets/images/8_Mukhi.avif';
import mukhi9 from '../../../assets/images/9_Mukhi.avif';
import mukhi10 from '../../../assets/images/10_Mukhi.avif';
import mukhi11 from '../../../assets/images/11_Mukhi.avif';
import mukhi12 from '../../../assets/images/12_Mukhi.avif';
import mukhi13 from '../../../assets/images/13_Mukhi.avif';
import mukhi14 from '../../../assets/images/14_Mukhi.avif';
import mukhi15 from '../../../assets/images/15_Mukhi.avif';
import mukhi16 from '../../../assets/images/16_Mukhi.avif';
import mukhi17 from '../../../assets/images/17_mukhi.webp';
import mukhi18 from '../../../assets/images/18_mukhi.avif';

import brace1 from '../../../assets/images/bracelets/brace1.avif';
import brace2 from '../../../assets/images/bracelets/brace2.webp';
import brace3 from '../../../assets/images/bracelets/brace3.avif';
import brace4 from '../../../assets/images/bracelets/brace4.avif';
import brace5 from '../../../assets/images/bracelets/brace5.avif';
import brace6 from '../../../assets/images/bracelets/brace6.avif';
import brace7 from '../../../assets/images/bracelets/brace7.avif';
import brace8 from '../../../assets/images/bracelets/brace8.avif';
import brace9 from '../../../assets/images/bracelets/brace9.avif';
import brace10 from '../../../assets/images/bracelets/brace10.avif';
import brace11 from '../../../assets/images/bracelets/brace11.avif';
import brace12 from '../../../assets/images/bracelets/brace12.avif';
import brace13 from '../../../assets/images/bracelets/brace13.avif';
// import brace1 from '../../../assets/images/brace1.avif';

/**
 * @example
 * {
 *	id: number,
 *	type: "group" | "item",
 *	title: string,
 *	Icon: NodeElement
 *	menuChildren?: {title: string, href: string}[]
 *  menuMinWidth?: number
 * }
 */

const NAV_LINKS_CONFIG = [
	{
		id: uuid(),
		type: 'group',
		title: 'Gemstones',
		menuChildren: [
			{
				title: 'Ruby',
				href: '/dashboards/dashboard2',
				image: Ruby,
				category: 'Rashi Ratna',
			},
			{
				title: 'Emerald',
				href: '/dashboards/dashboard3',
				image: Emerald,
				category: 'Vedic Gems',
			},
			{
				title: 'Pearl',
				href: '/dashboards/dashboard4',
				image: Pearl,
				category: 'vedic Gems',
			},
			{
				title: 'Opal',
				href: '/dashboards/dashboard6',
				image: Opal,
				category: 'Other gems ',
			},
			{
				title: 'Amethyst',
				href: '/dashboards/dashboard7',
				image: Amethyst,
				category: 'Other gems ',
			},
			{
				title: 'Yellow Sapphire',
				href: '/dashboards/dashboard8',
				image: Yellowsapphire,
				category: 'Other gems ',
			},
			{
				title: 'Blue Sapphire',
				href: '/dashboards/dashboard9',
				image: Bluesapphire,
				category: 'Other gems ',
			},
			{
				title: 'Red Coral',
				href: '/dashboards/dashboard10',
				image: Redcoral,
				category: 'Other gems ',
			},
			{
				title: 'Hessonite',
				href: '/dashboards/dashboard11',
				image: Hessonite,
				category: 'Other gems ',
			},
		],
	},
	{
		id: uuid(),
		type: 'group',
		title: 'Rudraksha',
		menuChildren: [
			{ title: '1 Mukhi Rudraksha (Nepali)', href: '/components/forms', image: mukhi1 },
			{ title: '2 Mukhi Rudraksha (Nepali)', href: '/components/tables', image: mukhi2 },
			{ title: '3 Mukhi Rudraksha (Nepali)', href: '/components/modal', image: mukhi3 },
			{ title: '4 Mukhi Rudraksha (Nepali)', href: '/components/loaders', image: mukhi4 },
			{ title: '5 Mukhi Rudraksha (Nepali)', href: '/components/snackbar', image: mukhi5 },
			{ title: '6 Mukhi Rudraksha (Nepali)', href: '/components/carousel', image: mukhi6 },
			{ title: '7 Mukhi Rudraksha (Nepali)', href: '/components/navigation', image: mukhi7 },
			{ title: '8 Mukhi Rudraksha (Nepali)', href: '/components/card', image: mukhi8 },
			{ title: '9 Mukhi Rudraksha (Nepali)', href: '/components/cardHeader', image: mukhi9 },
			{ title: '10 Mukhi Rudraksha (Nepali)', href: '/components/pageHeader', image: mukhi10 },
			/*
      { title: 'Paper', href: '/components/ui/paper' },
      { title: 'Buttons', href: '/components/buttons' },
      */
			{ title: '11 Mukhi Rudraksha (Nepali)', href: '/1a', image: mukhi11 },
			{ title: '12 Mukhi Rudraksha (Nepali)', href: '/1b', image: mukhi12 },
			{ title: '13 Mukhi Rudraksha (Nepali)', href: '/2a', image: mukhi13 },
			{ title: '14 Mukhi Rudraksha (Nepali)', href: '/2b', image: mukhi14 },
			{ title: '15 Mukhi Rudraksha (Nepali)', href: '/2c', image: mukhi15 },
			{ title: '16 Mukhi Rudraksha (Nepali)', href: '/3a', image: mukhi16 },
			{ title: '17 Mukhi Rudraksha (Nepali)', href: '/3b', image: mukhi17 },
			{ title: '18 Mukhi Rudraksha (Nepali)', href: '/3c', image: mukhi18 },
			//   { title: 'Level 4a', href: '/4a' },
			//   { title: 'Level 1c', href: '/1c' },
		],
	},

	{
		id: uuid(),
		type: 'group',
		title: 'Bracelets',
		menuChildren: [
			{
				title: 'Dhan Yog Bracelet',
				href: '/pages/login',
				image: brace1,
			},
			{
				title: 'Amethyst Bracelet',
				href: '/pages/login/simple',
				image: brace2,
			},
			{
				title: 'Green Aventurine Bracelet',
				href: '/pages/login/split',
				image: brace3,
			},
			{
				title: "Cat's Eye Bracelet",
				href: '/pages/signup',
				image: brace4,
			},
			{
				title: 'Pyrite Bracelet',
				href: '/pages/signup/simple',
				image: brace5,
			},
			{
				title: 'Rose Quartz Bracelet',
				href: '/pages/signup/split',
				image: brace6,
			},
			{
				title: 'Pearl Bracelet',
				href: '/pages/wip',
				image: brace7,
			},
			{
				title: 'Sunstone Bracelet',
				href: '/pages/settings',
				image: brace8,
			},
			{
				title: '7 Chakra Bracelet',
				href: '/pages/notifications',
				image: brace9,
			},
			{
				title: 'Citrine Bracelet',
				href: '/pages/login',
				image: brace10,
			},
			{
				title: 'Rudraksha Bracelet',
				href: '/pages/error/403',
				image: brace11,
			},
			{
				title: 'Rudraksha Kids Bracelet',
				href: '/pages/error/404',
				image: brace12,
			},
			{
				title: 'All Crystal Bracelet',
				href: '/pages/error/500',
				image: brace13,
			},
			// {
			// 	title: '503 Service Unavailable',
			// 	href: '/pages/error/503',
			// },
			// {
			// 	title: '505 Forbidden',
			// 	href: '/pages/error/505',
			// },
			// {
			// 	title: 'Pricing 1',
			// 	href: '/pages/pricing/pricing1',
			// },
			// {
			// 	title: 'Pricing 2',
			// 	href: '/pages/pricing/pricing2',
			// },
			// {
			// 	title: 'Landing01',
			// 	href: '/pages/landing/landing1',
			// },
			// {
			// 	title: 'Landing02',
			// 	href: '/pages/landing/landing2',
			// },
			// {
			// 	title: 'Landing03',
			// 	href: '/pages/landing/landing3',
			// },
			// {
			// 	title: 'Landing04',
			// 	href: '/pages/landing/landing4',
			// },
		],
	},

	{
		id: uuid(),
		type: 'group',
		title: 'Calculators',
		menuChildren: [
			{
				title: 'Rudraksha Calculators',
				href: '/theme/colors',
			},
			{
				title: 'Gemstone Recommendation',
				href: '/theme/typography',
			},
			{
				title: 'Free Bracelet Claculator',
				href: '/theme/boxShadow',
			},

			/* {
				title: 'Iconos',
				href: '/theme/icons',
			}, */
			{
				title: 'Carat to Ratti Calculator',
				// Breakpoints
				href: '/theme/utils',
			},
			// libraries/ packgaes ej.> moment
		],
	},
	// {
	// 	id: uuid(),
	// 	type: 'group',
	// 	title: 'Apps',
	// 	Icon: InventoryOutlinedIcon,
	// 	menuChildren: [
	// 		{
	// 			title: 'Ecommerce WIP',
	// 			href: '/profile WIP',
	// 		},
	// 		{
	// 			title: 'Social Feed WIP',
	// 			href: '/profile WIP',
	// 		},
	// 		{
	// 			title: 'Calendar WIP',
	// 			href: '/profile WIP',
	// 		},
	// 		{
	// 			title: 'Chat WIP',
	// 			href: '/profile WIP',
	// 		},
	// 	],
	// },
	// {
	// 	id: uuid(),
	// 	type: 'item',
	// 	title: 'Sample Tab',
	// 	Icon: WebOutlinedIcon,
	// 	href: '/samplePage',
	// },
	{
		id: uuid(),
		type: 'item',
		title: 'Affiliate',
		href: '/widgets',
	},
	{
		id: uuid(),
		type: 'item',
		title: 'Our Story',
		href: '/aboutus',
	},
];

export default NAV_LINKS_CONFIG;
