import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmDialogData, setConfirmDialogData] = useState(null);

  useEffect(() => {
    function getCustomers() {
      axios.get("http://localhost:8070/customer/")
        .then((res) => setCustomers(res.data))
        .catch((err) => alert(err.message));
    }

    getCustomers();
  }, []);

  const handleDeleteClick = (customer) => {
    setConfirmDialogData(customer);
    setShowConfirmDialog(true);
  };

  const handleDelete = () => {
    if (confirmDialogData) {
      axios.delete(`http://localhost:8070/customer/delete/${confirmDialogData._id}`)
        .then(() => {
          setAlertMessage("Customer deleted successfully!");
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000); // Hide after 3 seconds
          setCustomers(customers.filter(customer => customer._id !== confirmDialogData._id));
        })
        .catch((err) => {
          setAlertMessage("Error deleting customer.");
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
        });
      setShowConfirmDialog(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
  };

  // Filter customers based on search query
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={containerStyle}>
      <div style={headerContainerStyle}>
        <h1 style={headerStyle}>All Customers</h1>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={searchInputStyle}
        />
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Contact Number</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Gender</th>
            <th style={tableHeaderStyle}>Nationality</th>
            <th style={tableHeaderStyle}>Address</th>
            <th style={tableHeaderStyle}>NIC/Passport Number</th>
            <th style={tableHeaderStyle}>Check-In Date</th>
            <th style={tableHeaderStyle}>Room Type</th>
            <th style={tableHeaderStyle}>Room Number</th>
            <th style={tableHeaderStyle}>Price</th>
            <th style={tableHeaderStyle}>View Profile</th>
            <th style={tableHeaderStyle}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map(customer => (
            <tr key={customer._id} style={tableRowStyle}>
              <td style={tableCellStyle}>{customer.name}</td>
              <td style={tableCellStyle}>{customer.contactNumber}</td>
              <td style={tableCellStyle}>{customer.email}</td>
              <td style={tableCellStyle}>{customer.gender}</td>
              <td style={tableCellStyle}>{customer.nationality}</td>
              <td style={tableCellStyle}>{customer.address}</td>
              <td style={tableCellStyle}>{customer.nicPassport}</td>
              <td style={tableCellStyle}>{customer.checkInDate}</td>
              <td style={tableCellStyle}>{customer.roomType}</td>
              <td style={tableCellStyle}>{customer.roomNumber}</td>
              <td style={tableCellStyle}>{customer.price}</td>
              <td style={tableCellStyle}>
                <Link to={`/customer/${customer._id}`} style={{ color: '#800000', textDecoration: 'none' }}>View Profile</Link>
              </td>
              <td style={tableCellStyle}>
                <button
                  onClick={() => handleDeleteClick(customer)}
                  style={buttonStyle}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AnimatePresence>
        {showAlert && (
          <motion.div
            style={alertStyle}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: '0%' }}
            exit={{ opacity: 0, x: '100%' }}
          >
            {alertMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {showConfirmDialog && (
        <div style={confirmDialogOverlayStyle}>
          <div style={confirmDialogStyle}>
            <h2 style={confirmDialogTitleStyle}>Confirm Deletion</h2>
            <p>Are you sure you want to delete this customer?</p>
            <div style={confirmDialogButtonContainerStyle}>
              <button
                onClick={handleDelete}
                style={confirmDialogButtonStyle}
              >
                Confirm
              </button>
              <button
                onClick={handleCancel}
                style={confirmDialogButtonStyle}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles
const containerStyle = {
  padding: '20px',
  width: 'calc(100% - 250px)',
  boxSizing: 'border-box',
  marginLeft: '250px',
};

const headerContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
};

const headerStyle = {
  textAlign: 'left',
  fontSize: '24px',
};

const searchInputStyle = {
  padding: '8px',
  fontSize: '14px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '200px',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '14px',
};

const tableHeaderStyle = {
  backgroundColor: '#800000',
  color: '#fff',
  padding: '8px',
  textAlign: 'left',
  borderBottom: '2px solid #fff',
};

const tableRowStyle = {
  backgroundColor: '#f2f2f2',
};

const tableCellStyle = {
  padding: '8px',
  borderBottom: '1px solid #ddd',
  borderRight: '1px solid #fff',
  fontSize: '14px',
};

const buttonStyle = {
  backgroundColor: '#b30000',
  color: '#ffffff',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
};

const alertStyle = {
  backgroundColor: '#ffffff',
  color: '#800000',
  padding: '10px',
  borderRadius: '5px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  position: 'fixed',
  top: '80px',
  right: '20px',
  zIndex: 1000,
  width: '300px',
  transform: 'translateX(100%)',
};

const confirmDialogOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const confirmDialogStyle = {
  backgroundColor: '#ffffff',
  color: '#800000',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
  width: '300px',
};

const confirmDialogTitleStyle = {
  margin: 0,
  fontSize: '18px',
};

const confirmDialogButtonContainerStyle = {
  marginTop: '20px',
};

const confirmDialogButtonStyle = {
  backgroundColor: '#800000',
  color: '#ffffff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginRight: '10px',
};

export { buttonStyle };
