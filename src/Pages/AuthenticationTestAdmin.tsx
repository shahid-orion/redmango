import React from 'react'
import { withAdminAuth } from '../HOC'

type Props = {}

const AuthenticationTestAdmin = (props: Props) => {
	return <div>This page can accessed by any logged in user is ADMIN</div>
}

export default withAdminAuth(AuthenticationTestAdmin)
