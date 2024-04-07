const router = require('express').Router();
const goalController = require('../controllers/GoalController');
router.post("/goal",goalController.addGoal);
router.get("/goal", goalController.getAllGoals);
router.get("/goal/:id", goalController.getGoalById);
router.put("/goal/:id", goalController.updateGoal);
router.delete("/goal/:id", goalController.deleteGoal);
router.get("/goall/:userId", goalController.getGoalByUserId);

module.exports = router;