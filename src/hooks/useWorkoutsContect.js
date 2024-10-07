import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)
if (!context){
    throw Error ('useWorkoutsContext must be used inside an WorkoutContextProvider' )
}

    return context
}



// hooks/useWorkoutsContext.js
// import { useContext } from 'react';
// import { WorkoutsContext } from '../context/WorkoutContext';

// export const useWorkoutsContext = () => {
//   const context = useContext(WorkoutsContext);

//   if (!context) {
//     throw new Error('useWorkoutsContext must be used within a WorkoutsContextProvider');
//   }

//   return context;
// };