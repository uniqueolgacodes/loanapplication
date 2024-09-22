import React, { useState } from 'react';
import axios from 'axios';

const LoanForm = () => {
  const [formData, setFormData] = useState({
    loanAmount: '',
    annualIncome: '',
    loanUse: 'Business launching',
    customLoanUse: '',
    name: { title: '', firstName: '', lastName: '' },
    dob: '',
    maritalStatus: 'Single',
    email: '',
    phone: '',
    address: { street: '', country: '', state: '', city: '' },
    timeAtAddress: '0-1yr',
    employmentInfo: {
      employer: { firstName: '', lastName: '' },
      occupation: '',
      experience: '0-1yr',
      grossIncome: '',
      rentMortgage: '',
      downPayment: '',
      comments: '',
    },
    bankReferences: '',
    consent: false,
    confirmInfo: false,
  });

  const [loanUseOther, setLoanUseOther] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const path = name.split('.');

    if (path.length > 1) {
      setFormData((prevState) => ({
        ...prevState,
        [path[0]]: { ...prevState[path[0]], [path[1]]: type === 'checkbox' ? checked : value },
      }));
    } else if (name === 'loanUse') {
      if (value === 'Others') {
        setLoanUseOther(true);
      } else {
        setLoanUseOther(false);
        setFormData({ ...formData, customLoanUse: '', loanUse: value });
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData);
      const response = await axios.post('https://loanapplication-zzdi.onrender.com/api/loans/apply', formData);
      alert('Applied Successfully, we will reach out to you');
    } catch (error) {
      console.error('There was an error applying:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Loan Application Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Loan Section */}
        <h2 className="text-xl font-semibold mb-2">Loan Section</h2>
        <div className="mb-4">
          <label>Desired Loan Amount</label>
          <input
            type="number"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label>Annual Income</label>
          <input
            type="number"
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label>Loan will be used for?</label>
          <select
            name="loanUse"
            value={formData.loanUse}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          >
            <option value="Business launching">Business launching</option>
            <option value="House Buying">House Buying</option>
            <option value="House Improvement">House Improvement</option>
            <option value="Investment">Investment</option>
            <option value="Education">Education</option>
            <option value="Others">Others</option>
          </select>
          {loanUseOther && (
            <input
              type="text"
              name="customLoanUse"
              value={formData.customLoanUse}
              onChange={handleInputChange}
              className="border p-2 w-full mt-2"
              placeholder="Please specify"
              required={loanUseOther}
            />
          )}
        </div>

        {/* Contact Information Section */}
        <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
        <div className="mb-4">
          <label>Title</label>
          <input
            type="text"
            name="name.title"
            value={formData.name.title}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="name.firstName"
              value={formData.name.firstName}
              onChange={handleInputChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="name.lastName"
              value={formData.name.lastName}
              onChange={handleInputChange}
              className="border p-2 w-full"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label>Marital Status</label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          >
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label>Street Address</label>
          <input
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label>Country</label>
            <input
              type="text"
              name="address.country"
              value={formData.address.country}
              onChange={handleInputChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label>State</label>
            <input
              type="text"
              name="address.state"
              value={formData.address.state}
              onChange={handleInputChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleInputChange}
              className="border p-2 w-full"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label>How long have you lived at current address?</label>
          <select
            name="timeAtAddress"
            value={formData.timeAtAddress}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          >
            <option value="0-1yr">0-1yr</option>
            <option value="1-2yr">1-2yr</option>
            <option value="3-4yr">3-4yr</option>
            <option value="5+yr">5+yr</option>
          </select>
        </div>

        {/* Employment Information Section */}
        <h2 className="text-xl font-semibold mb-2">Employment Information</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label>Employer First Name</label>
            <input
              type="text"
              name="employmentInfo.employer.firstName"
              value={formData.employmentInfo.employer.firstName}
              onChange={handleInputChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label>Employer Last Name</label>
            <input
              type="text"
              name="employmentInfo.employer.lastName"
              value={formData.employmentInfo.employer.lastName}
              onChange={handleInputChange}
              className="border p-2 w-full"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label>Occupation</label>
          <input
            type="text"
            name="employmentInfo.occupation"
            value={formData.employmentInfo.occupation}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label>Years of Experience</label>
          <select
            name="employmentInfo.experience"
            value={formData.employmentInfo.experience}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          >
            <option value="0-1yr">0-1yr</option>
            <option value="1-2yr">1-2yr</option>
            <option value="3-4yr">3-4yr</option>
            <option value="5+yr">5+yr</option>
          </select>
        </div>
        <div className="mb-4">
          <label>Gross Monthly Income</label>
          <input
            type="number"
            name="employmentInfo.grossIncome"
            value={formData.employmentInfo.grossIncome}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label>Monthly Rent/Mortgage</label>
          <input
            type="number"
            name="employmentInfo.rentMortgage"
            value={formData.employmentInfo.rentMortgage}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label>Down Payment Amount</label>
          <input
            type="number"
            name="employmentInfo.downPayment"
            value={formData.employmentInfo.downPayment}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label>Comments</label>
          <textarea
            name="employmentInfo.comments"
            value={formData.employmentInfo.comments}
            onChange={handleInputChange}
            className="border p-2 w-full"
          ></textarea>
        </div>

        {/* Bank Reference Section */}
        <h2 className="text-xl font-semibold mb-2">Bank Reference</h2>
        <div className="mb-4">
          <label>Bank References</label>
          <textarea
            name="bankReferences"
            value={formData.bankReferences}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          ></textarea>
        </div>

        {/* Consent Section */}
        <div className="mb-4">
          <label>
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleInputChange}
              required
            />
            I agree to the terms and conditions.
          </label>
        </div>
        <div className="mb-4">
          <label>
            <input
              type="checkbox"
              name="confirmInfo"
              checked={formData.confirmInfo}
              onChange={handleInputChange}
              required
            />
            I confirm that the information provided is accurate.
          </label>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoanForm;
