import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import './profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [extraDetails, setExtraDetails] = useState({});

  const parseCommaSeparated = (field) => {
    if (!field) return [];
    return field.split(',').map(item => item.trim());
  };

  const fetchProfile = async (enroll_id, token) => {
    try {
      const res = await axios.get(`https://jobportal-backend-fufj.onrender.com/profile/${enroll_id}`, {
        headers: { Authorization: token }
      });
      setProfile(res.data.data);
    } catch (error) {
      console.error('Error fetching main profile:', error);
    }
  };

  const fetchExtraDetails = async (enroll_id) => {
    try {
      const response = await axios.get(`https://jobportal-backend-fufj.onrender.com/profile/details/${enroll_id}`);
      const data = response.data.data;

      console.log("Fetched extra details:", data);  // Debugging log

      if (data.interested) {
        data.interested = parseCommaSeparated(data.interested);
      }

      setExtraDetails(data);
    } catch (error) {
      console.error("Error fetching extra details:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found');
      return;
    }
    const decoded = jwtDecode(token);
    const enroll_id = decoded.id;

    fetchProfile(enroll_id, token);
    fetchExtraDetails(enroll_id);
  }, []);

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Profile</h1>

      {/* Main Profile Section */}
      <div className="profile-info">
        <img
          src={profile.stu_photo_link || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-details">
          <p><strong>Name:</strong> {profile.stu_name || 'N/A'}</p>
          <p><strong>Email:</strong> {profile.stu_email || 'N/A'}</p>
          <p><strong>Branch:</strong> {profile.stu_branch || 'N/A'}</p>
          {profile.stu_resume_link && (
            <a
              href={profile.stu_resume_link}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-link"
            >
              View Resume
            </a>
          )}
        </div>
      </div>

      {/* Extra Details Section */}
      <div className="extra-details">
        <h2>Additional Information</h2>

        {/* Display extraDetails only if they exist */}
        {extraDetails && (
          <>
            {extraDetails.cgpa && <p><strong>CGPA:</strong> {extraDetails.cgpa}</p>}

            {extraDetails.interested && extraDetails.interested.length > 0 && (
              <>
                <p><strong>Areas of Interest:</strong></p>
                <ul className="interest-list">
                  {extraDetails.interested.map((area, idx) => (
                    <li key={idx}>{area}</li>
                  ))}
                </ul>
              </>
            )}

            {extraDetails.achievements && (
              <p><strong>Achievements:</strong> {extraDetails.achievements}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
