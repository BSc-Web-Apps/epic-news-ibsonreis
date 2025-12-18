import { type MetaFunction, data, useLoaderData } from 'react-router'

//components
import hero from '~/assets/jpg/sample-hero-two.jpg'
import Buttons from '~/components/atoms/Buttons.tsx'
import ArticleCard from '~/components/organisms/Cards/ArticleCard.tsx'
import HeroCallToAction from '~/components/organisms/Hero/HeroCallToAction.tsx'

import { prisma } from '~/utils/db.server.ts'

export const meta: MetaFunction = () => [{ title: 'Epic News' }]
export async function loader() {
	const allArticles = await prisma.article.findMany({
		where: { isPublished: true },
		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
			images: { select: { objectKey: true } },
		},
	})

	return data({ allArticles })
}

export default function Index() {
	const { allArticles } = useLoaderData<typeof loader>()

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
			
			<div className="container py-16">
				<h2 className="text-h2 mb-8 font-normal">Latest news</h2>

				<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
					{allArticles.length > 0 ? (
						allArticles.map((article, index) => {
							const isMainArticle = index === 0
							return isMainArticle ? (
								<div className="sm:col-span-2 sm:row-span-3 md:col-span-3 md:col-start-2 md:row-span-2">
									<ArticleCard
										key={article.id}
										articleId={article.id}
										title={article.title}
										category={article.category?.name}
										objectKey={article.images[0]?.objectKey}
									/>
								</div>
							) : (
								<ArticleCard
									key={article.id}
									articleId={article.id}
									title={article.title}
									category={article.category?.name}
									objectKey={article.images[0]?.objectKey}
								/>
							)
						})
					) : (
						<p>No articles found</p>
					)}
				</div>
			</div>
			<p className="m-5 text-base lg:text-xl">
				Welcome to Epic News, where the latest developments in tech are found.
			</p>

			<Buttons />
		</main>
	)
}
