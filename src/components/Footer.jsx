import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="rounded-lg shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] bg-white dark:bg-gray-900">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          2023{" - "}
          <a
            href="https://www.w3.org/XML/"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            Projet XML - Spécification Technique de Besoin 23
          </a>
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium dark:text-gray-400 sm:mt-0">
          <li>
            <Link
              to="/"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="text-gray-500 sm:text-center dark:text-gray-400 border-0">Accueil</span>
            </Link>
          </li>
          <li>
            <Link
              to="/help"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="text-gray-500 sm:text-center dark:text-gray-400">Aide</span>
            </Link>
          </li>
          <li>
            <Link
              to="/resume"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="text-gray-500 sm:text-center dark:text-gray-400">Liste des STB</span>
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="text-gray-500 sm:text-center dark:text-gray-400">Recherche STB</span>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
