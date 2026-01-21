import { Form } from 'react-router'
import { Field } from '~/components/forms.tsx'
import { StatusButton } from '~/components/ui/status-button.tsx'
import logoD from '~/assets/png/epic-news-logo-green-dark.png'
import logoL from '~/assets/png/epic-news-logo-green-light.png'

export default function ContactUs() {
	return (
		<div className="container flex flex-col justify-center pt-10 pb-32">

			<div className="flex justify-center mb-10">
				<div>
					<div className="hidden items-center gap-1 dark:block w-32">
						<img src={logoD} alt="Epic News Logo" />	
						</div>			
					

					<div className="block items-center gap-4 dark:hidden w-32">
							<img src={logoL} alt="Epic News Logo" />
					</div>
				
			</div>
			</div>

		<div className="text-center">
			<h1 className="text-h1">Contact Us</h1>
			<p className="text-body-md text-muted-foreground mt-3">
			We’d love to hear from you. Please fill out the form below.
			</p>
		</div>

		<div className="mx-auto mt-16 max-w-sm min-w-full sm:min-w-[368px]">
			<Form method="POST">
			<Field
				labelProps={{ htmlFor: 'name', children: 'Name' }}
				inputProps={{
				id: 'name',
				name: 'name',
				type: 'text',
				autoComplete: 'name',
				autoFocus: true,
				}}
			/>
			<Field
				labelProps={{ htmlFor: 'email', children: 'Email' }}
				inputProps={{
				id: 'email',
				name: 'email',
				type: 'email',
				autoComplete: 'email',
				}}
			/>
			<Field
				labelProps={{ htmlFor: 'message', children: 'Message' }}
				inputProps={{
				id: 'message',
				name: 'message',
				type: 'textarea',

				}}
			/>
			<StatusButton className="w-full" type="submit" status="idle">

				Send Message
			</StatusButton>
			</Form>
		</div>
		</div>
	)
	}
