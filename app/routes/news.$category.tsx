import { invariant } from '@epic-web/invariant'
import { type LoaderFunctionArgs, data, useLoaderData } from 'react-router'
import { toTitleCase } from '~/utils/stringUtils.ts'

//server rendered code (loader)
export async function loader({ params }: LoaderFunctionArgs) {
	const { category } = params

	invariant(typeof category === 'string', 'Category not found')
	const categoryTitle = toTitleCase(category)

	return data({ categoryTitle })
}

const WireframeBlock = () => {
	return (
		<div className="h-72 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
	)
}

export default function NewsCategoryPage() {
	const { categoryTitle } = useLoaderData<typeof loader>()
	return (
		<div className="container py-16">
			<h2 className="text-h2 mb-15">{categoryTitle}</h2>
			<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
				<WireframeBlock />
				<WireframeBlock />
				<WireframeBlock />
				<WireframeBlock />
				<WireframeBlock />
			</div>
			<div className="mt-5 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
				<WireframeBlock />
				<WireframeBlock />
				<WireframeBlock />
				<WireframeBlock />
				<WireframeBlock />
			</div>
		</div>
	)
}
