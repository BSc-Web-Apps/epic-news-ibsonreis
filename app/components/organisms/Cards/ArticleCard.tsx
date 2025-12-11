import { Link } from 'react-router'

interface ArticleCardProps {
	title: string
	articleId: string
	category?: string
	objectKey?: string
}

export function ArticleCard({ title, category, articleId }: ArticleCardProps) {
	return (
		<Link to={`/article/${articleId}`}>
			<div className="bg-accent p-4">
				<h3>{title}</h3>
				<p>{category || 'General News'}</p>
				<p>{articleId}</p>
			</div>
		</Link>
	)
}
