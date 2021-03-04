import React from "react";
import Box from "@material-ui/core/Box";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import { InputBase } from '@material-ui/core';
const useStyles = makeStyles({
    inputBox:{
        border:'1px solid rgb(197, 215, 189)',
        padding:'5px',
        width:'500px!important',
        
        backgroundColor:'#fff',
    },
    todoBox:{
        background:'white',
        width:'500px',
        marginTop:'1rem',
        borderRadius:'5px',
        color:'#555',
        padding:'10px',
        fontSize:'12px',
    },
    userName:{
        position:'relative',
        bottom:'8px',
        fontSize:'1.5em'
    },
    iconsContainer:{
        marginTop:'.8rem',
    },
    usernameBox:{
        border:'1px solid #555',
        width:'420px',
        padding:'5px',
        borderRadius:'5px',
    }
    
});

const PopUp=()=>{
    const classes=useStyles();
    const [usernameVal,setUsernameVal]=React.useState('');
    return (
        <Box id="overlay" style={{
            position:'absolute',
            top:0,
            right:0,
            left:0,
            bottom:0,
            width:'100%',
            height:'100vh',
            backgroundColor:'rgba(0,0,0,0.8)',
            zIndex:200,
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            
        }}>
        <Box style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            width:'420px',
            padding:'40px',
            backgroundColor:'#fff',
            flexDirection:'column',
        }}>
            <InputBase placeholder="What username you want use..?" variant="outlined" value={usernameVal} onChange={(e)=>{
                setUsernameVal(e.target.value);
            }} id="username" className={classes.usernameBox}></InputBase>
            <Box style={{width:'100%',marginTop:'2rem'}}>
                <Button variant="contained" color="primary" style={{width:'45%'}} onClick={()=>{
                    localStorage.setItem("name", usernameVal);
                    document.querySelector("#overlay").style.display="none";
                }}>Continue &nbsp;
                 <span class="material-icons">
                    logout
                </span></Button>
                <Button variant="contained" color="secondary" style={{width:'45%',float:'right'}} onClick={()=>{
                    document.querySelector("#overlay").style.display="none";
                }}>Go with Default
                <span class="material-icons">
                   logout
                </span>
                </Button>
            </Box>
        </Box>
        </Box>
    );

}
const TodoApp=()=>{
    const classes=useStyles();
    const [todoText, setTodoText] = React.useState([]);
    const [todoTextVal , setTodoTextVal]=React.useState('');
    const [username,setUsername]=React.useState('');
    const handleAdd=()=>{
        setTodoText(previousTodo=>[...previousTodo,todoTextVal]);
        setTodoTextVal('');
        let usenameXP=localStorage.getItem("name").length<1?'Test user' : localStorage.getItem("name");
        setUsername(usenameXP);
    }
    const handleOnChnageInput=(e)=>{
        setTodoTextVal(e.target.value);
    }
    React.useEffect(()=>{
        // console.log(todoText);
    })
    window.onload=()=>{

    }
    return (
        <Box bgcolor="secondary.main" width={1} height="100vh">
            <PopUp/>
            <Box style={{
                fontSize:'4em',
                color:'white',
                textTransform:'uppercase',
                letterSpacing:'1.2px',
                fontWeight:600
            }} display="flex" justifyContent="center" >
            <Grid container spacing={2} style={{margin:'10px 0'}}   justify="center" alignItems="center"  width={1}>
                <Grid item lg={6} md={6} xs={12} >
                <Paper  style={{background:'#3f51b5',textAlign:'center',color:'#fff',fontSize:'40px'}} >React Todo App</Paper>
                </Grid>    
            </Grid>
        </Box>
        <Box style={{
                fontSize:'4em',
                color:'white',
                textTransform:'uppercase',
                letterSpacing:'1.2px',
                fontWeight:600
            }} display="flex" justifyContent="center" >
            <Grid container spacing={2} style={{margin:'10px 0'}}   justify="center" alignItems="center"  width={1}>
                <Grid item lg={8} md={6} xs={12} >
                <Box display="flex" justifyContent="center">
                <InputBase required id="todo-text" placeholder="What you want to add...?" value={todoTextVal} onChange={handleOnChnageInput} variant="outlined" style={{marginRight:'1rem',width:'420px',borderColor:'red!important'}}
                className={classes.inputBox}
                />
                {
                todoTextVal.length>2 ?
                <Button variant="contained" color="primary" onClick={handleAdd}>
                <span className="material-icons" style={{fontSize:'30px',position:'absolute',left:'50',
                }}>send</span>
                </Button>
                :''
                }
                </Box>
                </Grid>
                <Grid item lg={8} md={6} xs={12} >
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" >
                    {
                        todoText.map((todoElement)=>{
                            return (
                                <Box className={classes.todoBox} id="nb">
                                    <span className="material-icons" style={{fontSize:'2em'}}>
                                        person_pin
                                    </span>
                                    <span className={classes.userName}>{username}</span>
                                    <Box className="xo" style={{
                                        margin:'.5rem 0',
                                        marginBottom:'1rem'
                                    }}>
                                    {todoElement}   
                                    </Box>
                                    <Box className={classes.iconsContainer}>
                                    <Button variant="contained" color="secondary" style={{marginRight:'.5rem'}} onClick={(e)=>{
                                        let todoValue=e.target.closest("#nb");
                                        todoValue.style.display="none";
                                    }}><span className="material-icons" >
                                        delete_forever
                                    </span></Button>
                                    <Button variant="contained" color="primary"><span className="material-icons" >
                                            border_color
                                    </span></Button>
                                    </Box>
                                    
                                </Box>
                            );
                        })
                    }
                </Box>
                </Grid> 
            </Grid>
        </Box>
        </Box>

    );
}
export default TodoApp;