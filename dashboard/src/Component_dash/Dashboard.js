import React, { useState, useRef } from 'react'; // Import useRef

function Dashboard() {
  const [imageSrc, setImageSrc] = useState('standard.png'); // Set the initial image source
  const [name, setName] = useState('Purvaja Vashistha');
  const [employeeId, setEmployeeId] = useState('JMD233');
  const [email, setEmail] = useState('purvajavashistha@jmangroup.com');
  const [isEditMode, setIsEditMode] = useState(false); //State to track edit mode
  const fileInputRef = useRef(null);


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // You can optionally validate the file type or size here
      // For simplicity, we assume it's a valid image file

      // Read the selected image file and set it as the new image source
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to trigger file input click when "+" button is clicked
  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  // Function to handle saving changes
  const handleSaveChanges = () => {
    // Perform any necessary actions to save changes (e.g., make an API request)
    // For simplicity, we'll just exit edit mode here
    setIsEditMode(false);
  };

  return (
    <div>
      <div className="row d-flex justify-content-center align-items-center h-100"><br/>         
              <div>
                <br/>
                <div className="profile-image">
                  <img src={imageSrc} alt="User" className="rounded-circle" style={{ width: '100px', height: '100px' }} />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }} // Hide the file input
                  ref={fileInputRef}
                />
                <label className="upload-button" onClick={handleImageUploadClick}>
                  <span>+</span>
                  Choose
                </label>
              </div><br/><br/>
            <div className="card-body"><br/>
              <h5 className="card-title">Profile Information</h5><br/><br/>
              {isEditMode ? ( // Render input fields in edit mode
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="employeeId" className="form-label">Employee ID</label>
                    <input
                      type="text"
                      className="form-control"
                      id="employeeId"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email ID</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </form>
              ) : ( // Display text in view mode
                <div>
                  <p><strong>Name:</strong> {name}</p>
                  <p><strong>Employee ID:</strong> {employeeId}</p>
                  <p><strong>Email ID:</strong> {email}</p>
                </div>
              )}

              {isEditMode ? ( // Render "Save" button in edit mode
                <button className="midnight" onClick={handleSaveChanges}>Save</button>
              ) : ( // Render "Edit" button in view mode
                <button className="midnight" onClick={toggleEditMode}>Edit</button>
              )}
            </div>
          </div>
        </div>
    
    
  );
}

export { Dashboard };
