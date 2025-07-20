import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ScrollToTopOnRouteChange from '@hocs/withScrollTopOnRouteChange';
import withLazyLoadably from '@hocs/withLazyLoadably';

import MinimalLayout from '@/components/layouts/minimalLayout';
import MainLayout from '@/components/layouts/mainLayout';

import Page404 from '@/pages/errorPages/404';

const Dashboard1Page = withLazyLoadably(lazy(() => import('@/pages/dashboardsPages/dashboard1')));
const Terms = withLazyLoadably(lazy(() => import('@/pages/terms')));
const Likeditem = withLazyLoadably(lazy(() => import('@/pages/likes')));
const Cart = withLazyLoadably(lazy(() => import('@/pages/cart')));
const Onemukhi = withLazyLoadably(lazy(() => import('@/pages/rudra/one mukhi')));
const LoadersComponentPage = withLazyLoadably(lazy(() => import('@/pages/componentsPages/loaders')));
const Twomukhi = withLazyLoadably(lazy(() => import('@/pages/rudra/two mukhi')));
const Threemukhi = withLazyLoadably(lazy(() => import('@/pages/rudra/three mukhi')));
const Fourmukhi = withLazyLoadably(lazy(() => import('@/pages/rudra/four mukhi')));
const Fivemukhi = withLazyLoadably(lazy(() => import('@/pages/rudra/five mukhi')));
const Sixmukhi = withLazyLoadably(lazy(() => import('@/pages/rudra/six mukhi')));
const Sevenmukhi = withLazyLoadably(lazy(() => import('@/pages/rudra/seven mukhi')));
const Eightmukhi = withLazyLoadably(lazy(() => import('@/pages/rudra/eight mukhi')));
const Ninemukhi = withLazyLoadably(lazy(() => import('@/pages/rudra/nine mukhi')));
const Tenmukhi = withLazyLoadably(lazy(() => import('@/pages/rudra/ten mukhi')));
const Elevenmukhi = withLazyLoadably(lazy(() => import('@/pages/rudra/eleven mukhi')));
const Twelvemukhi = withLazyLoadably(lazy(() => import('@/pages/rudra/twelve mukhi')));
const Thirteenmukhi = withLazyLoadably(lazy(() => import('@/pages/rudra/mukhi13')));
const Fourteenmukhi = withLazyLoadably(lazy(() => import('@/pages/rudra/mukhi14')));
const Fifteenmukhi = withLazyLoadably(lazy(() => import('@/pages/rudra/mukhi15')));
const Malas = withLazyLoadably(lazy(() => import('@/pages/malas/malas')));
const Main = withLazyLoadably(lazy(() => import('@/pages/rudra/main')));
const Maingem = withLazyLoadably(lazy(() => import('@/pages/gems/maingem')));
const Dhanyog = withLazyLoadably(lazy(() => import('@/pages/brace/dhanyog')));
const Amethysr = withLazyLoadably(lazy(() => import('@/pages/brace/amethyst')));
const Cat = withLazyLoadably(lazy(() => import('@/pages/brace/cat')));
const Chakra = withLazyLoadably(lazy(() => import('@/pages/brace/chakra')));
const Citrine = withLazyLoadably(lazy(() => import('@/pages/brace/citrine')));
const Green = withLazyLoadably(lazy(() => import('@/pages/brace/green')));
const Pearl = withLazyLoadably(lazy(() => import('@/pages/brace/pearl')));
const Pyrite = withLazyLoadably(lazy(() => import('@/pages/brace/pyrite')));
const Rose = withLazyLoadably(lazy(() => import('@/pages/brace/rose')));
const Sunstone = withLazyLoadably(lazy(() => import('@/pages/brace/sunstone')));
const Mainbrace = withLazyLoadably(lazy(() => import('@/pages/brace/braceMain')));
const Bluesapphire = withLazyLoadably(lazy(() => import('@/pages/gems/bluesapphire')));
const Lehsuniya = withLazyLoadably(lazy(() => import('@/pages/gems/lehsuniya')));
const Emerald = withLazyLoadably(lazy(() => import('@/pages/gems/emerald')));
const Amethyst = withLazyLoadably(lazy(() => import('@/pages/gems/amethyst')));
const Bluezircon = withLazyLoadably(lazy(() => import('@/pages/gems/bluezircon')));
const Citrinegem = withLazyLoadably(lazy(() => import('@/pages/gems/citrine')));
const Iolite = withLazyLoadably(lazy(() => import('@/pages/gems/iolite')));
const Moonstone = withLazyLoadably(lazy(() => import('@/pages/gems/moonstone')));
const Opal = withLazyLoadably(lazy(() => import('@/pages/gems/opal')));
const Pearlgem = withLazyLoadably(lazy(() => import('@/pages/gems/pearl')));
const Pitambari = withLazyLoadably(lazy(() => import('@/pages/gems/pitambari')));
const Redcoral = withLazyLoadably(lazy(() => import('@/pages/gems/redcoral')));
const Ruby = withLazyLoadably(lazy(() => import('@/pages/gems/ruby')));
const Whitecoral = withLazyLoadably(lazy(() => import('@/pages/gems/whitecoral')));
const Whitesapphire = withLazyLoadably(lazy(() => import('@/pages/gems/whitesapphire')));
const Whitezircon = withLazyLoadably(lazy(() => import('@/pages/gems/whitezircon')));
const Yellowsapphire = withLazyLoadably(lazy(() => import('@/pages/gems/yellowsapphire')));
const Amber = withLazyLoadably(lazy(() => import('@/pages/gems/amber')));
const Redgarnet = withLazyLoadably(lazy(() => import('@/pages/gems/redgarnet')));
const Turquoise = withLazyLoadably(lazy(() => import('@/pages/gems/Turquoise (Firoza)')));
const Hessonite = withLazyLoadably(lazy(() => import('@/pages/gems/hessonite')));
const SnackbarComponentPage = withLazyLoadably(lazy(() => import('@/pages/componentsPages/snackbar')));
const CarouselComponentPage = withLazyLoadably(lazy(() => import('@/pages/componentsPages/carousel')));
const NavigationComponentPage = withLazyLoadably(lazy(() => import('@/pages/componentsPages/navigation')));
const CardComponentPage = withLazyLoadably(lazy(() => import('@/pages/uiComponentsPages/card')));
const CardHeaderComponentPage = withLazyLoadably(lazy(() => import('@/pages/uiComponentsPages/cardHeader')));
const PageHeaderComponentPage = withLazyLoadably(lazy(() => import('@/pages/uiComponentsPages/pageHeader')));
const LoginPage = withLazyLoadably(lazy(() => import('@/pages/loginPages/login')));
const LoginSimplePage = withLazyLoadably(lazy(() => import('@/pages/loginPages/loginSimple')));
const ResetPass = withLazyLoadably(lazy(() => import('@/pages/loginPages/ResetPAss')));
const Returnpolicy = withLazyLoadably(lazy(() => import('@/pages/returnpolicy')));
const SignupSimplePage = withLazyLoadably(lazy(() => import('@/pages/signupPages/signupSimple')));
const SignupPage = withLazyLoadably(lazy(() => import('@/pages/signupPages/signup')));
const Otpverification = withLazyLoadably(lazy(() => import('../../pages/otpverification')));
const Page403 = withLazyLoadably(lazy(() => import('@/pages/errorPages/403')));
const Page500 = withLazyLoadably(lazy(() => import('@/pages/errorPages/500')));
const Page503 = withLazyLoadably(lazy(() => import('@/pages/errorPages/503')));
const Page505 = withLazyLoadably(lazy(() => import('@/pages/errorPages/505')));
const EditProfilePage = withLazyLoadably(lazy(() => import('@/pages/editProfile')));
const AboutUs = withLazyLoadably(lazy(() => import('@/pages/aboutus')));
const NotificationsPage = withLazyLoadably(lazy(() => import('@/pages/notificationsPage')));
const WIPPage = withLazyLoadably(lazy(() => import('@/pages/wip')));
const SamplePage = withLazyLoadably(lazy(() => import('@/pages/sample')));
const ThemeTypographyPage = withLazyLoadably(lazy(() => import('@/pages/themePages/themeTypography')));
const ThemeColorsPage = withLazyLoadably(lazy(() => import('@/pages/themePages/themeColors')));
const ThemeShadowPage = withLazyLoadably(lazy(() => import('@/pages/themePages/themeShadow')));

