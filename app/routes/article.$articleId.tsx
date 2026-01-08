import { invariant } from '@epic-web/invariant'
import { type LoaderFunctionArgs, data, useLoaderData } from 'react-router'
import { getArticleImgSrc } from '#app/utils/misc.tsx'
import siteLogo from '~/assets/png/epic-news-logo-green-dark.png'
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
			owner: { select: { name: true } },
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

	return singleArticle ? (
		<div className="container py-16">
			<h2 className="text-h2 pb-8">{singleArticle.title}</h2>
			{/* <div>{singleArticle.images?.objectKey}</div> */}

			<img src={imageSrc} alt={singleArticle.title} />

			<p className="text-h5 pb-2">
				{singleArticle.category?.name || 'General News'}
			</p>
			<p className="text-h5 pb-5">{singleArticle.owner?.name}</p>

			<p>{singleArticle.content}</p>
		</div>
	) : (
		<ArticleNotFound />
	)
}
