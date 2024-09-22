const express = require('express');
const { createLoanApplication, getAllApplications } = require('../controllers/loanController');

const router = express.Router();

router.post('/apply', createLoanApplication);
router.get('/applications', getAllApplications);

module.exports = router;
