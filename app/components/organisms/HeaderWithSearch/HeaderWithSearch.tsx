import { useMatches, NavLink, Link } from 'react-router'

import { SearchBar } from '#app/components/search-bar.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { UserDropdown } from '#app/components/user-dropdown.tsx'
import { useOptionalUser, userHasRole } from '#app/utils/user.ts'

import logoD from '~/assets/png/epic-news-logo-green-dark.png'
import logoL from '~/assets/png/epic-news-logo-green-light.png'

export default function HeaderWithSearch() {
	const matches = useMatches()
	const isOnSearchPage = matches.find((m) => m.id === 'routes/users+/index')
	const searchBar = isOnSearchPage ? null : <SearchBar status="idle" />
	const user = useOptionalUser()
	const isAdminUser = user ? userHasRole(user, 'admin') : false

	return (
		<header className="m-1 py-0.5">
			<nav className="bg-secondary flex items-center justify-between p-10 sm:flex-nowrap md:gap-8">
				{/* nav link divs */}
				<div className="text-secondary-foreground dark:text-dark-secondary-foreground flex flex-col items-start gap-10 py-8 font-bold md:mr-auto lg:flex-row">
					<div className="sm:mr-15 md:mr-0 md:p-4.25">
						<NavLink to="/news" prefetch="intent">
							News
						</NavLink>
					</div>

					<div className="sm:mr-15 md:mr-0 md:p-4.25">
						<NavLink to="/about-us" prefetch="intent">
							About Us
						</NavLink>
					</div>
					<div className="sm:mr-15 md:mr-0 md:p-4.25">
						<NavLink to="/contact-us" prefetch="intent">
							Contact Us
						</NavLink>
					</div>
				</div>

				{/* logo */}
				<div>
					<div className="hidden items-center gap-1 dark:block">
						<NavLink
							to="/"
							className="flex w-40 items-center justify-center sm:items-end"
						>
							<img src={logoD} alt="Epic News Logo" />
						</NavLink>
						{isAdminUser && (
    					<div className="flex justify-center sm:mr-15 md:mr-0 md:p-4.25">
      						<Link to="/admin-review">Admin Review</Link>
    					</div>
  						)}
					</div>

					<div className="block items-center gap-4 dark:hidden">
						<NavLink
							to="/"
							className="flex w-40 items-center justify-center sm:items-end"
						>
							<img src={logoL} alt="Epic News Logo" />
						</NavLink>
					  {isAdminUser && (
    <div className="flex justify-center sm:mr-15 md:mr-0 md:p-4.25">
      <Link to="/admin-review">Admin Review</Link>
    </div>
  )}
					</div>
				</div>
				<div className="ml-10 block md:hidden">
					{user ? (
						<UserDropdown />
					) : (
						<Button asChild variant="default" size="sm" className="mt-4 w-25">
							<Link to="/login">Log In</Link>
						</Button>
					)}
				</div>

				{/* search bar */}
				<div className="ml-auto hidden max-w-sm flex-1 md:block">
					{searchBar}

					{/* buttons (login / sign up) */}
					<div className="flex items-center justify-between gap-5">
						{user ? (
							<UserDropdown />
						) : (
							<Button asChild variant="default" size="lg" className="mt-4 w-50">
								<Link to="/login">Log In</Link>
							</Button>
						)}

						<Button asChild variant="default" size="lg" className="mt-4 w-50">
							<Link to="/signup">Sign Up</Link>
						</Button>
					</div>
				</div>
			</nav>
		</header>
	)
}
