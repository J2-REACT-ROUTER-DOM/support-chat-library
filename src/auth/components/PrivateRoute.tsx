import { Navigate } from "react-router"

interface PrivateRouteProps {
    isAuthenticated: boolean
    children: React.ReactNode
}

export const PrivateRoute = ({isAuthenticated, children}: PrivateRouteProps) => {
    if (!isAuthenticated) {
        return <Navigate to="/auth" />
    }
    //! Si el usuario esta autenticado, se renderiza el componente children
    return children
}
