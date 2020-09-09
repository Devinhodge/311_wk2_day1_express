
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
app.get('/users/:id', (req, res)=>{
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

app.put('/users/:id',(req, res)=>{
  const updateUser = {
    id: req.body._id,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
  };
  users.push(updateUser);
  res.json(users);
});


app.delete('/user/:id', (req, res)=>{
  const userFound = user.som(user=>user._id==req.params.userId);
  if(userFound){
    users.forEach(user=>{
      if(user._id === parseInt(req.params.userId)){
        user.isActive = false;
      }
    })
    res.send({
      message: 'User has been removed',
      users: users.filter(user._id == req.params.userId)
    });
  }else{
      res.status(400).json({Error:`No user with the ID of ${req.params.userID}`});   
  }
});

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))