import React from 'react'

type Props = {}

const Footer = (props: Props) => {
	return (
		<div className='footer fixed-bottom text-center p-3 bg-dark text-white mt-5'>
			&copy; Made with <i className='bi bi-heart-fill'></i> by DotNetMastery
		</div>
	)
}

export default Footer
