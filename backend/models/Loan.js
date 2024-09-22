const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  loanAmount: { type: Number, required: true },
  annualIncome: { type: Number, required: true },
  loanUse: { type: String, required: true },
  customLoanUse: { type: String },
  name: {
    title: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  dob: { type: Date, required: true },
  maritalStatus: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
  },
  timeAtAddress: { type: String, required: true },
  employmentInfo: {
    employer: { type: String, required: true }, // Changed to match your form's single string input for employer
    occupation: { type: String, required: true },
    experience: { type: String, required: true },
    grossIncome: { type: Number, required: true },
    rentMortgage: { type: Number, required: true },
    downPayment: { type: Number, required: true },
    comments: { type: String },
  },
  bankReferences: { type: String, required: true },
  consent: { type: Boolean, required: true },
  confirmInfo: { type: Boolean, required: true },
});

module.exports = mongoose.model('Loan', loanSchema);
