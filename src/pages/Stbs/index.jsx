import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import Sidebar from '../../components/Sidebar'
import Error from '../../components/Error'
import Footer from '../../components/Footer'
import { fetchAllStb, fetchAllStbXML, sendStbXML, removeStbById } from '../../features/stb/slice'
import { Editor } from '../../components/Editor'
import { prettifyXml } from '../../utils/xmlUtil'

const Stbs = () => {

  const dispatch = useDispatch()
  const stbReducer = useSelector((state) => state.stbReducer)
  const data = stbReducer.data
  const error = stbReducer.error
  const { stbs } = data ?? { stbs: [] }
  const { xmlStbs } = data ?? null
  const { xmlStbSent } = data ?? null
  const { removeStb } = data ?? null

  useEffect(() => {
    dispatch(fetchAllStb())
  }, [dispatch, removeStb])

  function handleKeyUp(e) {
    e.preventDefault()
    var value = e.target.value.toLowerCase()
    var rows = document.querySelectorAll("#table-data tbody tr")
    rows.forEach(function (row) {
      var matches = row.textContent.toLowerCase().indexOf(value) > -1
      row.style.display = matches ? "" : "none"
    })
  }

  const [xmlInputContent, setXmlInputContent] = useState('')
  function handleInputChange(event) {
    const strXmlFileContent = prettifyXml(event.target.value)
    setXmlInputContent(strXmlFileContent)
    setXmlFileContent(strXmlFileContent)
  }

  const [xmlFileContent, setXmlFileContent] = useState(null)
  function handleFileChange(event) {
    const file = event.target.files[0]
    readXmlFile(file)
      .then(xmlFileContent => {
        const strXmlFileContent = prettifyXml(new XMLSerializer().serializeToString(xmlFileContent.documentElement))
        setXmlFileContent(strXmlFileContent)
        setXmlInputContent(strXmlFileContent)
      })
      .catch(error => {
        console.error('Erreur de lecture du fichier XML:', error)
      })
  }

  function readXmlFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = event => {
        const xmlString = event.target.result
        const parser = new DOMParser()
        const xmlData = parser.parseFromString(xmlString, 'application/xml')
        resolve(xmlData)
      }
      reader.onerror = reject
      reader.readAsText(file)
    })
  }

  function handleButtonStbsXML(e) {
    dispatch(fetchAllStbXML())
  }

  function handleExampleXML(e) {
    e.preventDefault()
    setXmlInputContent(
      prettifyXml(`<?xml version="1.0" encoding="UTF-8"?><stb23:stb xmlns:stb23="http://univrouen.fr/stb23" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://univrouen.fr/stb23 stb23.tp2.xsd "><stb23:title>titre1</stb23:title><stb23:version>0.0</stb23:version><stb23:date>2001-12-31T12:00:00</stb23:date><stb23:description>description</stb23:description><stb23:client><stb23:entity>stb23:entity</stb23:entity><stb23:person gender="M." lastname="Tintin">Tintin</stb23:person><stb23:mail>tintin@mail.com</stb23:mail></stb23:client><stb23:team><stb23:member><stb23:person gender="M." lastname="Dupont">Dupont</stb23:person><stb23:mail>dupont@mail.com</stb23:mail><stb23:function>stb23:function</stb23:function></stb23:member><stb23:member><stb23:person gender="M." lastname="Milou">Milou</stb23:person><stb23:mail>milou@mail.com</stb23:mail><stb23:function>stb23:function</stb23:function></stb23:member></stb23:team><stb23:features><stb23:feature name="analyser la chasse" number="0" section="0"><stb23:description>statistiques de la chasse</stb23:description><stb23:priority>0</stb23:priority></stb23:feature></stb23:features></stb23:stb>`)
    )
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const xmlContent = xmlFileContent || xmlInputContent
    dispatch(sendStbXML({ xmlStb: xmlContent }))
  }

  const handleStbRemove = (id) => {
    dispatch(removeStbById(id))
  }


  return (
    <main className="container-fluid min-h-screen bg-slate-100 dark:bg-slate-800">
      <div className="flex">
        <Sidebar />
        <div className="p-4 sm:ml-64 w-4/5 mx-auto">
          <div className="relative overflow-x-auto">

          {error && (
            <Error value={error} />
            )}
            
            <div className="">
              <h1 className="mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Liste des&ensp;
                <span className="text-blue-600 dark:text-blue-500">STB</span> sur la base de données.
              </h1>
              <label htmlFor="table-search" className="sr-only">Rechercher une donnée de la STB</label>
              <div className="relative mb-2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"></path>
                  </svg>
                </div>
                <input type="text" id="table-search" name="table-search" onKeyUp={handleKeyUp} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Rechercher une stb" />
              </div>
            </div>
            {removeStb && (
                <div id="toast-danger" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Error icon</span>
                    </div>
                    <div className="ml-3 text-sm font-normal">La stb a été supprimé {removeStb}.</div>
                    <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
            )}
            <table id="table-data" className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" width="5%" className="px-6 py-3">
                            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          </th>
                          <th className="px-6 py-3">Identifiant</th>
                          <th className="px-6 py-3">Titre</th>
                          <th className="px-6 py-3">Description</th>
                          <th className="px-6 py-3">Date de validation</th>
                          <th className="px-6 py-3">Nom du client</th>
                          {/*
                            <th className="px-6 py-3">Membres</th>
                            <th className="px-6 py-3">Fonctionnalités</th>
                          */}
                          <th className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
              <tbody>
              {stbs.map((stb, index) => (
                      <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <td className="px-6 py-4"><input id={`default-checkbox-${index}`} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /></td>
                        <td className="px-6 py-4">{stb.id}</td>
                        <td className="px-6 py-4">{stb.title}</td>
                        <td className="px-6 py-4">{stb.description}</td>
                        <td className="px-6 py-4">{moment(stb.validationDate).format('DD/MM/YYYY à HH:mm')}</td>
                        <td className="px-6 py-4">{stb.clientName}</td>
                        <td className="px-6 py-4">
                          <Link to={`/stb/${stb.id}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Consulter
                          </Link>
                          <Link to={``} onClick={() => handleStbRemove(stb.id)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                            Supprimer
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleButtonStbsXML} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Consulter en XML
            </button>
            {xmlStbs && (
                <Editor value={xmlStbs} />
            )}
            <form>
              <h2 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl dark:text-white">Déposer une&ensp;
                <span className="text-blue-600 dark:text-blue-500">STB</span> au format XML.
              </h2>
              <div className="relative z-0 w-full mb-6 group">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Coller votre XML</label>
                <textarea id="message" rows="4"
                  value={xmlInputContent}
                  onChange={handleInputChange}
                  placeholder="Le contenu du XML"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>

                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="stb_xml">Déposer un fichier XML</label>
                <input
                  id="stb_xml" type="file" accept="text/xml" onChange={handleFileChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
                  {xmlFileContent && (
                    <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                      <span className="font-medium">Le fichier a été chargé, voici son contenu :</span>
                      <pre>{xmlFileContent}</pre>
                    </div>
                  )}
              </div>
              <button type="submit"
                onClick={handleFormSubmit}
                className="text-white m-0.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Envoyer</button>
              <button type="submit"
                onClick={handleExampleXML}
                className="text-white m-0.5 bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800">Exemple XML</button>
            </form>
            {xmlStbSent && (
              <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-gray-200 dark:bg-gray-800 dark:text-green-400 animate-pulse" role="alert">
                {data.xmlStbSent}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
  
    </main>
  )
}

export default Stbs
