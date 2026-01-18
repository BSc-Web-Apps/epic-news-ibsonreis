import Card from "#app/components/organisms/Cards/card.tsx";
import HeroCallToAction from "#app/components/organisms/Hero/HeroCallToAction.tsx";
//images
import portrait6 from '~/assets/jpg/portrait-01.jpg'
import portrait1 from '~/assets/jpg/portrait-02.jpg'
import portrait2 from '~/assets/jpg/portrait-03.jpg'
import portrait4 from '~/assets/jpg/portrait-04.avif'
import portrait3 from '~/assets/jpg/portrait-04.jpg'
import portrait5 from '~/assets/jpg/portrait01.jpg'

import hero from '~/assets/jpg/sample-hero-one.jpg'



export default function AboutUsRoute() {
	return (
		<main>
		<div className="border-b-2 mb-5 mx-auto"></div>
			<div className="">
				<HeroCallToAction
					image={hero}
					hasBackgroundColour={true}
					imageRight={true}
				>
				<div className="flex flex-col gap-8 px-8 justify-center items-center">
						<h2 className="text-h2">Meet the team!</h2>
						<p className="text-lg flex justify-center text-center p-10 sm:text:md">
							Meet the team dedicated to bringing you the latest and most
							trusted tech news. Our diverse group of professionals combines
							expertise in journalism, technology, and user experience to deliver
							high-quality content that keeps you informed and engaged.
						</p>
				</div>
				</HeroCallToAction>
			</div>

			<div className="border-b-2 mt-5 mx-auto"></div>
	
			<div className="container mt-5 mb-10 items-center justify-between gap-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				<Card img={portrait1} name="Leonard Krasner" role="Senior Developer" />
				<Card img={portrait2} name="Gilbert Jones" role="Principal Developer" />
				<Card img={portrait3} name="Jade Smith" role="VP, User Experiance" />
				<Card img={portrait4} name="Marcus Reed" role="Investigative Journalist" />
				<Card img={portrait5} name="Priya Patel" role="Politics Correspondent" />
				<Card img={portrait6} name="Olive Bennett" role="Culture & Features Editor" />
			</div>
		</main>
	)
}
