import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContect"
//components
 import WorkoutDetails from '../Components/WorkoutDetails'
import WorkoutForm from "../Components/WorkoutForm"

const Home = () => {

    const {workouts, dispatch} = useWorkoutsContext()


    // const[workouts, setWorkouts] = useState(null)
    useEffect(() => {
     const fetchWourkouts = async () => {
        const response =await fetch( '/api/workouts')
    const json = await response.json()
    
    if ( response.ok){
       
       dispatch({type: 'SET_WORKPUTS', payload: json})
       
        // setWorkouts(json)
    }
    }

     fetchWourkouts()
    }, [dispatch])
    return (
        
        <div className="Home">
       
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                  <WorkoutDetails key={workout._id} workout={workout} />
                ))} 

            </div>
            
            <WorkoutForm />
        </div>
        
    )
}
export default Home


