import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Button, Checkbox, IconButton, Input, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
const TodoList = () => {
   const [list,setList]=useState(["create app",'write essay','call manager'])
   const [inp,setInp]=useState("")
   const [checked, setChecked] = React.useState([0]);
   const [indexs, setIndexs] =useState([])
   const deleteAll=()=>{
    setList([])
    checked.length=1
   }
   const addTasks=()=>{
    if(inp){
      setList([...list,inp])
    setInp("")
    }
   }
   const handleToggle = (value) => () => {
     const currentIndex = checked.indexOf(value);
     const newChecked = [...checked];
     if (currentIndex === -1) {
       newChecked.push(value);
     } else {
       newChecked.splice(currentIndex, 1);
     }
     setChecked(newChecked);
   };

   const deleteTask = (value) => {
   const filtered=list.filter((item) => item !== value);
   setList(filtered)
  };
    return <div>
       <Container sx={{width:'100%'}}>
        <Box sx={{ bgcolor: '#f1f8e9', height: '100vh', }} >
            <Box component='div' sx={{ zIndex:-1,backgroundImage: `url(${process.env.PUBLIC_URL}/image/Background.png)`, backgroundSize: 'cover', backgroundPosition: 'center', height: '290px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            />
            <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
              <Box component='div' sx={{position:"relative",zIndex:2 ,width:"600px", height:"100px",marginTop:'-350px'}}>
              <Box sx={{fontSize: 64,fontFamily: 'Monospace',fontWeight: 'bold',paddingY:"16px",color:'white'}} >TODO</Box>
             
             <Box sx={{bgcolor:"background.paper",marginBottom:'16px',height:"64px",display:'flex',justifyContent:'center',alignItems:'center',justifyContent:'space-around'}}>
              <Input name='inp' value={inp} onChange={(e)=>{setInp(e.target.value)}} placeholder='Add Tasks' sx={{width:'70%',height:"100%"}}/>
              <AddIcon onClick={addTasks} sx={{color:"white",width:'40px',height:'40px',bgcolor:'#2979ff'}}/>
             </Box>
             
              <Box sx={{width:"`100%",height:"30vh"}}>
               <List sx={{ width: '100%',  bgcolor: 'background.paper' }}>
      {list.map((value,index) => {
        const labelId = `checkbox-list-label-${value}`;

        return (<ListItem
          sx={{borderBottom:1,borderColor: 'grey.500',width:"580px"}}
            key={value}
            secondaryAction={
              <IconButton edge="end" aria-label="comments" >
               <DeleteIcon onClick={()=>deleteTask(value)}  sx={{color:'red'}}/>
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1 } 
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  onClick={()=>{setIndexs([...indexs,index])}}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${index+1}.${value }`} sx={indexs.includes(index)?{textDecoration:"line-through"}:"null"} />
            </ListItemButton>
          </ListItem>
        );
      })}
      <ListItem sx={{display:'flex',flexDirection:"row",justifyContent:"space-between"}}>
        <Box>Umumi tapsiriq:{list.length} Hazir tapsiriq:{checked.length-1}</Box>
        <Button variant="text" size='small' onClick={deleteAll}  >Hamisini sil</Button>
      </ListItem>
    </List>
              </Box>
            </Box>
            </Box>
        </Box>
      </Container>
    </div>;
}

export default TodoList;