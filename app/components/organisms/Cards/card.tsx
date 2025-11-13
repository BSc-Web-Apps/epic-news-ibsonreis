import ShareButtons from '~/components/molecules/SocialMediaButtons.tsx'

interface CardProps {
	img: string
	name: string
	role: string
}

export default function Card({ img, name, role }: CardProps) {
	return (
		<div className="m-2 flex flex-col items-center rounded-xl bg-gray-800 p-10 px-17">
			<img
				className="mb-5 w-50 rounded-full shadow-2xl"
				src={img}
				alt="portrait"
			/>
			<h1 className="text-body-sm mt-1 mb-1 font-bold">{name}</h1>
			<p className="font-light text-gray-400">{role}</p>
			<div className="mt-7.5 flex items-center">
				<ShareButtons />
			</div>
		</div>
	)
}
