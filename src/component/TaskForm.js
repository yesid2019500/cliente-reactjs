import React from 'react';
import Swal from 'sweetalert2'
import {Button, Card, CardContent, CircularProgress, Grid, TextField, Typography} from '@mui/material'

import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom'




export const TaskForm = () => {

 
const [task, setTask] = useState({
    nombre: '',
    apellido1: '',
    apellido2: '',
    cedula: '',
    nombre2: '',
    pais: '',
    hora: '',
    email:''
});

// loaging
const [loading, setLoading] = useState(false);

// para poder enviar los datos al backedn
const [editing, setEditing] = useState(false);



// esta funsion es para redirecionar cuando enviemos una tarea
const navegation = useNavigate()


// params nos da informacion de la url
const params = useParams();




const handdleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const body = {...task, hora: new Date().toDateString()};
 


if (editing) {
    console.log('UPDATE')
  const response =  await fetch(`https://db-cliente.herokuapp.com/empleado/${params.id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(body)
    })
  const data = await response.json()
    // console.log(data)
}else{

   
const resp = await fetch('https://db-cliente.herokuapp.com/empleado', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {'Content-type': 'application/json'},
})

if (resp) {
    Swal.fire({
        title: 'success!',
        text: 'Usuario registrado' ,
        icon: 'success',
      }) 
  }


const response = await resp.json();

console.log(response)


const {nombre,nombre2, apellido1, apellido2, cedula,email} = await response.errors || ''

// console.log(nombre)


if (response.errors) {
    
    
        
 if (!nombre || !nombre2) {
    Swal.fire({
      title: 'Error!',
      text: 'El nombre no debe contener caracteres, ni debe ser mayor a 20 letras' ,
      icon: 'error',
    }) 
 
}


if (!apellido1 || !apellido2) {
  Swal.fire({
    title: 'Error!',
    text: 'El Apellido no debe contener caracteres, ni debe ser mayor a 20 letras' ,
    icon: 'error',
  }) 

  if (!email) {
    Swal.fire({
      title: 'Error!',
      text: 'El campo del mail u otro, no puede estar vacio' ,
      icon: 'error',
    }) 

}


  if (!cedula) {
      Swal.fire({
        title: 'Error!',
        text: 'El campo de la cedula u otro, no puede estar vacio' ,
        icon: 'error',
      }) 

  }

}



    }


}



 setLoading(false)
//  nevia al inicio
 navegation('/')
};




// esta funsion envia los datos
const handdleChange = (e) => 
   
    setTask({...task, [e.target.name]: e.target.value})



const loadTask = async (id) => {
  const res = await fetch(`https://db-cliente.herokuapp.com/empleado/${id}`)
 const data = await res.json()
  

setTask({email:data.email,nombre:data.nombre, apellido1: data.apellido1, apellido2: data.apellido2,nombre2: data.nombre2, pais: data.pais, hora: data.hora})
setEditing(true)

    

}



useEffect(()=> {
// console.log(params)
if (params.id) {
    // console.log('fetch task')
    loadTask(params.id)
 }
},[params.id])  





  return (
    <>
       
    <Grid container  alignItems='center' justifyContent='center' >
       <Grid item xs={4} >
            <Card
                sx={{mt: 5}} style={{
                    backgroundColor: '#1e272e',
                    padding: '1rem'
                }} >

                    
                <Typography variant='5' textAlign='center' color='#fff' >
                   { editing ? "Edit Task" : "Create Task" }
                </Typography>

                <CardContent>
                    <form onSubmit={handdleSubmit} >
                <TextField 
                    variant='filled'
                   label='Escriba un primer nombre'
                   sx={{
                       display:'block',
                       margin: '.5rem 0'
                        }}
                    
                 InputProps={{style:{color:"white"}}}
                  InputLabelProps={{style:{color:"white"}}}
                    name='nombre'
                    value={task.nombre}
                    onChange={handdleChange} 
                />

                <TextField 
                    variant='filled'
                   label='Escribe un primer apellido'
                   multiline
                   rows={2}

                   sx={{
                    display:'block',
                    margin: '.5rem 0'
                     }}

                     InputProps={{style:{color:"white"}}}
                     InputLabelProps={{style:{color:"white"}}}
                     name='apellido1'
                     value={task.apellido1}
                     onChange={ handdleChange }
                />

                <TextField 
                    variant='filled'
                   label='Escribe un segundo apellido'
                   multiline
                   rows={2}

                   sx={{
                    display:'block',
                    margin: '.5rem 0'
                     }}

                     InputProps={{style:{color:"white"}}}
                     InputLabelProps={{style:{color:"white"}}}
                     name='apellido2'
                     value={task.apellido2}
                     onChange={ handdleChange }
                />

                    <TextField 
                    variant='filled'
                   label='Escribe un segundo nombre'
                   multiline
                   rows={2}

                   sx={{
                    display:'block',
                    margin: '.5rem 0'
                     }}

                     InputProps={{style:{color:"white"}}}
                     InputLabelProps={{style:{color:"white"}}}
                     name='nombre2'
                     value={task.nombre2}
                     onChange={ handdleChange }
                />

            <TextField 
                    variant='filled'
                   label='Escribe un email'
                   multiline
                   rows={2}

                   sx={{
                    display:'block',
                    margin: '.5rem 0'
                     }}

                     InputProps={{style:{color:"white"}}}
                     InputLabelProps={{style:{color:"white"}}}
                     name='email'
                     value={task.email}
                     onChange={ handdleChange}
                />


                <TextField 
                    variant='filled'
                   label='Escriba un pais'
                   multiline
                   rows={2}

                   sx={{
                    display:'block',
                    margin: '.5rem 0'
                     }}

                     InputProps={{style:{color:"white"}}}
                     InputLabelProps={{style:{color:"white"}}}
                     name='pais'
                     value={ task.pais }
                     onChange={ handdleChange }
                />

            <TextField 
                    variant='filled'
                   label='Escriba una cedula'
                   multiline
                   rows={2}

                   sx={{
                    display:'block',
                    margin: '.5rem 0'
                     }}

                     InputProps={{style:{color:"white"}}}
                     InputLabelProps={{style:{color:"white"}}}
                     name='cedula'
                     value={task.cedula}
                     onChange={ handdleChange }
                />


                <Button variant='contained' color='success' type='submit'
                 disabled={!task.nombre || !task.apellido1 || !task.nombre2 || !task.apellido2 || !task.pais || !task.cedula || !task.email  } >
                  {
                      loading ? <CircularProgress color='success' size={24} />
                      : 'Guardar'
                  }
                </Button>

                  
                    </form>
                </CardContent>
            </Card>
       </Grid>
   </Grid>
    </>
  )
};
