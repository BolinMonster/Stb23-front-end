import { Link } from "react-router-dom"

const NotFoundPage = () => {
	return (
		<section className="flex items-center min-h-screen p-16 bg-slate-100 dark:bg-slate-800 dark:text-gray-100">
			<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
				<div className="max-w-md text-center">
					<p className="text-2xl font-semibold md:text-3xl">Désolé, la ressource que vous recherchez est introuvable.</p>
					<p className="mt-4 mb-8 dark:text-gray-400">Mais ne vous inquiétez pas, vous pouvez trouver plein d&apos;autres choses sur notre page d&apos;accueil.</p>
					<h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
						<span className="sr-only">Erreur</span>404
					</h2>
					<Link to="/" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						<span className="">Retourner à la page d&apos;accueil</span>
					</Link>
				</div>
			</div>
		</section>
	)
}

export default NotFoundPage
