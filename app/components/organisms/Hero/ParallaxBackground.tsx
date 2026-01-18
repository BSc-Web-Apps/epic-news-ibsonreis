import { Parallax, useParallaxController } from 'react-scroll-parallax'

interface ParallaxBackgroundProps {
	description?: string
	title?: string
	image: string
	logo?: string
	logoR?: string
	altText?: string
	children?: React.ReactNode
}

const ParallaxBackground = ({
	description,
	title,
	image,
	logo,
	logoR,
	altText = 'Welcome to Epic News, where the latest developments in tech are found.',
	children,
}: ParallaxBackgroundProps) => {
	const parallaxController = useParallaxController()
	const handleLoad = () => parallaxController?.update()

	return (
		<div className="relative">
			<div className="relative shadow-xl sm:overflow-hidden ">
				<div className="absolute inset-0">
					<Parallax className="hidden lg:block" speed={-20}>
						<img
							className="h-full w-full object-cover"
							src={image}
							alt={altText}
							onLoad={handleLoad}
						/>
					</Parallax>
					<img
						className="h-full w-full object-cover lg:hidden"
						src={image}
						alt={altText}
						onLoad={handleLoad}
					/>
					<div className="bg-primary-light absolute inset-0 mix-blend-multiply" />
				</div>
				
				<div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32">
					{logo && (
						<div>
						<div className="mx-auto my-8 w-32 block items-center gap-4 dark:hidden">
							<img src={logo} className="drop-shadow-md" alt="Epic News Logo" />
						</div>
						<div className="mx-auto my-8 w-32 hidden items-center gap-4 dark:block">
							<img src={logoR} className="drop-shadow-md" alt="Epic News Logo" />
						</div>
						</div>
					)}
					<h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl pb-10">
						<span className="block bg-gradient-to-r bg-clip-text uppercase drop-shadow-lg text-gray-200 ">
							{title}
						</span>
					</h1>
					
					{description && (
						<p className="text-secondary-light mx-auto mt-6 max-w-lg text-center text-2xl drop-shadow-md sm:max-w-3xl lg:text-5xl">
							{description}
						</p>
					)}
					{children && children}
				</div>
			</div>
		</div>
	)
}

export default ParallaxBackground


