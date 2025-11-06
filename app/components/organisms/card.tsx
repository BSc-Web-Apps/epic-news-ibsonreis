import portrait1 from '~/assets/jpg/portrait-01.jpg'
import portrait2 from '~/assets/svg/icon-placeholder.svg'

interface CardProps {
	img: string
	name: string
	role: string
}

export default function Card({ img, name, role }: CardProps) {
	return (
		<div className="m-2 flex flex-col items-center rounded-lg bg-gray-600 p-10">
			<img className="mb-5 w-50 rounded-full" src={img} alt="portrait" />
			<h1 className="font-bold">{name}</h1>
			<p>{role}</p>
			<div className="flex items-center">
				<img className="m-5 w-10 rounded-full" src={portrait2} alt="portrait" />
				<img className="m-5 w-10 rounded-full" src={portrait2} alt="portrait" />
			</div>
		</div>
	)
}
