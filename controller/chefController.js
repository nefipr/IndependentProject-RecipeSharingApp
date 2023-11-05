const { response } = require('express');
const mongodb = require('../db/connect');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;

const getAllChefs = async (req, res, next) => {
    try{
    const result = await mongodb.getDb().db('Recipes').collection('chefs').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
    } catch (error) {
      res.status(500).json({message: error.message});
    }
};
  
const getSingleChef = async (req, res, next) => {
    try{
    const chefId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('Recipes')
      .collection('chefs')
      .find({ _id: chefId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
    } catch (error) {
      res.status(500).json(error);
    }
};

const addNewChef = async (req, res) => {
    try{
      const newChef = {
        chefName: req.body.chefName,
        chefRestaurant: req.body.chefRestaurant,
        chefSpecialization: req.body.chefSpecialization,
        experienceLevel: req.body.experienceLevel,
        signatureDishes: req.body.signatureDishes,
        chefRating: req.body.chefRating,
        contactInformation: req.body.contactInformation,
      };
  
      // Check if the chefname already exists in the database
      const existingUser = await mongodb
      .getDb()
      .db('Recipes')
      .collection('chefs')
      .findOne({ chefName: newChef.chefName });
  
      if (existingUser) {
        res.send('Chef already exists.');
      } else {
          const result = await mongodb
          .getDb()
          .db('Recipes')
          .collection('users')
          .insertOne(newChef);
  
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

const updateChefInfo = async (req, res) => {
    try{
      const chefId = new ObjectId(req.params.id);
      const newChef = {
        chefName: req.body.chefName,
        chefRestaurant: req.body.chefRestaurant,
        chefSpecialization: req.body.chefSpecialization,
        experienceLevel: req.body.experienceLevel,
        signatureDishes: req.body.signatureDishes,
        chefRating: req.body.chefRating,
        contactInformation: req.body.contactInformation,
      };
      if (!chefId) {
        res.status(400).send({ message: 'Invalid recipe ID Supplied' });
        return;
      }
      const result = await mongodb
        .getDb()
        .db('Recipes')
        .collection('chefs')
        .replaceOne({ _id: chefId }, newChef);
      
      if (result.modifiedCount > 0){
        res.status(204).send();
      } else {
        res.status(500).json(result.error || 'Some error occurred while updating the recipe.');
      }
      } catch (error) {
        res.status(500).json(error);
      }
};

const deleteChef = async (req, res) => {
    try {
      const chefId = new ObjectId(req.params.id);
      if (!chefId) {
        res.status(400).send({ message: 'Invalid recipe ID Supplied' });
        return;
      }
      const result = await mongodb
      .getDb()
      .db('Recipes')
      .collection('chefs')
      .deleteOne({ _id: chefId }, true);
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


module.exports = { 
    getAllChefs,
    getSingleChef,
    addNewChef,
    updateChefInfo,
    deleteChef,

  };