import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { faHome, faBook, faCircleInfo, faLayerGroup, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Sidebar = () => {
  const location = useLocation() // Récupère l'URL actuelle
  const isActiveLink = (pathname) => {
    return location.pathname === pathname
  }

  // Ouverture du menu
  const [isOpen, setIsOpen] = useState(false)
  // Dark mode
  const [isDarkTheme, setIsDarkTheme] = useState((document.documentElement.classList.contains('dark'))) // https://write.corbpie.com/react-tailwind-dark-mode-switch-button/

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  function processThemeChange() {
      setIsDarkTheme(isDarkTheme => !isDarkTheme)
      if (localStorage.getItem('color-theme')) {
          if (localStorage.getItem('color-theme') === 'light') {
              document.documentElement.classList.add('dark')
              localStorage.setItem('color-theme', 'dark')
          } else {
              document.documentElement.classList.remove('dark')
              localStorage.setItem('color-theme', 'light')
          }
      } else {
          if (document.documentElement.classList.contains('dark')) {
              document.documentElement.classList.remove('dark')
              localStorage.setItem('color-theme', 'light')
          } else {
              document.documentElement.classList.add('dark')
              localStorage.setItem('color-theme', 'dark')
          }
    }
  }
  function switchTheme() {
      processThemeChange()
  }

  return (
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] transition-transform bg-white dark:bg-gray-900 ${isOpen ? "w-64 translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
        aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto">

          <button
            type="button"
            className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={handleToggle}
          >
            <span className="sr-only">Ouvrir le menu</span>
          </button>

          <ul className="space-y-2 font-medium text-gray-900 dark:text-white">
            <li>
              <Link to="/" className="flex items-center p-2 rounded-lg">
                <FontAwesomeIcon icon={faBook} size="xl" />
                <span className="ml-3">Spécification Technique de Besoin 23</span>
              </Link>
            </li>
            <li>
              <Link to="/home" className={`flex items-center p-2 rounded-lg ${isActiveLink('/home') ? 'bg-blue-600 text-white dark:bg-blue-600' : ''}`}>
                <FontAwesomeIcon icon={faHome} />
                <span className="flex-1 ml-3 whitespace-nowrap">Accueil</span>
              </Link>
            </li>
            <li>
              <Link to="/help" className={`flex items-center p-2 rounded-lg ${isActiveLink('/help') ? 'bg-blue-600 text-white dark:bg-blue-600' : ''}`}>
                <FontAwesomeIcon icon={faCircleInfo} />
                <span className="flex-1 ml-3 whitespace-nowrap">Aide</span>
              </Link>
            </li>
            <li>
            <Link to="/resume" className={`flex items-center p-2 rounded-lg ${isActiveLink('/resume') ? 'bg-blue-600 text-white dark:bg-blue-600' : ''}`}>
                <FontAwesomeIcon icon={faLayerGroup} />
                <span className="flex-1 ml-3 whitespace-nowrap">Liste des STB</span>
              </Link>
            </li>
            <li>
            <Link to="/search" className={`flex items-center p-2 rounded-lg ${isActiveLink('/search') ? 'bg-blue-600 text-white dark:bg-blue-600' : ''}`}>
                <FontAwesomeIcon icon={faSearch} />
                <span className="flex-1 ml-3 whitespace-nowrap">Rechercher des STB</span>
              </Link>
            </li>
          </ul>
          <div className="mt-1">
            <button id="theme-toggle" onClick={switchTheme} type="button"
                    className={`${isDarkTheme ? 'text-gray-300 border-gray-300' : 'text-gray-800 border-gray-500'} border-2 rounded-lg text-sm p-2`}>
                <svg id="theme-toggle-dark-icon"
                     className={`${isDarkTheme ? '' : 'hidden'} w-5 h-5`} fill="currentColor"
                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
                <svg id="theme-toggle-light-icon"
                     className={`${isDarkTheme ? 'hidden' : ''} w-5 h-5`} fill="currentColor"
                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
            </button>
          </div>
        </div>
      </aside>
  )
}

export default Sidebar