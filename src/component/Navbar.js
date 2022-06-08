import {Link, useNavigate} from 'react-router-dom';
import { AppBar, Box, Button, Container, Toolbar, Typography, } from '@mui/material'

export const Navbar = () => {

    const navegation = useNavigate()

  return (
       <Box sx={{flexGrow:1}}>
           <AppBar position='static' color='transparent'>
               <Container>
                    <Toolbar>
                        <Typography variant='h6' sx={{flexGrow:1}}>
                           <Link to='/' style={{textDecoration:'none', color:'#eee'}}>Cidenet</Link>
                        </Typography>
                        <Button variant='contained' color='warning' onClick={ ()=> navegation('/tasks/new')}>
                            Agregar empleado
                        </Button>
                    </Toolbar>
               </Container>
           </AppBar>
       </Box>
  )
};
