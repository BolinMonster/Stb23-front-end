import { useEffect, useRef, useState } from 'react'
import { EditorState } from '@codemirror/state'
import { EditorView, basicSetup } from 'codemirror'
import { xml } from '@codemirror/lang-xml'
import { oneDark } from '@codemirror/theme-one-dark'
import PropTypes from 'prop-types'
import { prettifyXml } from '../utils/xmlUtil'


export const Editor = ({ value }) => {

  const editorRef = useRef(null)
  const [editorValue, setEditorValue] = useState(prettifyXml(value) || '')
  const [isCopied, setIsCopied] = useState(false)


	useEffect(() => {
		if (editorRef.current) {
      const startState = EditorState.create({
      doc: editorValue ? prettifyXml(editorValue) : '',
			extensions: [
			basicSetup,
			EditorView.editable.of(true),
				xml(),
				oneDark, 
			],
		})
		const view = new EditorView({
			state: startState,
      parent: editorRef.current,
      dispatchTransaction(transaction) {
        const newState = view.state.update(transaction)
        view.update([transaction])
        setEditorValue(newState.doc.toString())
      },
    })
      
		return () => {
			view.destroy()
		}
		}
  }, [editorValue])
  useEffect(() => {
    setEditorValue(editorValue || '')
  }, [editorValue])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(editorValue)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 3000)
  }


  return (
    <div className="mt-2"> 
      <button onClick={copyToClipboard} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        {isCopied ? 'Copié' : 'Copier'}
      </button>
      <div ref={editorRef} />
    </div>
  )
}

Editor.propTypes = {
  value: PropTypes.string
};