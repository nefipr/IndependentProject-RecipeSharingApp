const { response } = require('express');
const mongodb = require('../db/connect');
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
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('Recipes')
    .collection('recipes')
    .find({ _id: userId });
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

};

const deleteRecipe = async (req, res) => {

};



module.exports = { getAll, getSingle, createNewRecipe, updateRecipe, deleteRecipe};