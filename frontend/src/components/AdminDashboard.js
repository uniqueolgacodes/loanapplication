import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      const res = await axios.get('http://localhost:5000/api/loans/applications');
      setApplications(res.data);
    };
    fetchApplications();
  }, []);

  const handleShowMore = (application) => {
    setSelectedApplication(application);
  };

  const closeModal = () => {
    setSelectedApplication(null);
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats the date to MM/DD/YYYY or according to the locale
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Loan Applications</h1>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 border">Name</th>
              <th className="py-2 border">Loan Amount</th>
              <th className="py-2 border">Phone</th>
              <th className="py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={index}>
                <td className="py-2 border">
                  {app.name.firstName} {app.name.lastName}
                </td>
                <td className="py-2 border">{app.loanAmount}</td>
                <td className="py-2 border">{app.phone}</td>
                <td className="py-2 border">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => handleShowMore(app)}
                  >
                    Show More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedApplication && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-lg w-full max-w-2xl relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4">Applicant Information</h2>
            <div className="space-y-2">
              <p><strong>Name:</strong> {selectedApplication.name.title} {selectedApplication.name.firstName} {selectedApplication.name.lastName}</p>
              <p><strong>Date of Birth:</strong> {formatDate(selectedApplication.dob)}</p>
              <p><strong>Marital Status:</strong> {selectedApplication.maritalStatus}</p>
              <p><strong>Email:</strong> {selectedApplication.email}</p>
              <p><strong>Phone:</strong> {selectedApplication.phone}</p>
              <p><strong>Address:</strong> {selectedApplication.address.street}, {selectedApplication.address.city}, {selectedApplication.address.state}, {selectedApplication.address.country}</p>
              <p><strong>Time at Address:</strong> {selectedApplication.timeAtAddress}</p>
              <p><strong>Employer:</strong> {selectedApplication.employmentInfo.employer}</p>
              <p><strong>Occupation:</strong> {selectedApplication.employmentInfo.occupation}</p>
              <p><strong>Experience:</strong> {selectedApplication.employmentInfo.experience}</p>
              <p><strong>Gross Income:</strong> {selectedApplication.employmentInfo.grossIncome}</p>
              <p><strong>Rent/Mortgage:</strong> {selectedApplication.employmentInfo.rentMortgage}</p>
              <p><strong>Down Payment:</strong> {selectedApplication.employmentInfo.downPayment}</p>
              <p><strong>Bank References:</strong> {selectedApplication.bankReferences}</p>
              <p><strong>Comments:</strong> {selectedApplication.employmentInfo.comments}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
