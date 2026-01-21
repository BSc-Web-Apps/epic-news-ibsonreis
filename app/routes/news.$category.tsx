import { invariant } from '@epic-web/invariant'

import { type LoaderFunctionArgs, data, useLoaderData } from 'react-router'
import ArticleCard from '~/components/organisms/Cards/ArticleCard.tsx'
import { prisma } from '~/utils/db.server.ts'
import { toTitleCase } from '~/utils/stringUtils.ts'

//server rendered code (loader)
export async function loader({ params }: LoaderFunctionArgs) {
	const { category } = params

	invariant(typeof category === 'string', 'Category not found')
	const categoryTitle = toTitleCase(category)

	const filteredArticles = await prisma.article.findMany({
		where: {
			category: {
				slug: category, // Retrieves only articles in the specified category
			},
		},
		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
			images: { select: { id: true, objectKey: true } },
		},
	})

	return data({ categoryTitle, filteredArticles })
}

export default function NewsCategoryPage() {
	const { categoryTitle, filteredArticles } = useLoaderData<typeof loader>()
	const hasArticles = filteredArticles.length > 0

	return (
		<div className="container py-16">
			<h2 className="text-h2 mb-15">{categoryTitle}</h2>
			<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
				{hasArticles ? (
					filteredArticles.map((article) => (
						<ArticleCard
							key={article.id}
							articleId={article.id}
							title={article.title}
							category={article.category?.name}
							objectKey={article.images[0]?.objectKey}
						/>
					))
				) : (
					<h2>There are no published {categoryTitle} articles...</h2>
				)}
			</div>
		</div>
	)
}
