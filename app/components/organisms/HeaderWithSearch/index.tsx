import { useMatches, Link } from 'react-router'
import { SearchBar } from '#app/components/search-bar.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { UserDropdown } from '#app/components/user-dropdown.tsx'
import { useOptionalUser } from '#app/utils/user.ts'
import logo from '~/assets/png/epic-news-logo.png'

export default function HeaderWithSearch() {
	const matches = useMatches()
	const isOnSearchPage = matches.find((m) => m.id === 'routes/users+/index')
	const searchBar = isOnSearchPage ? null : <SearchBar status="idle" />
	const user = useOptionalUser()

	return (
		<header className="m-1 py-0.5">
			<nav className="flex flex-wrap items-center justify-evenly border-b-1 p-10 sm:flex-nowrap md:gap-8">
				{/* parent 'ish' div */}
				<div className="flex items-center gap-4">
					{/* logo */}
					<Link to="/" className="flex w-20 items-center justify-center">
						<img src={logo} alt="Epic News Logo" />
					</Link>
					<span className="text-foreground text-sm">Epic News</span>
				</div>

				{/* search bar */}
				<div className="ml-auto hidden max-w-sm flex-1 sm:block">
					{searchBar}
				</div>

				{/* button */}
				<div className="flex items-center gap-10">
					{user ? (
						<UserDropdown />
					) : (
						<Button asChild variant="default" size="lg">
							<Link to="/login">Log In</Link>
						</Button>
					)}
				</div>

				<div className="block w-full sm:hidden">{searchBar}</div>
			</nav>
		</header>
	)
}
