import {
	Link,
	type MetaFunction,
	data,
	useLoaderData,
	
} from 'react-router'

//components
import { ParallaxProvider } from 'react-scroll-parallax'
import { Button } from '#app/components/ui/button.tsx'
import hero from '~/assets/jpg/sample-hero-two-2.jpg'
// import hero from '~/assets/jpg/sample-hero-two.jpg'
import logoR from '~/assets/png/epic-news-logo-green-dark.png'
import logo from '~/assets/png/epic-news-logo-green-light.png'
import ArticleCard from '~/components/organisms/Cards/ArticleCard.tsx'
// import HeroCallToAction from '~/components/organisms/Hero/HeroCallToAction.tsx'
import ParallaxBackground from '~/components/organisms/Hero/ParallaxBackground.tsx'

import { prisma } from '~/utils/db.server.ts'

export const meta: MetaFunction = () => [{ title: 'Epic News' }]
export async function loader() {
	
	const techArticles = await prisma.article.findMany({
		where: {
			isPublished: true,
			category: {
				slug: 'technology', 
			},
		},

		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
			images: { select: { objectKey: true } },
		},
	})
	const entArticles = await prisma.article.findMany({
		where: {
			isPublished: true,
			category: {
				slug: 'entertainment', 
			},
		},
		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
			images: { select: { objectKey: true } },
		},
	})
	const busArticles = await prisma.article.findMany({
		where: {
			isPublished: true,
			category: {
				slug: 'business', 
			},
		},
		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
			images: { select: { objectKey: true } },
		},
	})

	return data({ techArticles, entArticles, busArticles })
}

// tech

export default function Index() {
	const { techArticles, entArticles, busArticles } =
		useLoaderData<typeof loader>()
	const hasTechArticles = techArticles.length > 0
	const hasEntArticles = entArticles.length > 0
	const hasBusArticles = busArticles.length > 0

	return (
		<ParallaxProvider>
			<ParallaxBackground
				image={hero}
				title="Epic News"
				logo={logo}
				logoR={logoR}
				altText="Welcome to Epic News, where the latest developments in tech are found."
			>
				<div className="bg-secondary/40 mx-auto flex w-fit flex-1 flex-col justify-between gap-16 px-20 py-16 backdrop-blur-sm">
					<p className="text-secondary-foreground text-center text-4xl font-extrabold">
						The latest news, brought by you, all in one place!
					</p>
					<Button size="wide" className="bg-ring">
						<Link to="/signup">Join to add your thoughts!</Link>
					</Button>
				</div>
			</ParallaxBackground>

			<main className="grid h-full place-items-center">
				<div className="container py-16">
					<div>
						<h2 className="text-h2 flex justify-start font-normal">
							Technology
						</h2>
						<div className="mx-auto mt-5 border-b-2"></div>

						<div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
							{hasTechArticles ? (
								techArticles.map((article, index) => {
									const isMainArticle = index === 0
									return isMainArticle ? (
										<div className="mt-6 sm:col-span-2 sm:row-span-3 lg:col-span-3 lg:col-start-2 lg:row-span-2">
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
								<p className='p-10'>No articles found</p>
							)}
						</div>

						<h2 className="text-h2 mt-10 flex justify-start font-normal">
							Entertainment
						</h2>
						<div className="mx-auto mt-5 border-b-2"></div>

						<div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
							{hasEntArticles ? (
								entArticles.map((article, index) => {
									const isMainArticle = index === 0
									return isMainArticle ? (
										<div className="mt-6 sm:col-span-2 sm:row-span-3 lg:col-span-3 lg:col-start-2 lg:row-span-2">
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
								<p className='p-10'>No articles found</p>
							)}
						</div>

						<h2 className="text-h2 mt-10 flex justify-start font-normal">
							Business
						</h2>
					</div>
					<div className="mx-auto mt-5 border-b-2"></div>

					<div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
						{hasBusArticles ? (
							busArticles.map((article, index) => {
								const isMainArticle = index === 0
								return isMainArticle ? (
									<div className="mt-6 sm:col-span-2 sm:row-span-3 lg:col-span-3 lg:col-start-2 lg:row-span-2">
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
						<p className='p-10'>No articles found</p>
						)}
					</div>
				</div>
			</main>
		</ParallaxProvider>
	)
}
