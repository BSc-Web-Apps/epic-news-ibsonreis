import { useLoaderData } from 'react-router'
import { type Route } from './+types/root.ts'
import { type loader } from './__root.server.tsx'
import { GeneralErrorBoundary } from './components/error-boundary.tsx'
import Document from './components/shared-layout/Document.tsx'
import { useNonce } from './utils/nonce-provider.ts'
import rootLinkElements from './utils/providers/rootLinkElements.ts'
import portrait1 from '~/assets/jpg/portrait-01.jpg'
import portrait2 from '~/assets/svg/icon-placeholder.svg'

export const links: Route.LinksFunction = () => {
	return rootLinkElements
}
export { meta } from './__root.client.tsx'
export { headers, loader } from './__root.server.tsx'

export default function App() {
	const data = useLoaderData<typeof loader | null>()
	const nonce = useNonce()

	return (
		<Document nonce={nonce} honeyProps={data?.honeyProps}>
			<div className="flex h-screen flex-col justify-between">
				<div className="flex-1">
					<main className="grid h-full place-items-center">
						<h1 className="text-mega">Your Journey Begins!</h1>
						<div className="flex flex-col items-center rounded-lg bg-gray-600 p-10">
							<img
								className="mb-5 w-50 rounded-full"
								src={portrait1}
								alt="portrait"
							/>
							<h1 className="font-bold">Leonard Kraser</h1>
							<p>Senior Designer</p>
							<div className="flex items-center">
								<img
									className="mb-5 w-10 rounded-full"
									src={portrait2}
									alt="portrait"
								/>
								<img
									className="mb-5 w-10 rounded-full"
									src={portrait2}
									alt="portrait"
								/>
							</div>
						</div>
						<p className="text-base text-pink-300 md:text-lg md:text-pink-400 lg:text-xl">
							Welcome to Epic News, where the latest developments in tech are
							found.
						</p>
						<button className="cursor: pointer rounded-lg bg-blue-600 p-5 shadow-md hover:bg-blue-700 md:p-5 lg:p-10">
							Press Me!
						</button>
					</main>
				</div>
			</div>
		</Document>
	)
}

export const ErrorBoundary = GeneralErrorBoundary
