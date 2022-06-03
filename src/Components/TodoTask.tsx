import React from 'react'
import { ITask } from "../Interfaces";
import { AppBar, Toolbar, Typography, Stack, Button, TextField, Checkbox, Box, FormLabel, RadioGroup, Radio, Divider, Container, Grid, Paper, Icon } from "@mui/material"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import { IconButton } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import * as MuiNavbarConstant from "./MuiNavbar"


interface Props {
    task: ITask;
    deleteTask(taskNameToDelete: string): void;
}

export const TodoTask =({ task, deleteTask }: Props) => {

    const [flag, setFlag] = React.useState(true);

    const completeTask = (tasktoComplete: string): void => {
        setFlag(!flag);
    }

    return (
        <>

        <Card elevation = {6} sx={{marginTop: "2%"}} style={{backgroundColor: flag ? "inherit" : "lightgreen"}}>
            <CardHeader
                action={ flag ? 
                    "" :
                    <Icon>
                    <CheckOutlinedIcon/>
                    </Icon>
                }
                title={flag ? "Title: " + task.taskName : "COMPLETED Title: " + task.taskName}
                subheader={flag ? "Days left: " + task.deadline : "Days left: O"}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary">
                    {"Description: " + task.description}
                </Typography>
            </CardContent>
            <CardActions>

                <IconButton onClick={() => {
                    completeTask(task.taskName);
                }}>
                    <AssignmentTurnedInOutlinedIcon/>
                </IconButton>

                <IconButton onClick={() => {
                    deleteTask(task.taskName); setFlag(true);
                }}>
                    <DeleteOutlinedIcon/>
                </IconButton>
            </CardActions>
        </Card>
        </>
    )
}

export default TodoTask