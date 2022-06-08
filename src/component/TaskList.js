
import React, {useEffect, useState} from 'react';
import { Button, Card, CardContent, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import '../index.css';


export const TaskList = () => {


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  


    const [task, setTask] = useState([]);
    const [busqueda, setBusqueda]= useState("");
    const [tablaUsuarios, setTablaUsuarios]= useState([]);

   const navegation = useNavigate()



const loadTask = async () => {
  const response = await fetch('https://db-cliente.herokuapp.com/empleado')
  const data = await response.json()
  console.log(data)
setTask(data)
setTablaUsuarios(data);

}



// vamos a eliminar por ledio del id
const handdleDelete = async (id) => {
 try {
        // console.log(id)
 const res = await fetch(`https://db-cliente.herokuapp.com/empleado/${id}`, {
    method: "DELETE",
})



setTask(task.filter( tasks => tasks.id !== id))
 } catch (error) {
     console.log(error)
 }

}





const handleSearch = (e) => {
  console.log('busqueda', e.target.value)
  setBusqueda(e.target.value)
  filtrar(e.target.value)
}

const filtrar=(terminoBusqueda)=>{
  var resultadosBusqueda=tablaUsuarios.filter((elemento)=>{
    if(elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    || elemento.cedula.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    ){
      return elemento;
    }
  });
  setTask(resultadosBusqueda);
}

// esta se va ejecutar cuando cargue el componente
useEffect( ()=> {
  loadTask()
  },[])

  return (
    <div>
      <h1>Empleados</h1>
      <input type="text"
       value={busqueda}
        
        onChange={handleSearch}
        />

             <Button 
            variant='contained'
             color='warning'>
                Buscar
                        </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell align="right">Primer Apellido</StyledTableCell>
              <StyledTableCell align="right">Segundo Apellido</StyledTableCell>
              <StyledTableCell align="right">Otro Nombre</StyledTableCell>
              <StyledTableCell align="right">Cedula</StyledTableCell>
              <StyledTableCell align="right">Correo</StyledTableCell>
              <StyledTableCell align="right">Hora</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>


            </TableRow>
          </TableHead>
          <TableBody>


          {
          task.map(tasks => {
              return (
                <StyledTableRow key={tasks.id}>
                  <StyledTableCell component="th" scope="row">
                    {tasks.nombre}</StyledTableCell>

                  <StyledTableCell align="right">{tasks.apellido1}</StyledTableCell>
                  <StyledTableCell align="right">{tasks.apellido2}</StyledTableCell>
                  <StyledTableCell align="right">{tasks.nombre2}</StyledTableCell>
                  <StyledTableCell align="right">{tasks.cedula}</StyledTableCell>
                  <StyledTableCell align="right">{tasks.email}</StyledTableCell>
                  <StyledTableCell align="right">{moment(tasks.hora).format('DD/MM/yyyy')}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button 
                      variant='contained' 
                      color='inherit' 
                      onClick={()=> 
                      navegation(`/tasks/${tasks.id}/edit`) }
                    >
                      Edit
                    </Button>
                    <Button 
                      variant='contained' 
                      color='error' 
                      onClick={() => 
                      handdleDelete(tasks.id)} 
                      style={{marginLeft: '.5rem'}}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              )
            })
            
            }

          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}