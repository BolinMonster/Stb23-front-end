import { faWifi } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
  
const Error = ({ value }) => {
	return (
		<section className="flex items-center min-h-screen p-16 bg-slate-100 dark:bg-slate-800 dark:text-gray-100">
			<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
				<div className="max-w-md text-center">
					<FontAwesomeIcon icon={faWifi} size="2x" className="animate-ping" />
					<p className="mt-2 animate-pulse text-red-800 dark:text-red-500">{value}</p>
				</div>
			</div>
		</section>
	)
}

Error.propTypes = {
	value: PropTypes.string
}

export default Error
