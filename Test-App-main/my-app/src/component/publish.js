// import React, { useState } from 'react';

// const LoginPage = () => {
//     const [activeForm, setActiveForm] = useState('student'); // To toggle between student and admin form

//     const handleStudentClick = () => {
//         setActiveForm('student');
//     };

//     const handleAdminClick = () => {
//         setActiveForm('admin');
//     };

//     return (
//         <div style={styles.container}>
//             <div style={styles.buttonContainer}>
//                 <button 
//                     style={activeForm === 'student' ? styles.activeButton : styles.button} 
//                     onClick={handleStudentClick}>
//                     Student Login
//                 </button>
//                 <button 
//                     style={activeForm === 'admin' ? styles.activeButton : styles.button} 
//                     onClick={handleAdminClick}>
//                     Administration
//                 </button>
//             </div>

//             <div style={styles.formContainer}>
//                 {activeForm === 'student' ? (
//                     <div>
//                         <h2>Skill Test</h2>
//                         <p>Enter your name</p>
//                         <input type="text" placeholder="Enter your name" style={styles.input}/>
//                         <button style={styles.submitButton}>Start</button>
//                     </div>
//                 ) : (
//                     <div>
//                         <h2>Admin Panel</h2>
//                         <p>Enter your password</p>
//                         <input type="password" placeholder="Enter password" style={styles.input}/>
//                         <button style={styles.submitButton}>Login</button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// const styles = {
//     container: {
//         textAlign: 'center',
//         padding: '20px'
//     },
//     buttonContainer: {
//         marginBottom: '20px'
//     },
//     button: {
//         padding: '10px 20px',
//         margin: '0 10px',
//         cursor: 'pointer',
//         backgroundColor: '#f0f0f0',
//         border: '1px solid #ccc'
//     },
//     activeButton: {
//         padding: '10px 20px',
//         margin: '0 10px',
//         cursor: 'pointer',
//         backgroundColor: '#ccc',
//         border: '1px solid #000'
//     },
//     formContainer: {
//         padding: '20px',
//         border: '1px solid #ccc',
//         display: 'inline-block',
//         borderRadius: '5px'
//     },
//     input: {
//         padding: '10px',
//         margin: '10px 0',
//         width: '80%',
//         borderRadius: '5px',
//         border: '1px solid #ccc'
//     },
//     submitButton: {
//         padding: '10px 20px',
//         backgroundColor: '#007BFF',
//         color: '#fff',
//         border: 'none',
//         cursor: 'pointer',
//         borderRadius: '5px'
//     }
// };

// export default LoginPage;
import React, { useState } from 'react';

const Publish = () => {
  const [link, setLink] = useState(''); // State to hold the generated link
  const [error, setError] = useState(null); // State to hold any potential error messages

  // Function to handle question submission and link generation
  const handlePublish = async () => {
    try {
      const testId = localStorage.getItem("testId");
      console.log(testId != null); 

      if (testId == null) {
        const message = "Please create your test before publishing, you can publish a test only by creating a test.";
        setLink(message); // Set message when there's no testId
      } else {
        // If testId exists, generate the link
        const generatedLink = `http://localhost:3000/test/${testId}`;
        setLink(generatedLink); // Store the generated link in state
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setError('Failed to publish the test. Please try again.');
    }
  };

  return (
    <div className="publish-container">
      <button onClick={handlePublish}>Publish Test</button> {/* Button to publish the test */}
      
      {link && (
        <div className="test-link-container">
          {link.startsWith("http") ? ( // If the link starts with "http", render as a link
            <>
              <p>Your test is published and available at:</p>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </>
          ) : (
            <p>{link}</p> // Otherwise, render as plain text (the message)
          )}
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
   




      <style jsx>{`
        .publish-container {
          margin-left: 225px;
          text-align: center;
          font-family: Arial, sans-serif;
          background-color: #f2f2f3;
          padding: 20px;
          text-align: center;
        }
        .test-link-container {
          margin-top: 15px;
          padding: 10px;
          background-color: #f0f8ff;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .test-link-container a {
          color: #1a73e8;
          text-decoration: none;
        }
        .error-message {
          color: red;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Publish;
