import { useMatches, Link, NavLink } from 'react-router'

import { SearchBar } from '#app/components/search-bar.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { UserDropdown } from '#app/components/user-dropdown.tsx'
import { useOptionalUser } from '#app/utils/user.ts'

import logoD from '~/assets/png/epic-news-logo-brown-dark.png'
import logoL from '~/assets/png/epic-news-logo-brown-light.png'

export default function HeaderWithSearch() {
	const matches = useMatches()
	const isOnSearchPage = matches.find((m) => m.id === 'routes/users+/index')
	const searchBar = isOnSearchPage ? null : <SearchBar status="idle" />
	const user = useOptionalUser()

	return (
		<header className="m-1 py-0.5">
			<nav className="bg-secondary flex items-center justify-between p-10 sm:flex-nowrap md:gap-8">
				{/* nav link divs */}
				<div className="text-secondary-foreground dark:text-dark-secondary-foreground mr-auto flex flex-col items-start gap-10 py-8 font-bold lg:flex-row">
					<div className="lg:p-3.25">
						<NavLink to="#">Nav Label</NavLink>
					</div>
					<div className="lg:p-3.25">
						<NavLink to="#">Nav Label</NavLink>
					</div>
					<div className="lg:p-3.25">
						<NavLink to="#">Nav Label</NavLink>
					</div>
				</div>

				{/* logo */}
				<div className="hidden items-center gap-1 dark:block">
					<Link to="/" className="flex w-40 items-center justify-center">
						<img src={logoD} alt="Epic News Logo" />
					</Link>
				</div>

				<div className="block items-center gap-4 dark:hidden">
					<Link to="/" className="flex w-40 items-center justify-center">
						<img src={logoL} alt="Epic News Logo" />
					</Link>
				</div>

				{/* search bar */}
				<div className="ml-auto hidden max-w-sm flex-1 sm:block">
					{searchBar}

					{/* buttons (login / sign up) */}
					<div className="flex items-center gap-5">
						{user ? (
							<UserDropdown />
						) : (
							<Button
								asChild
								variant="default"
								size="lg"
								className="mt-4 w-full"
							>
								<Link to="/login">Log In</Link>
							</Button>
						)}
						{user ? (
							<UserDropdown />
						) : (
							<Button
								asChild
								variant="default"
								size="lg"
								className="mt-4 w-full"
							>
								<Link to="/login">Sign Up</Link>
							</Button>
						)}
					</div>
					<div className="block w-full sm:hidden">{searchBar}</div>
				</div>
			</nav>
		</header>
	)
}
