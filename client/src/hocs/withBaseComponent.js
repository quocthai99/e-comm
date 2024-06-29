import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const withBaseComponent = (Component) => (props) => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    
    
    return <Component {...props} navigate={navigate} location={location} dispatch={dispatch} />
}

export default withBaseComponent