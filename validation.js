const { check, validationResult } = require('express-validator')

const recipeValidationRules = () => {
  return [
    // dishName is required
    check('dishName', 'dishName is required').notEmpty(),
    // prepTime is required
    check('prepTime', 'prepTime is required').notEmpty(),
    // cookTime is required
    check('cookTime', 'cookTime is required').notEmpty(),
    // yield is required
    check('yield', 'yield is required').notEmpty(),
    // mealType is required
    check('mealType', 'mealType is required').notEmpty(),
  ]
}

const chefValidationRules = () => {
  return [
    // chefName is required
    check('chefName', 'chefName is required').notEmpty(),
    // chefRestaurant is required
    check('chefRestaurant', 'chefRestaurant is required').notEmpty(),
    // chefSpecialization is required
    check('chefSpecialization', 'chefSpecialization is required').notEmpty(),
    // experienceLevel is required
    check('experienceLevel', 'experienceLevel is required').notEmpty(),
    // signatureDishes is required
    check('signatureDishes', 'signatureDishes is required').notEmpty(),
    // chefRating is required
    check('chefRating', 'chefRating is required').notEmpty(),
    // contactInformation is required
    check('contactInformation', 'contactInformation is required').notEmpty(),        
  ]
}


const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(400).json({
    errors: extractedErrors,
  })
}

module.exports = {
    recipeValidationRules,
    validate,
    chefValidationRules
}