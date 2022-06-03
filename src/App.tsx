import React, {FC, ChangeEvent, useState} from 'react';
import {ITask} from './Interfaces';
import { TodoTask } from './Components/TodoTask';
import { Button, Container, Input, Box, Typography, Grid, Paper, TextField } from '@mui/material';
import Header from './Components/Header';
import { createTheme } from '@mui/material/styles';
import { styled } from "@mui/material/styles";
import { MuiNavbar } from './Components/MuiNavbar'
import { MuiFilterBar } from './Components/MuiFilterBar'


const App: FC = () => {
  return (
    <>
    <MuiNavbar />
    </>
  );
}

export default App;
