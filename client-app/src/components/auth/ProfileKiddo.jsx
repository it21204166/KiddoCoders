import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Fix import
import { useFormik } from 'formik';
import "./auth.css";
import HeaderToPage from "../common/header/HeaderToPage";


function Userprofile() {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    kiddoName: "",
    kiddoPhone: "",
    kiddoEmail: "",
    kiddoAge: "",
    kiddoPassword: "",
  });
  const [userId, setUserId] = useState("");

  useEffect(() => {
    console.log(" for test", JSON.stringify(user));
  }, [JSON.stringify(user)]);

  useEffect(() => {
    let userId = null;
    const token = localStorage.getItem("AuthToken");
    const jwtToken = jwtDecode(token); // Fix usage of jwtDecode

    console.log("tokentokentokentoken", jwtToken);

    if (jwtToken.userId) {
      userId = jwtToken.userId;
      setUserId(userId);
    }

    axios
      .get("http://localhost:8000/admin/users/get-user-by-id/" + userId)
      .then((response) => {
        const userData = response?.data?.data;
        if (userData) {
          setUser(userData);
          formik.setFieldValue("kiddoName", userData?.kiddoName);
          formik.setFieldValue("kiddoPhone", userData?.kiddoPhone);
          formik.setFieldValue("kiddoEmail", userData?.kiddoEmail);
          formik.setFieldValue("kiddoAge", userData?.kiddoAge);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/admin/users/update-user/${user.id}`,
        formik.values
      );

      if (response.data.success) {
        console.log("User data updated successfully");
      } else {
        console.error("User data update failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleDelete = async () => {
    console.log("Hello");
    try {
      console.log(userId);
      const response = await axios.delete(
        `http://localhost:8000/admin/users/delete-user/${userId}`
      );
      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);

      if (response.data.success) {
        console.log("User deleted successfully");
      } else {
        console.error("User deletion failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const validationSchema = Yup.object().shape({
    kiddoName: Yup.string().required("Name is required"),
    kiddoPhone: Yup.string().required("kiddo Phone is required"),
    kiddoEmail: Yup.string().email("Invalid email address").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      kiddoName: user.kiddoName,
      kiddoPhone: user.kiddoPhone,
      kiddoEmail: user.kiddoEmail,
      kiddoAge: user.kiddoAge,
      kiddoPassword: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  
  return (
    <div>
      <div style={{backgroundColor:"#1eb2a6"}}>
      <HeaderToPage/>
      </div>
      <div className='signup'>
      <div className='image-container'>
          <img style={{width:"250px",height:"500px", marginTop:"30px"}} className='register_boy' src='../../register_boy.png'/>
        </div>
      <div className='form-container' style={{border:'solid', marginRight:"400px", marginTop:"30px", borderRadius:"10px", backgroundColor:"white"}}>
      <h1 className="center-item" style={{fontFamily:"cursive", marginBottom:"30px"}}>My Profile</h1>
      <form onSubmit={formik.handleSubmit}>
      <div className='input-container'>
          <label className='primary' style={{fontFamily:"cursive"}}>Kiddo Name</label>
          <input
            type="text"
            id="kiddoName"
            name="kiddoName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.kiddoName}
            className='form-inputSignin'
          />
          {formik.touched.kiddoName && formik.errors.kiddoName && (
            <div className="error-message">{formik.errors.kiddoName}</div>
          )}
        </div>

        <div className='input-container'>
          <label className='primary' style={{fontFamily:"cursive"}}>Kiddo Phone</label>
          <input
            type="text"
            id="kiddoPhone"
            name="kiddoPhone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.kiddoPhone}
            className='form-inputSignin'
          />
          {formik.touched.kiddoPhone && formik.errors.kiddoPhone && (
            <div className="error-message">{formik.errors.kiddoPhone}</div>
          )}
        </div>

        <div className='input-container'>
          <label className='primary' style={{fontFamily:"cursive"}}>Kiddo Email</label>
          <input
            type="email"
            id="kiddoEmail"
            name="kiddoEmail"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.kiddoEmail}
            className='form-inputSignin'
          />
          {formik.touched.kiddoEmail && formik.errors.kiddoEmail && (
            <div className="error-message">{formik.errors.kiddoEmail}</div>
          )}
        </div>
        <div className='input-container'>
          <label className='primary' style={{fontFamily:"cursive"}}>Kiddo Age</label>
          <input
            type="text"
            id="kiddoAge"
            name="kiddoAge"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.kiddoAge}
            className='form-inputSignin'
          />
          {formik.touched.kiddoAge && formik.errors.kiddoAge && (
            <div className="error-message">{formik.errors.kiddoAge}</div>
          )}
        </div>

        <div className='input-container'>
            <label style={{fontFamily:"cursive"}}>Successfully Completed Quises - <input type='text' style={{fontFamily:"cursive", fontSize:"17px", width:"40px", height:"30px", marginLeft:"20px"}} placeholder=' 00'/></label>
        </div>
        <div className='input-container'>
            <label style={{fontFamily:"cursive"}}>Earend Points - <input type='text' style={{fontFamily:"cursive", fontSize:"17px", width:"40px", height:"30px", marginLeft:"20px"}} placeholder=' 00'/></label>
        </div>

        {editMode ? (
          <div>
            <button type="submit" style={{fontFamily:"cursive", backgroundColor:"#1eb2a6", color:"white", marginBottom:"30px", marginRight:'40px', borderRadius:"5px"}} className="save-button"> Save Profile </button>
            <a href="/SignIn"><button type="button" style={{fontFamily:"cursive", backgroundColor:"#1eb2a6", color:"white", marginBottom:"30px", borderRadius:"5px"}} onClick={handleDelete}> Delete Profile </button></a>
          </div>
        ) : (
          <button type="button" style={{fontFamily:"cursive", backgroundColor:"#1eb2a6", color:"white", marginBottom:"30px", borderRadius:"5px"}} onClick={() => setEditMode(true)}> Edit Profile</button>
        )}
      </form>
      </div>
    </div>
    </div>
  );
}

export default Userprofile;
