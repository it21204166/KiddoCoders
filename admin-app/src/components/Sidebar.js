import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { PiUserCircleFill } from "react-icons/pi";
import { FiArrowUpCircle } from "react-icons/fi";

const Nav = styled.div`
  background-color: #1eb2a6;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

const NavIcon = styled(Link)`
  font-size: 20px;
  height: 87px;
  display: flex;
  justify-content: right;
  align-items: center;
  margin-right: 1rem;
`;

const SidebarNav = styled.nav`
  background-color: #0e635d;
  width: 200px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const UserProfileIcon = styled(PiUserCircleFill)`
  font-size: 40px;
  color: white;
  margin-right: 0rem;
`;

const ScrollToTopIcon = styled(FiArrowUpCircle)`
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 30px;
  background-color: rgba(30, 178, 166, 0.8);
  cursor: pointer;
  border-radius: 20px;
  &:hover {
    background-color: #0b524c;
    cursor: pointer;
  }
`;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: false,
      scroll: false,
      beginnerExercises: [],
      intermediateExercises: [],
      error: null
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.pageYOffset > 300) {
      this.setState({ scroll: true });
    } else {
      this.setState({ scroll: false });
    }
  };

  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  showSidebar = () => {
    this.setState(prevState => ({ sidebar: !prevState.sidebar }));
  };

  componentDidMount() {
    // Fetch data for beginners category
    fetch('/exercises/categories')
      .then(response => response.json())
      .then(data => {
        this.setState({ beginnerExercises: data.exercisesByCategory });
      })
      .catch(error => {
        console.error('Error fetching beginner exercises:', error);
        this.setState({ error: 'Error fetching beginner exercises' });
      });

    // Fetch data for intermediate category
    fetch('/exercises/categories/intermediate')
      .then(response => response.json())
      .then(data => {
        this.setState({ intermediateExercises: data.exercisesByCategory });
      })
      .catch(error => {
        console.error('Error fetching intermediate exercises:', error);
        this.setState({ error: 'Error fetching intermediate exercises' });
      });

    // Add event listener for scrolling
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    // Remove event listener when component unmounts
    window.removeEventListener('scroll', this.handleScroll);
  }
  
  render() {
    const { beginnerExercises, intermediateExercises, error } = this.state;
    return (
      <>
        <IconContext.Provider value={{ color: "#fff" }}>
          <Nav>
            <NavIcon to="#">
              <FaIcons.FaBars onClick={this.showSidebar} />
            </NavIcon>
            <h1 style={{ textAlign: "center", color: "white" }}>
              {'<KIDDO/CODERS>'}
            </h1>
            <NavIcon to="#">
              <UserProfileIcon />
            </NavIcon>
          </Nav>
          <SidebarNav sidebar={this.state.sidebar}>
            <SidebarWrap>
              <NavIcon to="#">
                <AiIcons.AiOutlineClose onClick={this.showSidebar} />
              </NavIcon>
              {SidebarData.map((item,index) => {
                return <SubMenu item={item} key={index} />;
              })}
            </SidebarWrap>
          </SidebarNav>
          {this.state.scroll && <ScrollToTopIcon onClick={this.scrollToTop} />}
        </IconContext.Provider>
        <div>
          <h2>Beginner Exercises</h2>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Exercises</th>
              </tr>
            </thead>
            <tbody>
              {beginnerExercises.map((category, index) => (
                <tr key={index}>
                  <td>{category._id}</td>
                  <td>{category.exercises.map(exercise => exercise.name).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Render intermediate exercises */}
        <div>
          <h2>Intermediate Exercises</h2>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Exercises</th>
              </tr>
            </thead>
            <tbody>
              {intermediateExercises.map((category, index) => (
                <tr key={index}>
                  <td>{category._id}</td>
                  <td>{category.exercises.map(exercise => exercise.name).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Sidebar;
