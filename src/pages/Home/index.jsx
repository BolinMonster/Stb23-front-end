import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { faBook, faUserTie, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { fetchHome } from '../../features/home/slice'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import Error from '../../components/Error'

ChartJS.register(ArcElement, Tooltip, Legend)

const doughnutData = {
  labels: ['Nombre(s) de STB', 'Nombre(s) de Clients', 'Nombre(s) de Features'],
  datasets: [
    {
      label: ['Répartition stb, client et features'],
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
}

const Home = () => {

  const dispatch = useDispatch()
  const homeReducer = useSelector((state) => state.homeReducer)
  const { projectName, versionNumber, developerName, collegeLogo, currentDate, numberOfStb, numberOfClient, numberOfFeature } = homeReducer.data ?? { projectName: '', versionNumber: '', developerName: '', collegeLogo: '', currentDate: '', numberOfStb: 0, numberOfClient: 0, numberOfFeature: 0 }
  const error = homeReducer.error
  doughnutData.datasets[0].data = [numberOfStb, numberOfClient, numberOfFeature]

  useEffect(() => {
    dispatch(fetchHome())
  }, [dispatch])
  
  return (
    <main className="container-fluid min-h-screen bg-slate-100 dark:bg-slate-800">
      <div className="flex">
          <Sidebar />
        <div className="p-4 sm:ml-64 w-4/5 mx-auto">
          {error && (
            <Error value={error} />
          )}
          {!error && (
          <div>
            <div className="m-2">
              <div className="card">
                <div className="card-heade">
                  <img
                    src={collegeLogo}
                    alt="Logo de l'Université de Rouen"
                    className="img-fluid rounded-lg dark:bg-slate-100"
                    style={{ maxWidth: "150px", maxHeight: "150px" }}
                  />
                </div>
                <div className="card-body dark:text-slate-100">
                  {projectName ? <h1 className="card-title">{projectName}</h1> : null}
                  {versionNumber ? <p className="card-text">{versionNumber}</p> : null}
                  {developerName ? <p className="card-text">{developerName}</p> : null}
                  {currentDate ? <p> Le : <span>{currentDate}</span> </p> : null}
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="flex flex-col items-center justify-center max-w-sm m-2 p-6 border rounded-lg shadow bg-blue-200 hover:bg-blue-300 dark:bg-blue-800 dark:border-blue-700 dark:hover:bg-blue-700">
                <FontAwesomeIcon icon={faBook} size="xl" />
                <p className="font-bold text-2xl text-blue-950 dark:text-gray-400">{numberOfStb}</p>
                <h5 className="mb-2 tracking-tight text-blue-800 dark:text-white">Nombre de STB</h5>
              </a>
              <a href="#" className="flex flex-col items-center justify-center max-w-sm m-2 p-6 border rounded-lg shadow bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-800 dark:border-yellow-700 dark:hover:bg-yellow-700">
                <FontAwesomeIcon icon={faUserTie} size="xl" />
                <p className="font-bold text-2xl text-yellow-950 dark:text-gray-400">{numberOfClient}</p>
                <h5 className="mb-2 tracking-tight text-yellow-800 dark:text-white">Nombre de clients</h5>
              </a>
              <a href="#" className="flex flex-col items-center justify-center max-w-sm m-2 p-6 border rounded-lg shadow bg-red-200 hover:bg-red-300 dark:bg-red-800 dark:border-red-700 dark:hover:bg-red-700">
                <FontAwesomeIcon icon={faGear} size="xl" />
                <p className="font-bold text-2xl text-red-950 dark:text-gray-400">{numberOfFeature}</p>
                <h5 className="mb-2 tracking-tight text-red-800 dark:text-white">Nombre de fonctionnalités</h5>
              </a>
            </div>
            <div className="block max-w-sm p-6 bg-gray-200 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <Doughnut
                  data={doughnutData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                }}
              />
            </div>
          </div>
        )}
        </div>
        </div>
        <Footer />
    </main>
  )
}

export default Home
