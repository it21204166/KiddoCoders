/*import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import jwt from "jwt-decode";
import { useFormik } from 'formik'; // corrected import
import { jwtDecode } from 'jwt-decode';



function Userprofile() {
  const [editMode, setEditMode] = useState(false);
  

  const [user, setUser] = useState({
    kiddoName: "",
    kiddoPhone: "",
    kiddoEmail: "",
    kiddoAge: "",
    kiddoPassword: "",
  });
 
  const[userId, setUserId]=useState("")

  useEffect(() => {
    console.log(" for test", JSON.stringify(user));
  }, [JSON.stringify(user)]);
  useEffect(() => {
    let userId = null;

    const token = localStorage.getItem("AuthToken");
    const jwtToken = jwt(token);
    

    console.log("tokentokentokentoken", jwtToken);

    // const decoded = jwt.verify(token, process.env.jwt_secret);
    if (jwtToken.userId) {
      userId = jwtToken.userId;
      setUserId(userId);
    }
    axios
      .get("http://localhost:8000/admin/users/get-user-by-id/" + userId)
      .then((response) => {
        // console.log(response.data.data);
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

  //update
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

  //delete
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

  //validations
  const validationSchema = Yup.object().shape({
    kiddoName: Yup.string().required("Name is required"),
    kiddoPhone: Yup.string().required("kiddo Phone is required"),
    kiddoEmail: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    // password: editMode
    //   ? Yup.string()
    //       .min(6, "Password must be at least 6 characters")
    //       .required("Password is required")
    //   : Yup.string(),
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
    onSubmit: (values) => {
      // Prepare data for submission
      const formData = new FormData();
      formData.append("kiddoName", values.kiddoName);
      formData.append("kiddoPhone", values.kiddoPhone);
      formData.append("kiddoEmail", values.kiddoEmail);
      formData.append("kiddoPassword", values.kiddoPassword);
      formData.append("kiddoAge", values.kiddoAge);

      // const userId = user.id;

      // axios
      //   .put(`http://localhost:5000/admin/users/update-user/`, formData)

      //   .then((response) => {
      //     console.log("User data updated successfully");
      //     setEditMode(false); // Disable editing after submission
      //   })

      //   .catch((error) => {
      //     console.error("Error updating user data:", error);
      //   });
    },
  });
  
  return (
    <div>
      <h2 className="Heading">My Profile</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="kiddoName">kiddo Name</label>
          <input
            type="text"
            id="kiddoName"
            name="kiddoName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.kiddoName}
          />
          {formik.touched.kiddoName && formik.errors.kiddoName && (
            <div className="error-message">{formik.errors.kiddoName}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="kiddoPhone">kiddo Phone</label>
          <input
            type="text"
            id="kiddoPhone"
            name="kiddoPhone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.kiddoPhone}
          />
          {formik.touched.kiddoPhone && formik.errors.kiddoPhone && (
            <div className="error-message">{formik.errors.kiddoPhone}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="kiddoEmail">Kiddo Email</label>
          <input
            type="email"
            id="kiddoEmail"
            name="kiddoEmail"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.kiddoEmail}
          />
          {formik.touched.kiddoEmail && formik.errors.kiddoEmail && (
            <div className="error-message">{formik.errors.kiddoEmail}</div>
          )}
        </div>


        {/* 
        {editMode && (
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error-message">{formik.errors.password}</div>
            )}
          </div>
            )} /////////////////}


        {editMode ? (
          <div>
            <button type="submit" className="save-button"> Save Profile </button>
            <button type="button" onClick={handleDelete}> Delete Profile </button>
          </div>
        ) 
        : (
          <button type="button" onClick={() => setEditMode(true)}> Edit Profile</button>
        )}
      </form>
    </div>
  );
}

export default Userprofile;






/*import React, { Component } from "react";
import axios from "axios";
import "./auth.css";
import * as Yup from "yup";
//import jwt from "jwt-decode";
import jwtDecode from "jwt-decode";



class Userprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImage: null,
      editMode: false,
      user: {
        kiddoName: "",
        kiddoPhone: "",
        kiddoEmail: "",
        kiddoAge: "",
        kiddoPassword: "",
      },
      userId: "",
    };
  }

  componentDidMount() {
    // Your existing code
  }

  componentDidMount() {
    let userId = null;

    const token = localStorage.getItem("AuthToken");
    const jwtToken = jwt(token);

    if (jwtToken.userId) {
      userId = jwtToken.userId;
      this.setState({ userId });
    }

    axios
      .get("http://localhost:8000/admin/users/get-user-by-id/" + userId)
      .then((response) => {
        const userData = response?.data?.data;
        if (userData) {
          this.setState({ user: userData });
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }

//update
  handleSubmit = async () => {
    const { user } = this.state;
    try {
      const response = await axios.put(
        `http://localhost:8000/admin/users/update-user/${user.id}`,
        user
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

    //Delete user
  handleDelete = async () => {
    const { userId } = this.state;
    try {
      const response = await axios.delete(
        `http://localhost:8000/admin/users/delete-user/${userId}`
      );

      if (response.data.success) {
        console.log("User deleted successfully");
        // Redirect to home page or other route after deletion if needed
      } else {
        console.error("User deletion failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  handleImageChange = (e) => {
    const file = e.target.files[0];
    this.setState({ profileImage: file });
  };

  render() {

    return(
      <div className='signup'>
        <div className='image-containerprofile'>
        <h1 className="center-item" style={{fontFamily:"cursive", marginLeft:"45%"}}>Hey Kiddo!</h1>
          <img style={{width:"300px",height:"500px", marginTop:"5%", marginLeft:"30%"}} className='register_boy' src='../../register_boy.png'/>
        </div>
        <div className='form-containerprofile' style={{border:"solid", backgroundColor:"#f2f2f2", borderRadius:"10PX", marginTop:"2%", marginRight:"10%", marginBottom:"20px"}}>
        <h1 className="center-item" style={{fontFamily:"cursive",marginBottom:"35px", marginTop:"30px"}}>EDIT KIDDO PROFILE</h1>
        <form onSubmit={formik.handleSubmit}>
          <br></br>
          <div className='input-container'>
            <label className='primary' style={{backgroundColor:"#f2f2f2", fontFamily:"cursive"}}>Full Name</label>
            <input
            type='text'
            id="kiddoName"
            name="kiddoName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.kiddoName}
            className='form-inputSignin'
            style={{fontFamily:"cursive", backgroundColor:"#f2f2f2"}}
            placeholder='kiddo Name'/>{formik.touched.kiddoName && formik.errors.kiddoName && (<div className="error-message">{formik.errors.kiddoName}</div>)}
            </div>
          <div className='input-container'>
            <label className='primary' style={{backgroundColor:"#f2f2f2", fontFamily:"cursive"}}>Phone Number</label>
            <input
            type='text'
            id="kiddoPhone"
            name="kiddoPhone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.kiddoPhone}
            className='form-inputSignin'
            style={{fontFamily:"cursive", backgroundColor:"#f2f2f2"}}
            placeholder='Kiddo Phone'/>{formik.touched.kiddoPhone && formik.errors.kiddoPhone && (<div className="error-message">{formik.errors.kiddoPhone}</div>)}
            </div>
          <div className='input-container'>
            <label className='primary'style={{backgroundColor:"#f2f2f2", fontFamily:"cursive"}}>Age</label>
            <input
            type='text'
            id="kiddoAge"
            name="kiddoAge"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.kiddoAge}
            className='form-inputSignin'
            style={{fontFamily:"cursive", backgroundColor:"#f2f2f2"}}
            placeholder='Kiddo Age'/>{formik.touched.kiddoAge && formik.errors.kiddoAge && (<div className="error-message">{formik.errors.kiddoAge}</div>)}
            </div>
              <div className='input-container' style={{marginTop:'20px'}}>
              <label className='primary' style={{backgroundColor:"#f2f2f2", fontFamily:"cursive"}}>Upload Kiddo Photo</label>
              <input type='file' className='form-inputSignin' style={{fontFamily:"cursive", height:"50px"}} name='profilePhoto' onChange={this.handlePhotoUpload}/>
              </div>
              <div className='input-container'>
              <label style={{fontFamily:"cursive"}}>Successfully Completed Tutorials - <input type='text' style={{fontFamily:"cursive", fontSize:"17px", width:"40px", height:"30px", marginLeft:"20px"}} name='supName' onChange={this.haddleInputChanges} placeholder=' 01'/></label>
            </div>
            
            <div className='input-container'>
            {editMode ? (
          <div>
            <button type="submit" >Save Profile</button>
            <button type="button" onClick={this.handleDelete}>Delete Profile</button>
          </div>
        ) : (
          <button type="button"  onClick={() => this.setState({ editMode: true })}>Edit Profile</button>
        )}</div>
          </form>
        </div>

      </div>
    )
  }
}

export default Userprofile;
*/