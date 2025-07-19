import { v4 as uuid } from 'uuid';

import Emerald from '../../../assets/images/gemstones/Emerald.webp';
import Pearl from '../../../assets/images/gemstones/pearl.webp';
import Opal from '../../../assets/images/gemstones/O.webp';
import Yellowsapphire from '../../../assets/images/gemstones/Yellow_Sapphire.webp';
import Bluesapphire from '../../../assets/images/gemstones/Blue_Sapphire_Neelam_-_Gemsmantra-4015499.webp';
import Ruby from '../../../assets/images/gemstones/rubynew.webp';
import Amethyst from '../../../assets/images/gemstones/Amethyst.webp';
import Redcoral from '../../../assets/images/gemstones/Redcoral.webp';
import Hessonite from '../../../assets/images/gemstones/Hessonite_Gomed.webp';
import cat from '../../../assets/images/gemstones/Cats_Eye_Stone.webp';
import citrine from '../../../assets/images/gemstones/Citrine.webp';
import Iolite from '../../../assets/images/gemstones/Iolite.webp';
import Pita from '../../../assets/images/gemstones/Pitambari.webp';
import zircon from '../../../assets/images/gemstones/Zircon.webp';
import bluezircon from '../../../assets/images/gemstones/bluezircon.png';
import moonstone from '../../../assets/images/gemstones/Moonstone_Stone.webp';
import Amber from '../../../assets/images/gemstones/amber.jpg';
import Redgarnet from '../../../assets/images/gemstones/redgarnet.png';
import Turquoise from '../../../assets/images/gemstones/Turquoise_Stone.webp';
import Whitesapphire from '../../../assets/images/gemstones/whitesapphire.jpg';
import Whitecoral from '../../../assets/images/gemstones/Redcoral.png';

