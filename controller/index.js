const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try{
  const result = await mongodb.getDb().db().collection('recipes').find();
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
    .db()
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



module.exports = { getAll, getSingle};