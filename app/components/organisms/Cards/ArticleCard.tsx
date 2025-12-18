import { type ReactElement } from 'react'
import {
	MdOutlineBusinessCenter,
	MdOutlineTheaters,
	MdOutlineDesktopMac,
	MdOutlineNewspaper,
} from 'react-icons/md'
import { Link } from 'react-router'
import siteLogo from '~/assets/png/epic-news-logo-green-dark.png'
import { getArticleImgSrc } from '~/utils/misc.tsx'

interface ArticleCardProps {
	articleId: string
	title: string

	category?: string
	objectKey?: string
}

export default function ArticleCard({
	articleId,
	title,
	category = 'General news',
	objectKey,
}: ArticleCardProps) {
	const imageSrc = objectKey ? getArticleImgSrc(objectKey) : siteLogo

	const categoryIcons: { [key: string]: ReactElement } = {
		Business: <MdOutlineBusinessCenter size={20} className="text" />,
		Entertainment: <MdOutlineTheaters size={20} className="text" />,
		Technology: <MdOutlineDesktopMac size={20} className="text" />,
		'General news': <MdOutlineNewspaper size={20} className="text" />,
	}

	return (
		<Link to={`/article/${articleId}`}>
			<div className="cursor-pointer transition-all duration-500 hover:scale-105">
				<div>
					<img
						src={imageSrc}
						alt={title}
						className="h-64 w-full rounded-t object-cover"
					/>
				</div>

				<div className="bg-accent flex h-64 flex-col justify-between rounded-b p-4">
					<h3 className="line-clamp-3 text-xl font-bold">{title}</h3>

					<div className="flex items-center gap-2">
						{categoryIcons[category]}
						<p className="text-sm">{category}</p>
					</div>
				</div>
			</div>
		</Link>
	)
}
