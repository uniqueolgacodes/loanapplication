const Loan = require('../models/Loan');

const createLoanApplication = async (req, res) => {
  try {
    const loan = new Loan(req.body);
    await loan.save();
    res.status(201).json({ message: 'Applied Successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json(loans);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createLoanApplication, getAllApplications };