import mukhi1 from '../../../assets/images/rudra/one mukhifinal.jpg';
import mukhi2 from '../../../assets/images/rudra/2_mukhi.avif';
import mukhi3 from '../../../assets/images/rudra/3_Mukhi.avif';
import mukhi4 from '../../../assets/images/rudra/4_Mukhi.avif';
import mukhi5 from '../../../assets/images/rudra/5_Mukhi.avif';
import mukhi6 from '../../../assets/images/rudra/6_Mukhi.avif';
import mukhi7 from '../../../assets/images/rudra/7_Mukhi.avif';
import mukhi8 from '../../../assets/images/rudra/8_Mukhi.avif';
import mukhi9 from '../../../assets/images/rudra/9_Mukhi.avif';
import mukhi10 from '../../../assets/images/rudra/10_Mukhi.avif';
import mukhi11 from '../../../assets/images/rudra/11_Mukhi.avif';
import mukhi12 from '../../../assets/images/rudra/12_Mukhi.avif';
import mukhi13 from '../../../assets/images/rudra/13_Mukhi.avif';
import mukhi14 from '../../../assets/images/rudra/14_Mukhi.avif';
import mukhi15 from '../../../assets/images/rudra/15_Mukhi.avif';
import mala from '../../../assets/images/rudra/Rudraksha_Mala.avif';

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
import { amber } from '@mui/material/colors';
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
				title: 'Blue sapphire (Neelam)',
				href: '/blue-sapphire-(neelam)',
				image: Bluesapphire,
				category: 'Rashi Ratna',
			},
			{
				title: "Cat's Eye (Lehsunia)",
				href: "/cat's-eye-(lehsunia)",
				image: cat,
				category: 'Vedic Gems',
			},
			{
				title: 'Emerald (Panna)',
				href: '/emerald-(panna)',
				image: Emerald,
				category: 'vedic Gems',
			},
			{
				title: 'Hessonite (Gomed)',
				href: '/hessonite-(gomed)',
				image: Hessonite,
				category: 'Other gems ',
			},
			{
				title: 'Opal',
				href: '/opal',
				image: Opal,
				category: 'Other gems ',
			},
			{
				title: 'Pearl',
				href: '/pearl',
				image: Pearl,
				category: 'Other gems ',
			},
			{
				title: 'Red Coral (Moonga)',
				href: '/red-coral-(moonga)',
				image: Redcoral,
				category: 'Other gems ',
			},
			{
				title: 'Ruby (Manik)',
				href: '/ruby-(manik)',
				image: Ruby,
				category: 'Other gems ',
			},
			{
				title: 'Yellow Sapphire (Pukhraj)',
				href: '/yellow-sapphire-(pukhraj)',
				image: Yellowsapphire,
				category: 'Other gems ',
			},
			{
				title: 'Amethyst (Katela)',
				href: '/amethyst-(katela)',
				image: Amethyst,
				category: 'Rashi Ratna',
			},
			{
				title: 'Blue Zircon',
				href: '/blue-zircon',
				image: bluezircon,
				category: 'Vedic Gems',
			},
			{
				title: 'Citrine (Sunela)',
				href: '/citrine-(sunela)',
				image: citrine,
				category: 'vedic Gems',
			},
			{
				title: 'Iolite (Kaka Nili)',
				href: '/iolite-(kaka-nili)',
				image: Iolite,
				category: 'Other gems ',
			},
			{
				title: 'Pitambari / Neelambari',
				href: '/pitambari-/-neelambari',
				image: Pita,
				category: 'Other gems ',
			},
			{
				title: 'White Coral (Moonga)',
				href: '/white-coral-(moonga)',
				image: Whitecoral,
				category: 'Other gems ',
			},
			{
				title: 'White Sapphire',
				href: '/white-sapphire',
				image: Whitesapphire,
				category: 'Other gems ',
			},
			{
				title: 'White Zircon',
				href: '/white-zircon',
				image: zircon,
				category: 'Other gems ',
			},
			{
				title: 'Moonstone (Blue Sheen)',
				href: '/moonstone',
				image: moonstone,
				category: 'Other gems ',
			},
			{
				title: 'Amber',
				href: '/amber',
				image: Amber,
				category: 'Other gems ',
			},
			{
				title: 'Red Garnet',
				href: '/red-garnet',
				image: Redgarnet,
				category: 'Other gems ',
			},
			{
				title: 'Turquoise (Feroza)',
				href: '/turquoise-(firoza)',
				image: Turquoise,
				category: 'Other gems ',
			},
		],
	},
	{
		id: uuid(),
		type: 'group',
		title: 'Rudraksha',
		menuChildren: [
			{
				title: '1 Mukhi Rudraksha (Nepali)',
				href: '/natural-1-mukhi-rudraksha-savar-(nepali)',
				image: mukhi1,
			},
			{ title: '2 Mukhi Rudraksha (Nepali)', href: '/natural-2-mukhi-rudraksha-savar-(nepali)', image: mukhi2 },
			{ title: '3 Mukhi Rudraksha (Nepali)', href: '/natural-3-mukhi-rudraksha-savar-(nepali)', image: mukhi3 },
			{ title: '4 Mukhi Rudraksha (Nepali)', href: '/natural-4-mukhi-rudraksha-savar-(nepali)', image: mukhi4 },
			{ title: '5 Mukhi Rudraksha (Nepali)', href: '/natural-5-mukhi-rudraksha-savar-(nepali)', image: mukhi5 },
			{ title: '6 Mukhi Rudraksha (Nepali)', href: '/natural-6-mukhi-rudraksha-savar-(nepali)', image: mukhi6 },
			{ title: '7 Mukhi Rudraksha (Nepali)', href: '/natural-7-mukhi-rudraksha-savar-(nepali)', image: mukhi7 },
			{ title: '8 Mukhi Rudraksha (Nepali)', href: '/natural-8-mukhi-rudraksha-savar-(nepali)', image: mukhi8 },
			{ title: '9 Mukhi Rudraksha (Nepali)', href: '/natural-9-mukhi-rudraksha-savar-(nepali)', image: mukhi9 },
			{
				title: '10 Mukhi Rudraksha (Nepali)',
				href: '/natural-10-mukhi-rudraksha-savar-(nepali)',
				image: mukhi10,
			},
			/*
      { title: 'Paper', href: '/components/ui/paper' },
      { title: 'Buttons', href: '/components/buttons' },
      */
			{
				title: '11 Mukhi Rudraksha (Nepali)',
				href: '/natural-11-mukhi-rudraksha-savar-(nepali)',
				image: mukhi11,
			},
			{
				title: '12 Mukhi Rudraksha (Nepali)',
				href: '/natural-12-mukhi-rudraksha-savar-(nepali)',
				image: mukhi12,
			},
			{
				title: '13 Mukhi Rudraksha (Nepali)',
				href: '/natural-13-mukhi-rudraksha-savar-(nepali)',
				image: mukhi13,
			},
			{
				title: '14 Mukhi Rudraksha (Nepali)',
				href: '/natural-14-mukhi-rudraksha-savar-(nepali)',
				image: mukhi14,
			},
			{
				title: '15 Mukhi Rudraksha (Nepali)',
				href: '/natural-15-mukhi-rudraksha-savar-(nepali)',
				image: mukhi15,
			},

			// { title: '17 Mukhi Rudraksha (Nepali)', href: '/3b', image: mukhi17 },
			// { title: '18 Mukhi Rudraksha (Nepali)', href: '/3c', image: mukhi18 },
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
				href: '/dhan-yog-bracelet',
				image: brace1,
			},
			{
				title: 'Amethyst Bracelet',
				href: '/amethyst-bracelet',
				image: brace2,
			},
			{
				title: 'Green Aventurine Bracelet',
				href: '/green-aventurine-bracelet',
				image: brace3,
			},
			{
				title: "Cat's Eye Bracelet",
				href: "/cat's-eye-bracelet",
				image: brace4,
			},
			{
				title: 'Pyrite Bracelet',
				href: '/pyrite-bracelet',
				image: brace5,
			},
			{
				title: 'Rose Quartz Bracelet',
				href: '/rose-quartz-bracelet',
				image: brace6,
			},
			{
				title: 'Pearl Bracelet',
				href: '/mother-of-pearl-bracelet',
				image: brace7,
			},
			{
				title: 'Sunstone Bracelet',
				href: '/sunstone-bracelet',
				image: brace8,
			},
			{
				title: '7 Chakra Bracelet',
				href: '/7-chakra-bracelet',
				image: brace9,
			},
			{
				title: 'Citrine Bracelet',
				href: '/citrine-bracelet',
				image: brace10,
			},
			// {
			// 	title: 'Rudraksha Bracelet',
			// 	href: '/pages/error/403',
			// 	image: brace11,
			// },
			// {
			// 	title: 'Rudraksha Kids Bracelet',
			// 	href: '/pages/error/404',
			// 	image: brace12,
			// },
			// {
			// 	title: 'All Crystal Bracelet',
			// 	href: '/pages/error/500',
			// 	image: brace13,
			// },
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
		title: 'Malas',
		menuChildren: [
			{ title: 'Rudraksha Malas', href: '1-to-14-mukhi-rudraksha-mala-(siddha-mala)', image: mala },
			// {
			// 	title: 'Amethyst Bracelet',
			// 	href: '/amethyst-bracelet',
			// 	image: brace2,
			// },
			// {
			// 	title: 'Green Aventurine Bracelet',
			// 	href: '/green-aventurine-bracelet',
			// 	image: brace3,
			// },
			// {
			// 	title: "Cat's Eye Bracelet",
			// 	href: "/cat's-eye-bracelet",
			// 	image: brace4,
			// },
			// {
			// 	title: 'Pyrite Bracelet',
			// 	href: '/pyrite-bracelet',
			// 	image: brace5,
			// },
			// {
			// 	title: 'Rose Quartz Bracelet',
			// 	href: '/rose-quartz-bracelet',
			// 	image: brace6,
			// },
			// {
			// 	title: 'Pearl Bracelet',
			// 	href: '/mother-of-pearl-bracelet',
			// 	image: brace7,
			// },
			// {
			// 	title: 'Sunstone Bracelet',
			// 	href: '/sunstone-bracelet',
			// 	image: brace8,
			// },
			// {
			// 	title: '7 Chakra Bracelet',
			// 	href: '/7-chakra-bracelet',
			// 	image: brace9,
			// },
			// {
			// 	title: 'Citrine Bracelet',
			// 	href: '/citrine-bracelet',
			// 	image: brace10,
			// },
			// {
			// 	title: 'Rudraksha Bracelet',
			// 	href: '/pages/error/403',
			// 	image: brace11,
			// },
			// {
			// 	title: 'Rudraksha Kids Bracelet',
			// 	href: '/pages/error/404',
			// 	image: brace12,
			// },
			// {
			// 	title: 'All Crystal Bracelet',
			// 	href: '/pages/error/500',
			// 	image: brace13,
			// },
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

	// {
	// 	id: uuid(),
	// 	type: 'group',
	// 	title: 'Calculators',
	// 	menuChildren: [
	// 		{
	// 			title: 'Rudraksha Calculators',
	// 			href: '/rudrakshacalculator',
	// 		},
	// 		{
	// 			title: 'Gemstone Recommendation',
	// 			href: '/gemstonerecommendation',
	// 		},
	// 		{
	// 			title: 'Free Bracelet Claculator',
	// 			href: '/freebraceletcalculator',
	// 		},

	// 		/* {
	// 			title: 'Iconos',
	// 			href: '/theme/icons',
	// 		}, */
	// 		{
	// 			title: 'Carat to Ratti Calculator',
	// 			// Breakpoints
	// 			href: '/carattoratticalculator',
	// 		},
	// 		// libraries/ packgaes ej.> moment
	// 	],
	// },
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
	// {
	// 	id: uuid(),
	// 	type: 'item',
	// 	title: 'Affiliate',
	// 	href: '/widgets',
	// },
	{
		id: uuid(),
		type: 'item',
		title: 'Our Story',
		href: '/aboutus',
	},
];

export default NAV_LINKS_CONFIG;
