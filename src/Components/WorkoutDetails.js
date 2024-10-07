import { useWorkoutsContext } from "../hooks/useWorkoutsContect"

//date fns
import { formatDistanceToNow } from 'date-fns';

const WorkoutDetails = ({ workout }) => {
const { dispatch } = useWorkoutsContext()

    const handleClick = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
          dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }
    return (
        
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>artist:</strong> {workout.artist}</p>
            <p><strong>album: </strong>{workout.album}</p>
            <p><strong>genre: </strong>{workout.genre}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className = "material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
} 
export default WorkoutDetails



// import { useState } from 'react';
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
// import { formatDistanceToNow } from 'date-fns';
// import WorkoutForm from './workoutForms';  // Import the WorkoutForm for updates

// const WorkoutDetails = ({ workout }) => {
//   const { dispatch } = useWorkoutsContext();
//   const [isEditing, setIsEditing] = useState(false);  // State to toggle edit mode

//   // Handle delete action
//   const handleClick = async () => {
//     const response = await fetch('/api/workouts/' + workout._id, {
//       method: 'DELETE',
//     });
//     const json = await response.json();

//     if (response.ok) {
//       dispatch({ type: 'DELETE_WORKOUT', payload: json });
//     }
//   };

//   // Toggle the editing mode
//   const handleEditClick = () => {
//     setIsEditing((prev) => !prev);
//   };

//   return (
//     <div className="workout-details">
//       {isEditing ? (
//         // Render the WorkoutForm with existing song details for updating
//         <WorkoutForm existingSong={workout} />
//       ) : (
//         <>
//           <h4>{workout.title}</h4>
//           <p><strong>Artist:</strong> {workout.artist}</p>
//           <p><strong>Album:</strong> {workout.album}</p>
//           <p><strong>Genre:</strong> {workout.genre}</p>
//           <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
          
//           <div className="actions">
//             <span className="material-symbols-outlined" onClick={handleClick}>
//               delete
//             </span>
//             <span className="material-symbols-outlined" onClick={handleEditClick}>
//               edit
//             </span>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default WorkoutDetails;