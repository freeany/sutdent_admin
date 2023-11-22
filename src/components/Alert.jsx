import React from 'react'

export default function Alert(props) {
	return (
		<div className={['alert', 'alert-dismissible', 'alert-' + props.type].join(' ')} role="alert">
			<button type="button" className="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
			<strong>{props.type}!</strong> {props.message}
		</div>
	)
}
