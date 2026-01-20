import { invariant } from '@epic-web/invariant'
import { Link, type LoaderFunctionArgs, data, useLoaderData } from 'react-router'
import { getArticleImgSrc } from '#app/utils/misc.tsx'
import siteLogo from '~/assets/png/epic-news-logo-green-light.png'
import { prisma } from '~/utils/db.server.ts'



//server rendered code (loader) backend
export async function loader({ params }: LoaderFunctionArgs) {
	const { articleId } = params

	invariant(typeof articleId === 'string', 'No article ID provided')

	const singleArticle = await prisma.article.findUnique({
		where: {
			id: articleId,
		},
		select: {
			id: true,
			title: true,
			content: true,
			category: { select: { name: true } },
			owner: { select: { name: true, username: true } },
			images: { select: { objectKey: true } },
		},
	})

	return data({ singleArticle })
}

const ArticleNotFound = () => {
	return (
		<div className="container flex h-full flex-1 flex-col items-center justify-center p-50">
			<h2 className="text-h2 pb-8 text-center">No article found 🤔</h2>
			<p className="text-center text-xl">
				Please check the article ID in your browser and try again.
			</p>
		</div>
	)
}

export default function SingleArticlePage() {
	const { singleArticle } = useLoaderData<typeof loader>()

	if (!singleArticle) return <ArticleNotFound />

	const imageSrc = singleArticle.images[0]
		? getArticleImgSrc(singleArticle.images[0].objectKey)
		: siteLogo

	const truncateWords = (content: string, wordLimit: number): string => {
		const words = content.split(' ')
		return words.length > wordLimit
			? words.slice(0, wordLimit).join(' ') + '...'
			: content
	}
	

		return singleArticle ? (
		<div className="my-5 px-4 md:px-8 lg:px-16">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch ">
			
			
				{/* Article content */}
				<div className="bg-accent p-6 md:p-10 lg:p-20 lg:py-70 rounded-lg ">
					<div className="flex flex-wrap gap-4 mb-4 ">
						<div className='bg-secondary px-3 py-1 rounded'>
							<Link prefetch="intent" to={`/users/${singleArticle.owner.username}/articles`.toLowerCase()}>
								<p className="text-h5 cursor-pointer hover:underline underline-offset-4">{singleArticle.owner?.name}</p>
							</Link>
						</div>
						<div className='px-3 py-1'>
							<Link prefetch="intent" to={`/news/${(singleArticle.category?.name || 'General News').toLowerCase()}`}>
								<p className="text-h5 cursor-pointer hover:underline underline-offset-4">
									{singleArticle.category?.name || 'General News'}
								</p>
							</Link>
						</div>
					</div>

					<h2 className="text-h2 mb-6 underline decoration-secondary underline-offset-4">
					{singleArticle.title}
					</h2>

					<p className="leading-relaxed mt-10">
					{truncateWords(singleArticle.content, 40)}
					</p>
				</div>
	

				{/* Image column */}
				<div className="flex justify-center items-center">
					<img
					src={imageSrc}
					alt={singleArticle.title}
					className=" h-200 w-full object-cover rounded-lg"
					/>
				</div>
				{/* end of grid */}
			</div>

			{/* Full content section */}
			<div className="bg-accent p-10 rounded-lg mt-5">
				<div className='flex text-3xl font-semibold'>
					{singleArticle.title}
				</div>
				<div className="border-b-2 mx-auto mt-4 border-secondary"></div>
					{/* full content */}
				<div className='mt-5'>
					<p className="whitespace-pre-line">{singleArticle.content}</p>	
				</div>
			</div>
		</div>
		) : (
		<ArticleNotFound />
		)
}
