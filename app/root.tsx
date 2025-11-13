import { useLoaderData } from 'react-router'
import Card from '#app/components/organisms/Cards/card.tsx'
import { type Route } from './+types/root.ts'
import { type loader } from './__root.server.tsx'
import { GeneralErrorBoundary } from './components/error-boundary.tsx'
import Document from './components/shared-layout/Document.tsx'
import { ThemeSwitch, useTheme } from './routes/resources+/theme-switch.tsx'
import { useNonce } from './utils/nonce-provider.ts'
import rootLinkElements from './utils/providers/rootLinkElements.ts'
import portrait1 from '~/assets/jpg/portrait-01.jpg'
import portrait2 from '~/assets/jpg/portrait-03.jpg'
import portrait3 from '~/assets/jpg/portrait-04.jpg'

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
			<div className="flex h-screen flex-col justify-between">
				<div className="flex-1">
					<main className="grid h-full place-items-center">
						<h1 className="text-mega m-10">Meet the team!</h1>
						<div className="m-4 flex items-center justify-between gap-4 sm:flex-col md:flex-row">
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
						<p className="m-5 text-base text-pink-300 md:text-lg md:text-pink-400 lg:text-xl">
							Welcome to Epic News, where the latest developments in tech are
							found.
						</p>
						<button className="cursor: pointer rounded-lg bg-blue-600 p-4.5 shadow-md hover:bg-blue-700 md:p-5 lg:p-10">
							Press Me!
						</button>
					</main>
				</div>
				<div className="container flex justify-between pb-5">
					<ThemeSwitch userPreference={data?.requestInfo.userPrefs.theme} />
				</div>
			</div>
		</Document>
	)
}

export const ErrorBoundary = GeneralErrorBoundary
