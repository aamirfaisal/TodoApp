import { createSlice } from "@reduxjs/toolkit";

const allTaskReducer = createSlice({
    name: "allTask",
    initialState: { AddTask: [] },
    reducers: {
        addTask: (state, action) => { state.AddTask.push(action.payload) },
        removeTask: (state, action) => {
            const NewTaskList = state.AddTask.filter((v) => v.id !== action.payload.id);
            state.AddTask = NewTaskList;
        },
        updateTask: (state, action) => {
            const index = state.AddTask.findIndex((v) => v.id === action.payload.id)
            const newList = [...state.AddTask]
            newList.splice(index, 1, action.payload)
            state.AddTask = newList
        },
    }
})

export const { addTask, removeTask, updateTask } = allTaskReducer.actions;
export default allTaskReducer.reducer;


// const Array_obj = [ { id: 0, name: 'David' },{ id: 1, name: 'John' },];
// const upd_obj = Array_obj.map(obj => {
//     if (obj.id == 1) {
//         obj.name = 'Harry';
//     }
//     return obj;
// })
// console.log(upd_obj);