import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SubNavbar from "../components/SubNavbar";
import "../styles/User.css";

function User() {
    const [user, setUser] = useState({
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        username: "johndoe",
        password: "password123",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isPasswordMatching, setIsPasswordMatching] = useState(true);
    const [newPassword, setNewPassword] = useState("");  // State for the new password
    const [confirmPassword, setConfirmPassword] = useState("");  // State for confirm password

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const handlePasswordSave = () => {
        if (newPassword === confirmPassword) {
            setUser({ ...user, password: newPassword });
            setIsPasswordMatching(true);
            setIsEditingPassword(false);
        } else {
            setIsPasswordMatching(false);
        }
    };

    const handleResetPassword = () => {
        // Clear the password fields when "Reset Password" is clicked
        setNewPassword("");
        setConfirmPassword("");
        setIsEditingPassword(false);
    };

    return (
        <>
            <div className="container">
                <Navbar />
                <SubNavbar />
                <div className="user-details-wrapper">
                    <div className="detail-item">
                        <label htmlFor="firstname">First Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                value={user.firstname}
                                onChange={handleChange}
                            />
                        ) : (
                            <input
                                type="text"
                                id="firstname"
                                value={user.firstname}
                                readOnly
                            />
                        )}
                    </div>
                    <div className="detail-item">
                        <label htmlFor="lastname">Last Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={user.lastname}
                                onChange={handleChange}
                            />
                        ) : (
                            <input
                                type="text"
                                id="lastname"
                                value={user.lastname}
                                readOnly
                            />
                        )}
                    </div>
                    <div className="detail-item">
                        <label htmlFor="email">Email</label>
                        {isEditing ? (
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                        ) : (
                            <input
                                type="text"
                                id="email"
                                value={user.email}
                                readOnly
                            />
                        )}
                    </div>
                    <div className="detail-item">
                        <label htmlFor="username">Username</label>
                        {isEditing ? (
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={user.username}
                                onChange={handleChange}
                            />
                        ) : (
                            <input
                                type="text"
                                id="username"
                                value={user.username}
                                readOnly
                            />
                        )}
                    </div>
                    <div className="detail-item">
                        {isEditingPassword ? (
                            <>
                                <label htmlFor="password">Enter New Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    name="confirm-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </>
                        ) : (
                            <>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={user.password}
                                    readOnly
                                />
                            </>
                        )}
                    </div>

                    {!isPasswordMatching && (
                        <p className="alert">Passwords do not match!</p>
                    )}

                    <div className="buttons">
                        {isEditing ? (
                            <button className="edit-button" onClick={handleSave}>
                                Save Changes
                            </button>
                        ) : (
                            <button
                                className="edit-button"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Details
                            </button>
                        )}

                        {isEditingPassword ? (
                            <button
                                className="reset-password-button"
                                onClick={handlePasswordSave}
                            >
                                Save Password
                            </button>
                        ) : (
                            <button
                                className="reset-password-button"
                                onClick={() => setIsEditingPassword(true)}
                            >
                                Reset Password
                            </button>
                        )}

                        {/* Reset Password Button to clear password fields */}
                        {isEditingPassword && (
                            <button
                                className="reset-password-button"
                                onClick={handleResetPassword}
                            >
                                Cancel/Reset Password
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default User;
