import { useAuth } from '../context/AuthContext'



export const HomePage = () => {

    const { user } = useAuth();
    // console.log(user)

  return (
    <div>
      {JSON.stringify(user )}
      </div>
  )
}
