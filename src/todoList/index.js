import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import { Button, Checkbox, IconButton, Input, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

const TodoList = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [list, setList] = useState([
    { id: 1, text: "create app" },
    { id: 2, text: "write essay" },
    { id: 3, text: "call manager" },
  ]);
  const [inp, setInp] = useState("");
  const [checked, setChecked] = useState([]);
  const [indexs, setIndexs] = useState([]);
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const deleteAll = () => {
    setList([]);
    setChecked([]);
    setIndexs([]);
  };

  const addTasks = () => {
    if (inp) {
      setList([...list, { id: Date.now(), text: inp }]);
      setInp("");
    }
  };

  const handleToggle = (itemId) => () => {
    const currentIndex = checked.indexOf(itemId);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(itemId);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    setIndexs((prevIndexs) => {
      if (currentIndex === -1) {
        return [...prevIndexs, itemId];
      } else {
        return prevIndexs.filter((index) => index !== itemId);
      }
    });
  };

  const deleteTask = (itemId) => {
    const filteredList = list.filter((item) => item.id !== itemId);
    setList(filteredList);
    setChecked((prevChecked) => prevChecked.filter((itemIdChecked) => itemIdChecked !== itemId));
    setIndexs((prevIndexs) => prevIndexs.filter((index) => index !== itemId));
  };
  const handleMouseEnter = (itemId) => {
    setHoveredItemId(itemId);
  };
  
  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  return (
    <div>
      <Container sx={{ width: '100%' }}>
        <Box sx={{ bgcolor: ' rgb(241, 248, 233)', height: '100vh', }}>
          <Box component='div' sx={{ zIndex: -1, backgroundImage: `url(${process.env.PUBLIC_URL}/image/Background.png)`, backgroundSize: 'cover', backgroundPosition: 'center', height: '290px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box component='div' sx={{ position: "relative", zIndex: 2, width: "600px", height: "100px", marginTop: '-350px' }}>
              <Box sx={{ fontSize: 64, fontFamily: 'Monospace', fontWeight: 'bold', paddingY: "16px", color: 'white' }} >TODO</Box>

              <Box sx={{ bgcolor: "background.paper", marginBottom: '16px', height: "64px", display: 'flex', justifyContent: 'center', alignItems: 'center', justifyContent: 'space-around' }}>
                <Input name='inp' value={inp} onChange={(e) => { setInp(e.target.value) }} placeholder='Tapşırığı daxil edin' sx={{ width: '70%', height: "100%" }} />
                <AddIcon onClick={addTasks} sx={{ color: "white", width: '40px', height: '40px', bgcolor: '#2979ff' }} />
              </Box>

              <Box sx={{ width: "`100%", height: "30vh" }}>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  {list.map((item) => {
                    const labelId = `checkbox-list-label-${item.id}`;

                    return (
                      <ListItem
                        sx={{ borderBottom: 1, borderColor: 'grey.500', width: '580px' ,position: 'relative'}}
                        key={item.id}
                        secondaryAction={
                          <IconButton edge="end" aria-label="comments" sx={{ top: '50%',right: 0,transform: 'translateY(-50%)', position: 'absolute',visibility: hoveredItemId === item.id ? 'visible' : 'hidden'}} >
                            <DeleteIcon onClick={() => deleteTask(item.id)} sx={{ color: 'red' }} />
                          </IconButton>
                        }
                        disablePadding
                      >
                        <ListItemButton  role={undefined} onClick={handleToggle(item.id)} dense  onMouseEnter={() => handleMouseEnter(item.id)}
    onMouseLeave={() => handleMouseLeave(item.id)}>
                          <ListItemIcon >
                            <Checkbox sx={{color:"blue"}}
                            {...label}
                            icon={<RadioButtonUncheckedRoundedIcon />}
                            checkedIcon={<CheckCircleTwoToneIcon sx={{backgroundColor:"#01579b",color:"white",borderRadius:"50%"}} />}
                              edge="start"
                              checked={checked.indexOf(item.id) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': labelId }}
                              onClick={() => setIndexs((prevIndexs) => [...prevIndexs, item.id])}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={item.text} sx={indexs.includes(item.id) ? { textDecoration: "line-through" } : null} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                  <ListItem sx={{ display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
                    <Box>Umumi {list.length} tapsiri  Hazir {checked.length} tapsiriq</Box>
                    <Button variant="text" size='small' onClick={deleteAll}  >Hamisini sil</Button>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default TodoList;


