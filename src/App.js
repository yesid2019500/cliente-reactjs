import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {TaskList}  from './component/TaskList';
import  {Navbar}  from './component/Navbar';
import React from 'react';
import { TaskForm } from './component/TaskForm';

// material UI
import {Container } from '@mui/material'
// heroku git:remote -a react-empleados-test


 const App = () => {
   return (
     
    <BrowserRouter>
      <Navbar/>
        <Container>
        <Routes>
        <Route path='/' element={<TaskList/>} />
        <Route path='tasks/new' element={ <TaskForm/> } />
       <Route path='tasks/:id/edit' element={<TaskForm/>} />
      </Routes>
      </Container>
 </BrowserRouter>
   )
 };
 
 export default App;
 