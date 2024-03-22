import React, { Component } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { GetLoggedInUserDetails } from "./apiCalls/users";

class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.navigate = useNavigate();
  }

  async componentDidMount() {
    const token = localStorage.getItem("AuthToken");
    if (!token) {
      this.navigate("/Signup");
    } else {
      await this.validateUserToken();
    }
  }

  validateUserToken = async () => {
    try {
      const response = await GetLoggedInUserDetails();
      if (response.success) {
        this.setState({ user: response.data });
      } else {
        // localStorage.removeItem("AuthToken");
        message.error(response.message);
      }
    } catch (error) {
      // localStorage.removeItem("AuthToken");
      message.error(error.message);
    }
  };

  render() {
    const { user } = this.state;
    const { children } = this.props;

    return (
      <div>
        {user ? (
          <div className="p-1">
            <div className="header p-2 bg-primary flex justify-between rounded items-center">
              <div className="flex items-center gap-1 bg-white p-1 rounded">
                <i className="ri-shield-user-line "></i>
                <span
                  className="text-sm underline"
                  onClick={() => this.navigate("/profile")}
                >
                  {user.name ? user.name.toUpperCase() : ""}
                </span>
                <i
                  className="ri-logout-box-r-line ml-2"
                  onClick={() => {
                    localStorage.removeItem("AuthToken");
                    this.navigate("/login");
                  }}
                ></i>
              </div>
            </div>

            <div className="content mt-1">{children}</div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        {/* {user && (
          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#007bff",
              marginTop: "16px",
            }}
          >
            Hello {user.firstName} 
          </div>
        )} */}
      </div>
    );
  }
}

export default ProtectedRoute;
