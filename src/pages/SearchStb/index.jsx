import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStbByTitleAndValidationDateXml } from '../../features/stb/slice'
import moment from 'moment'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import Error from '../../components/Error'

const SearchStb = () => {
  const dispatch = useDispatch()
  const stbReducer = useSelector((state) => state.stbReducer)
  const data = stbReducer.data
  const error = stbReducer.error
  const { xmlStbs } = data ?? null
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xmlStbs, "text/xml")
  const stbArray = Array.from(xmlDoc.getElementsByTagName("stb")) || null

  const [searchTitle, setSearchTitle] = useState("")
  const [searchValidationDate, setSearchValidationDate] = useState("")

  const handleValidationDateChange = (e) => {
    const validationDate = e.target.value
    const convertedValidationDate = new Date(validationDate)
      .toISOString()
      .split("T")[0]
    setSearchValidationDate(convertedValidationDate)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      fetchStbByTitleAndValidationDateXml({
        title: searchTitle,
        validationDate: searchValidationDate,
      })
    )
    setSearchTitle("")
    setSearchValidationDate("")
  }

  return (
    <main className="container-fluid min-h-screen bg-slate-100 dark:bg-slate-800">
      <div className="flex">
        <Sidebar />
        <div className="p-4 sm:ml-64 w-4/5 mx-auto">
          {error && <Error value={error} />}
          {!error && (
            <div className="relative sm:rounded-lg text-black dark:text-white">
              <h1 className="mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
                Recherche de{" "}
                <span className="text-blue-600 dark:text-blue-500">STB</span>
              </h1>
              <form
                className="flex justify-center mb-8"
                onSubmit={handleSubmit}
              >
                <div className="flex items-center mr-4">
                  <label htmlFor="search-date" className="mr-2">
                    Date:
                  </label>
                  <input
                    type="date"
                    id="search-date"
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
                    value={searchValidationDate}
                    onChange={handleValidationDateChange}
                  />
                </div>
                <div className="flex items-center">
                  <label htmlFor="search-title" className="mr-2">
                    Titre:
                  </label>
                  <input
                    type="text"
                    id="search-title"
                    placeholder="Rechercher par titre"
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="ml-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Rechercher
                </button>
                <button
                  type="reset"
                  className="ml-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Effacer
                </button>
              </form>

              {stbArray && stbArray.length > 0 && (
                <div className="bg-white rounded shadow p-4 dark:bg-gray-700 dark:text-gray-400">
                  <h2 className="text-xl font-bold mb-4">
                    Résultats de recherche:
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stbArray.map((stb) => {
                      const stbId = stb.getAttribute("id")
                      return (
                        <div
                          className="rounded p-4 bg-slate-100 dark:bg-gray-900 dark:border-gray-700"
                          key={stbId}
                          id={stbId}
                        >
                          <h3 className="text-lg font-bold">
                            &#8470;{stbId} -{" "}
                            {stb.querySelector("title") &&
                              stb.querySelector("title").textContent}
                          </h3>
                          {stb.querySelector("date") && (
                            <p className="text-gray-500">
                              Date de validation :{" "}
                              {moment(
                                stb.querySelector("date").textContent
                              ).format("DD/MM/YYYY à HH:mm")}
                            </p>
                          )}
                          <p className="mt-2">
                            {stb.querySelector("description") &&
                              stb.querySelector("description").textContent}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default SearchStb
