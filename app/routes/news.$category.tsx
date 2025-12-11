import { invariant } from '@epic-web/invariant'
import { type LoaderFunctionArgs, data, useLoaderData } from 'react-router'
import { ArticleCard } from '~/components/organisms/Cards/ArticleCard.tsx'
import { prisma } from '~/utils/db.server.ts'
import { toTitleCase } from '~/utils/stringUtils.ts'

// import { getArticleImgSrc } from '~/utils/misc.tsx'
// import siteLogo from '~/assets/png/epic-news-logo-green-dark.png'

//server rendered code (loader)
export async function loader({ params }: LoaderFunctionArgs) {
	const { category } = params

	invariant(typeof category === 'string', 'Category not found')
	const categoryTitle = toTitleCase(category)

	const allArticles = await prisma.article.findMany({
		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
			images: { select: { id: true } },
		},
	})

	return data({ categoryTitle, allArticles })
}

export default function NewsCategoryPage() {
	const { categoryTitle, allArticles } = useLoaderData<typeof loader>()
	return (
		<div className="container py-16">
			<h2 className="text-h2 mb-15">{categoryTitle}</h2>
			<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
				{allArticles.map((article) => (
					<ArticleCard
						key={article.id}
						articleId={article.id}
						title={article.id}
						category={article.category?.name}
						// objectKey={article.images[0]?.objectKey}
					/>
				))}
			</div>
		</div>
	)
}
