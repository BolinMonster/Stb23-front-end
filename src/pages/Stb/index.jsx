import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { fetchStbById, fetchStbByIdXml } from '../../features/stb/slice'
import Sidebar from '../../components/Sidebar'
import Error from '../../components/Error'
import Footer from '../../components/Footer'
import { Editor } from '../../components/Editor'

const Stb = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const stbReducer = useSelector((state) => state.stbReducer)
  const data = stbReducer.data
  const dataError = 'error' in stbReducer.data && stbReducer.data.error ?  stbReducer.data.error : null
  const error = stbReducer.error
  const { stb } = data ?? { stb: {} }
  const { xmlStb } = data ?? null

  useEffect(() => {
    dispatch(fetchStbById(id))
  }, [dispatch, id])

  function handleButtonStbXML(event) {
    dispatch(fetchStbByIdXml(id))
  }

  return (
    <main className="container-fluid min-h-screen bg-slate-100 dark:bg-slate-800">
      <div className="flex">
        <Sidebar />
        <div className="p-4 sm:ml-64 w-4/5 mx-auto">
          <div className="relative overflow-x-auto text-white">
            {error && (<Error value={error} />)}
            {dataError && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">Erreur : </span>
                 {dataError.errorId} - {dataError.status}
              </div>
            )}
            {stb && (
              <div className="max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow text-gray-700 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-700">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  STB n°{stb.id} - {stb.title}
                </h2>
                <p>
                  Le {moment(stb.date).format("DD/MM/YYYY à HH:mm")}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {stb.description}
                </p>
                <button
                  onClick={handleButtonStbXML}
                  className="ml-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Consulter en XML
                </button>
              </div>
            )}
            {xmlStb && <Editor value={xmlStb} />}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default Stb