function Router() {
	return (
		<BrowserRouter basename="/">
			<ScrollToTopOnRouteChange>
				<Routes>
					<Route path="/" element={<MinimalLayout />}>
						<Route path="pages/">
							<Route path="login" element={<LoginPage />} />
							<Route path="login/simple" element={<LoginSimplePage />} />
							<Route path="resetpass" element={<ResetPass />} />
							<Route path="signup" element={<SignupPage />} />
							<Route path="signup/simple" element={<SignupSimplePage />} />
							<Route path="profile" element={<EditProfilePage />} />
							<Route path="otpverification" element={<Otpverification />} />
						</Route>
					</Route>
					<Route path="/" element={<MainLayout />}>
						<Route index element={<Dashboard1Page />} />
						<Route path="aboutus" element={<AboutUs />} />

						<Route path="samplePage" element={<SamplePage />} />

						<Route path="dashboards/">
							<Route path="dashboard1" element={<Dashboard1Page />} />
						</Route>

						<Route path="/">
							<Route path="natural-1-mukhi-rudraksha-savar-(nepali)" element={<Onemukhi />} />
							<Route path="loaders" element={<LoadersComponentPage />} />
							<Route path="natural-2-mukhi-rudraksha-savar-(nepali)" element={<Twomukhi />} />
							<Route path="natural-3-mukhi-rudraksha-savar-(nepali)" element={<Threemukhi />} />
							<Route path="natural-4-mukhi-rudraksha-savar-(nepali)" element={<Fourmukhi />} />
							<Route path="natural-5-mukhi-rudraksha-savar-(nepali)" element={<Fivemukhi />} />
							<Route path="natural-6-mukhi-rudraksha-savar-(nepali)" element={<Sixmukhi />} />
							<Route path="natural-7-mukhi-rudraksha-savar-(nepali)" element={<Sevenmukhi />} />
							<Route path="natural-8-mukhi-rudraksha-savar-(nepali)" element={<Eightmukhi />} />
							<Route path="natural-9-mukhi-rudraksha-savar-(nepali)" element={<Ninemukhi />} />
							<Route path="natural-10-mukhi-rudraksha-savar-(nepali)" element={<Tenmukhi />} />
							<Route path="natural-11-mukhi-rudraksha-savar-(nepali)" element={<Elevenmukhi />} />
							<Route path="natural-12-mukhi-rudraksha-savar-(nepali)" element={<Twelvemukhi />} />
							<Route path="natural-13-mukhi-rudraksha-savar-(nepali)" element={<Thirteenmukhi />} />
							<Route path="natural-14-mukhi-rudraksha-savar-(nepali)" element={<Fourteenmukhi />} />
							<Route path="natural-15-mukhi-rudraksha-savar-(nepali)" element={<Fifteenmukhi />} />
							<Route path="1-to-14-mukhi-rudraksha-mala-(siddha-mala)" element={<Malas />} />
							<Route path="main" element={<Main />} />
							<Route path="mainbrace" element={<Mainbrace />} />
							<Route path="refund-policy" element={<Returnpolicy />} />
							<Route path="maingem" element={<Maingem />} />
							<Route path="amethyst-bracelet" element={<Amethysr />} />
							<Route path="cat's-eye-bracelet" element={<Cat />} />
							<Route path="7-chakra-bracelet" element={<Chakra />} />
							<Route path="citrine-bracelet" element={<Citrine />} />
							<Route path="green-aventurine-bracelet" element={<Green />} />
							<Route path="mother-of-pearl-bracelet" element={<Pearl />} />
							<Route path="pyrite-bracelet" element={<Pyrite />} />
							<Route path="rose-quartz-bracelet" element={<Rose />} />
							<Route path="sunstone-bracelet" element={<Sunstone />} />
							<Route path="dhan-yog-bracelet" element={<Dhanyog />} />
							<Route path="blue-sapphire-(neelam)" element={<Bluesapphire />} />
							<Route path="cat's-eye-(lehsunia)" element={<Lehsuniya />} />
							<Route path="emerald-(panna)" element={<Emerald />} />
							<Route path="hessonite-(gomed)" element={<Hessonite />} />
							<Route path="amethyst-(katela)" element={<Amethyst />} />
							<Route path="blue-zircon" element={<Bluezircon />} />
							<Route path="iolite-(kaka-nili)" element={<Iolite />} />
							<Route path="citrine-(sunela)" element={<Citrinegem />} />
							<Route path="moonstone" element={<Moonstone />} />
							<Route path="opal" element={<Opal />} />
							<Route path="pearl" element={<Pearlgem />} />
							<Route path="pitambari-/-neelambari" element={<Pitambari />} />
							<Route path="red-coral-(moonga)" element={<Redcoral />} />
							<Route path="ruby-(manik)" element={<Ruby />} />
							<Route path="white-coral-(moonga)" element={<Whitecoral />} />
							<Route path="white-sapphire" element={<Whitesapphire />} />
							<Route path="white-zircon" element={<Whitezircon />} />
							<Route path="yellow-sapphire-(pukhraj)" element={<Yellowsapphire />} />
							<Route path="amber" element={<Amber />} />
							<Route path="likes" element={<Likeditem />} />
							<Route path="cart" element={<Cart />} />
							<Route path="red-garnet" element={<Redgarnet />} />
							<Route path="turquoise-(firoza)" element={<Turquoise />} />
							<Route path="snackbar" element={<SnackbarComponentPage />} />
							<Route path="carousel" element={<CarouselComponentPage />} />
							<Route path="navigation" element={<NavigationComponentPage />} />
							<Route path="card" element={<CardComponentPage />} />
							<Route path="cardHeader" element={<CardHeaderComponentPage />} />
							<Route path="pageHeader" element={<PageHeaderComponentPage />} />
							<Route path="termsandcondition" element={<Terms />} />
						</Route>

						<Route path="theme/">
							<Route path="typography" element={<ThemeTypographyPage />} />
							<Route path="colors" element={<ThemeColorsPage />} />
							<Route path="boxShadow" element={<ThemeShadowPage />} />
						</Route>

						<Route path="pages/">
							<Route path="profile/edit" element={<EditProfilePage />} />
							<Route path="notifications" element={<NotificationsPage />} />
							<Route path="error/">
								<Route path="404" element={<Page404 />} />
								<Route path="403" element={<Page403 />} />
								<Route path="503" element={<Page503 />} />
								<Route path="505" element={<Page505 />} />
								<Route path="500" element={<Page500 />} />
							</Route>
						</Route>
					</Route>
					<Route path="/" element={<MainLayout container={false} pb={false} />}>
						<Route path="profile" element={<EditProfilePage />} />
						<Route path="pages/">
							<Route path="wip" element={<WIPPage />} />
						</Route>
					</Route>
					<Route path="*" element={<Page404 />} />
				</Routes>
			</ScrollToTopOnRouteChange>
		</BrowserRouter>
	);
}

export default Router;
