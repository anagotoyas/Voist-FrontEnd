import { useAuth } from '../context/AuthContext'



export const HomePage = () => {

    const { user } = useAuth()

  return (
    <div>{JSON.stringify(user )}</div>
  )
}
