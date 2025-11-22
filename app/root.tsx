import { useLoaderData } from 'react-router'
import Card from '#app/components/organisms/Cards/card.tsx'
import { type Route } from './+types/root.ts'
import { type loader } from './__root.server.tsx'
import Buttons from './components/atoms/Buttons.tsx'
import { GeneralErrorBoundary } from './components/error-boundary.tsx'
import FooterMenuRight from './components/organisms/Footer/FooterMenuRight.tsx'
import HeaderWithSearch from './components/organisms/HeaderWithSearch/HeaderWithSearch.tsx'
import HeroCallToAction from './components/organisms/Hero/HeroCallToAction.tsx'
import Document from './components/shared-layout/Document.tsx'
import { ThemeSwitch, useTheme } from './routes/resources+/theme-switch.tsx'
import { useNonce } from './utils/nonce-provider.ts'
import rootLinkElements from './utils/providers/rootLinkElements.ts'
import portrait1 from '~/assets/jpg/portrait-01.jpg'
import portrait2 from '~/assets/jpg/portrait-03.jpg'
import portrait3 from '~/assets/jpg/portrait-04.jpg'
import hero from '~/assets/jpg/sample-hero.jpg'

export const links: Route.LinksFunction = () => {
	return rootLinkElements
}
export { meta } from './__root.client.tsx'
export { headers, loader } from './__root.server.tsx'

export default function App() {
	const data = useLoaderData<typeof loader | null>()
	const nonce = useNonce() //authorising that the data that is found in the server
	const theme = useTheme()

	return (
		<Document theme={theme} nonce={nonce} honeyProps={data?.honeyProps}>
			<div className="flex flex-col justify-between">
				<div className="flex-1">
					<HeaderWithSearch />

					<main className="grid h-full place-items-center">
						<div className="m-5 flex flex-col items-center justify-center rounded border-2">
							<ThemeSwitch userPreference={data?.requestInfo.userPrefs.theme} />
						</div>
						<div className="w-full">
							<HeroCallToAction
								image={hero}
								hasBackgroundColour={true}
								imageRight={true}
							>
								<div className="flex flex-col gap-8 px-8">
									<h2 className="text-h2">Welcome to Epic News</h2>
									<p className="text-lg">
										Keep up to date with the latest tech news.
									</p>
								</div>
							</HeroCallToAction>
						</div>
						<h1 className="text-mega m-10">Meet the team!</h1>
						<div className="m-4 flex items-center justify-between gap-4 sm:flex-col lg:flex-row">
							<Card
								img={portrait1}
								name="Leonard Krasner"
								role="Senior Developer"
							/>
							<Card
								img={portrait2}
								name="Gilbert Jones"
								role="Principal Developer"
							/>
							<Card
								img={portrait3}
								name="Craig Smith"
								role="VP, User Experiance"
							/>
						</div>
						<p className="m-5 text-base lg:text-xl">
							Welcome to Epic News, where the latest developments in tech are
							found.
						</p>
						<Buttons />
					</main>
				</div>
				<div className="container flex justify-between pb-5"></div>

				<FooterMenuRight />
			</div>
		</Document>
	)
}

export const ErrorBoundary = GeneralErrorBoundary
