import { AppBar, Tabs, Tab, Typography } from '@material-ui/core';
import {Box} from '@mui/material'
import { TabContext, TabPanel } from '@material-ui/lab';
import React, { useState } from 'react'
import ListaPostagens from '../listaPostagens/ListaPostagens';
import ListaTemas from '../../temas/listaTemas/ListaTemas';
import Carousel from '../../carousel/Carousel';

function TabPostagens() {
  const [value, setValue] = useState('1')
    function handleChange(event: React.ChangeEvent<{}>, newValue: string){
        setValue(newValue);
    }
  return (
    <>
      <TabContext value={value}>
        <AppBar position="static">
          <Tabs centered indicatorColor="secondary" onChange={handleChange}>
            <Tab label="Todas as postagens" value="1"/>
            <Tab label="Sobre-nós" value="2" />
          </Tabs>
        </AppBar>
        <TabPanel value="1" >
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <ListaPostagens />
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className="titulo">Sobre-nós</Typography>
          <Carousel />
        </TabPanel>
      </TabContext>
    </>
  );
}

export default TabPostagens