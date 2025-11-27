import { useLoaderData, Outlet } from 'react-router'
import { type Route } from './+types/root.ts'
import { type loader } from './__root.server.tsx'
import { GeneralErrorBoundary } from './components/error-boundary.tsx'
import FooterMenuRight from './components/organisms/Footer/FooterMenuRight.tsx'
import HeaderWithSearch from './components/organisms/HeaderWithSearch/HeaderWithSearch.tsx'
import Document from './components/shared-layout/Document.tsx'
import { ThemeSwitch, useTheme } from './routes/resources+/theme-switch.tsx'
import { useNonce } from './utils/nonce-provider.ts'
import rootLinkElements from './utils/providers/rootLinkElements.ts'

export const links: Route.LinksFunction = () => {
	return rootLinkElements
}
export { meta } from './__root.client.tsx'
export { headers, loader } from './__root.server.tsx'

export default function App() {
	const data = useLoaderData<typeof loader | null>()
	const nonce = useNonce() //authorising that the data is found on the server
	const theme = useTheme()

	return (
		<Document theme={theme} nonce={nonce} honeyProps={data?.honeyProps}>
			<div className="flex flex-col justify-between">
				<div className="flex-1">
					<HeaderWithSearch />
					<div className="m-5 flex w-10 flex-row items-center justify-center rounded border-2">
						<ThemeSwitch userPreference={data?.requestInfo.userPrefs.theme} />
					</div>

					<Outlet />
				</div>

				<div className="container flex justify-between pb-5"></div>
				<FooterMenuRight />
			</div>
		</Document>
	)
}

export const ErrorBoundary = GeneralErrorBoundary
