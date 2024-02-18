import React from 'react'
import { withAuth } from '../HOC'

type Props = {}

const AuthenticationTest = (props: Props) => {
	return <div>This page can accessed by any logged in user</div>
}

export default withAuth(AuthenticationTest)
