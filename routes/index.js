const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// add pizza prefix to routes
router.use('/user', pizzaRoutes);
router.use('/thought', commentRoutes);

module.exports = router;