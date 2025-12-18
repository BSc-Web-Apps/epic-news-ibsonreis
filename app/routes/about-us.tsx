import Card from "#app/components/organisms/Cards/card.tsx";
//images
import portrait1 from '~/assets/jpg/portrait-01.jpg'
import portrait2 from '~/assets/jpg/portrait-03.jpg'
import portrait3 from '~/assets/jpg/portrait-04.jpg'

export default function AboutUsRoute() {
	return (
		<main className="container py-16">
			<h1 className="text-mega m-10">Meet the team!</h1>
			<div className="m-4 flex items-center justify-between gap-4 sm:flex-col lg:flex-row">
				<Card img={portrait1} name="Leonard Krasner" role="Senior Developer" />
				<Card img={portrait2} name="Gilbert Jones" role="Principal Developer" />
				<Card img={portrait3} name="Craig Smith" role="VP, User Experiance" />
			</div>
		</main>
	)
}
