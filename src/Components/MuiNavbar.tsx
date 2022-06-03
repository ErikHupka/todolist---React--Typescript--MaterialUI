import { AppBar, Toolbar, Typography, Stack, Button, TextField, Checkbox, Box, FormLabel, RadioGroup, Radio, Divider, Container, Grid } from "@mui/material"
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';
import { useState, FC, ChangeEvent, useEffect } from 'react';
import {ITask} from '../Interfaces';
import TodoTask from './TodoTask';
import axios from 'axios';





export const MuiNavbar = () => {

      const [task, setTask] = useState<string>("");
      const [description, setDescription] = useState<string>("");
      const [deadline, setDeadline] = useState<number>(0);
      const [isDone, setIsDone] = useState<boolean>(false);
      const [todoList, setTodoList] = useState<ITask[]>([]);
      const url = "https://629a0ec66f8c03a9784fa876.mockapi.io/ToDoItems";
      
      useEffect(() => {
            {axios.get(url).then(response => {
                  createAPI(response.data)
            })}
      }, []);
 

      const createAPI = (dataAPI:  any): void => {
            let todoListTest: ITask[] = []
                  // max 50
            for(let x=1; x<10; x++)
            {
                  const newTask = {taskName: dataAPI[x].Name, description: dataAPI[x].Description, deadline: dataAPI[x].deadline, isDone: dataAPI[x].isDone};
                  todoListTest = [...todoListTest, newTask]
                  setTodoList([...todoListTest]);
            }
      }

      const addTask = (): void => {
            if(task != "" && deadline > 0)
            {
                  const newTask = {taskName: task, description: description, deadline: deadline, isDone: isDone};
                  setTodoList([newTask, ...todoList]);
                  setTask("");
                  setDeadline(0);
                  setDescription("");
            }
            else{
                  if (task == "" &&  deadline <=0 ) {
                        alert("Name can not be empty and Deadline must be greate than 0")
                  }
                  else if (task == ""){
                        alert("Name can not be empty");
                  }
                  else{
                        alert("Deadline must be greater than 0")
                  }
            }
          };

      const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
      if (event.target.name == "task") {
            setTask(event.target.value)
      }
      else if (event.target.name == "description") {
            setDescription(event.target.value)
      }
      else {
            setDeadline(Number(event.target.value));
      }
      };

      const deleteTask = (taskNameToDelete: string): void => {
            setTodoList(todoList.filter((task) => {
              return task.taskName != taskNameToDelete;
            }))
          } 

      
    const [value, setValue] = useState('All')
    const handleChangeFilter =(event: React.ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value)
    } 

      return (
      <>
            <AppBar position="static" color="secondary">
                  <Toolbar> 
                        <Typography variant="h5" component='div' sx={{ flexGrow: 1 }}>
                              Create new item
                        </Typography>

                        <Stack direction ='row' spacing = {2}>

                              <TextField name = "task" size="small" label="Name" type ="text" value = {task} onChange = {handleChange}></TextField>

                              <TextField name = "description" size="small" label="Short note" type="text" value = {description} onChange = {handleChange}></TextField>      

                              <TextField name = "deadline" size="small" label="Deadline (Days)" type="number" value = {deadline} onChange = {handleChange}></TextField>

                              <Button 
                              color = 'inherit' 
                              variant= "outlined" 
                              size="small" 
                              onClick = {addTask}
                              startIcon={<AddBoxIcon />}>
                              Create
                              </Button>
                        </Stack>
                  </Toolbar> 
            </AppBar>



            <AppBar position="static" color="secondary" sx={{marginTop: "2px"}}>
                  <Toolbar id="Toolbard2" sx={{
                        justifyContent: "space-between", 
                        backgroundColor:"darkgreen",
                        display: {xs: "flex"}}}>
                        
                        <Box>
                              <Stack direction="row">
                                    <Typography variant="h5" component='div' sx={{ flexGrow: 1 }}>
                                          My TODO List
                                    </Typography> 
                              </Stack>
                        </Box>
                        <Stack direction="row" spacing ={2}>
                              <RadioGroup name='status' aria-labelledby='status-filter' value={value} onChange={handleChangeFilter} row>
                                    <FormControlLabel control={<Radio />} label='All' value='All'/>
                                    <FormControlLabel control={<Radio />} label='Active' value='Active'/>
                                    <FormControlLabel control={<Radio />} label='Completed' value='Completed'/>
                              </RadioGroup>
                              
                              <TextField size="small" label="Look for" variant="outlined"></TextField>
                              <Button startIcon={<SearchIcon />}>
                                    Find
                              </Button>
                        </Stack>
                  </Toolbar>
            </AppBar>


            <Grid container 
                  row-gap={10} 
                  sx={{marginTop: "2%"}}
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="center">
                  <Container>
                        <Grid item>
                              {todoList.map((task: ITask, key: number) => {
                              return <TodoTask key = {key} task = {task} deleteTask = {deleteTask}/>;
                              })}
                        </Grid>
                  </Container>
            </Grid>

      </>
      )
}