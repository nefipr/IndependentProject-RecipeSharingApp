const { response } = require('express');
const mongodb = require('../db/connect');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res, next) => {
  try{
  const result = await mongodb.getDb().db('Recipes').collection('recipes').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const getSingle = async (req, res, next) => {
  try{
  const recipeId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('Recipes')
    .collection('recipes')
    .find({ _id: recipeId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
  } catch (error) {
    res.status(500).json(error);
  }
};


const createNewRecipe = async(req, res) => {
  try{
    const newRecipe = {
      dishName: req.body.dishName,
      prepTime: req.body.prepTime,
      cookTime: req.body.cookTime,
      yield: req.body.yield,
      mealType: req.body.mealType
    };
    
    const result = await mongodb
    .getDb()
    .db('Recipes')
    .collection('recipes')
    .insertOne(newRecipe);
  
    if (result.acknowledged){
      res.status(201).json(result);
    } else {
      res.status(500).json(result.error);
    }
    } catch (error) {
      res.status(500).json(error);
    }
};

const updateRecipe = async (req, res) => {
  try{
    const recipeId = new ObjectId(req.params.id);
    const recipe = {
      dishName: req.body.dishName,
      prepTime: req.body.prepTime,
      cookTime: req.body.cookTime,
      yield: req.body.yield,
      mealType: req.body.mealType
    };
    if (!recipeId) {
      res.status(400).send({ message: 'Invalid recipe ID Supplied' });
      return;
    }
    const result = await mongodb
      .getDb()
      .db('Recipes')
      .collection('recipes')
      .replaceOne({ _id: recipeId }, recipe);
    
    if (result.modifiedCount > 0){
      res.status(204).send();
    } else {
      res.status(500).json(result.error || 'Some error occurred while updating the recipe.');
    }
    } catch (error) {
      res.status(500).json(error);
    }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipeId = new ObjectId(req.params.id);
    if (!recipeId) {
      res.status(400).send({ message: 'Invalid recipe ID Supplied' });
      return;
    }
    const result = await mongodb
    .getDb()
    .db('Recipes')
    .collection('recipes')
    .deleteOne({ _id: recipeId }, true);
    console.log(response);
    if (result.deletedCount > 0){
      res.status(200).send();
    } else {
      res.status(500).json(result.error || 'Some error occurred while deleting the contact.');
    }
    } catch (error) {
      res.status(500).json(error);
    }
};


const signUp = async (req, res) => {
  try{
    const newUser = {
      username: req.body.username,
      password: req.body.password
    };

    // Check if the username already exists in the database
    const existingUser = await mongodb
    .getDb()
    .db('Recipes')
    .collection('users')
    .findOne({ username: newUser.username });

    if (existingUser) {
      res.send('User already exists. Please choose a different username.');
    } else {
        // Number of salt rounds for bcrypt
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
        // Replace the original password with the hashed one
        newUser.password = hashedPassword; 

        const result = await mongodb
        .getDb()
        .db('Recipes')
        .collection('users')
        .insertOne(newUser);

        if (result.acknowledged){
          res.status(201).json(result);
          // res.redirect('/recipes');
        } else {
          res.status(500).json(result.error);
        }
    }
  } catch (error) {
    res.status(500).json(error);
  }

};

const logIn = async (req, res) => {
  try {
    const check = await mongodb
    .getDb()
    .db('Recipes')
    .collection('users')
    .findOne({ username: req.body.username });

    if (!check) {
      res.send("Username cannot found")
    }

    // Compare the hashed password from the database with the plaintext password
    const passwordMatch = await bcrypt.compare(req.body.password, check.password);
    if (!passwordMatch) {
        res.send("wrong Password");
    }
    
    else {
      res.send("HOME");
    }
  }
  catch (error) {
    res.status(500).json(error);
  }
};


module.exports = { 
  getAll, 
  getSingle, 
  createNewRecipe, 
  updateRecipe, 
  deleteRecipe, 
  signUp, 
  logIn
};