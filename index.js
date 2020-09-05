
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000

const { users } = require('./state')
let counter = users.length
/* BEGIN - create routes here */
app.use(bodyParser.json());

//get all users
app.get('/users', (req, res) => {
  res.json(users);
});

//get one user by id
app.get('/users/_id', (req, res)=>{
  const userId = req.params._id;
  let reqUser={};
  users.forEach(function(user){
    if(user._id.tostring() === userId.toString())
    reqUser = user;
  });
  res.json(reqUser)
});

app.post('/users',(req, res)=>{
  counter++
  let newUser = req.body;
    newUser._id = counter;
    newUser.name = req.body.name;
    newUser.occupation = req.body.occupation;
    newUser.avatar = req.body.avatar;

  if(!newUser.name||!newUser.occupation||!newUser.avatar){
    return res.status(400).json({msg: 'Please include name and occupation'})
   }
  users.push(newUser);
  res.json(users);
});

app.put('/users/_id',(req, res)=>{
  const userFound = users.some(user=>user._id === parseInt(req.params.userId));
  if(userFound){
    const updateUser = req.body;
    users.forEach(user=>{
      if(user._id === parseInt(req.params.userId)){
        user.name.name = updateUser.name ? updateUser.name:user.name;
        user.occupation = updateUser.occupation ? updateUser.occupation:user.occupation;
        user.avatar = updateUser.avatar ? updateUser.avatar:user.avatar;

        res.json({message: 'User updated', user})
      }
    })
  }else{
    res.status(400).json({Error:`No user with the ID of ${req.params.userId}`});
  }
});


app.delete('/user/:userId', (req, res)=>{
  const userFound = user.som(user=>user._id===parseInt(req.params.userID));
  if(userFound){
    users.forEach(user=>{
      if(user._id === parseInt(req.params.userId)){
        user.isActive = false;
      }
    })
    res.send({
      message: 'User has been removed',
      users:users.filter(user._id === parseInt(req.params.userId))
    });
  }else{
      res.status(400).json({Error:`No user with the ID of ${req.params.userID}`});   
  }
});

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))