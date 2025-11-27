import { type MetaFunction } from 'react-router'
//images
import portrait1 from '~/assets/jpg/portrait-01.jpg'
import portrait2 from '~/assets/jpg/portrait-03.jpg'
import portrait3 from '~/assets/jpg/portrait-04.jpg'
//components
import hero from '~/assets/jpg/sample-hero-two.jpg'
import Buttons from '~/components/atoms/Buttons.tsx'
import Card from '~/components/organisms/Cards/card.tsx'
import HeroCallToAction from '~/components/organisms/Hero/HeroCallToAction.tsx'

export const meta: MetaFunction = () => [{ title: 'Epic News' }]

export default function Index() {
	return (
		<main className="grid h-full place-items-center">
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
				<Card img={portrait1} name="Leonard Krasner" role="Senior Developer" />
				<Card img={portrait2} name="Gilbert Jones" role="Principal Developer" />
				<Card img={portrait3} name="Craig Smith" role="VP, User Experiance" />
			</div>
			<p className="m-5 text-base lg:text-xl">
				Welcome to Epic News, where the latest developments in tech are found.
			</p>
			<Buttons />
		</main>
	)
}
