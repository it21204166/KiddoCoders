import React, { Component } from "react";
import "./App.css";
// import Header from "./components/common/header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom"; // Import Route instead of Routes
import Exersice from "./components/Exersice/Exersice1";
import CourseHome from "./components/allcourses/CourseHome";
import Pricing from "./components/pricing/Pricing";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
// import Footer from "./components/common/footer/Footer";
import Home from "./components/home/Home";
import Signup from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import ProfileKiddo from "./components/auth/ProfileKiddo";

import Addquestions from "./components/questions/Addquestions";
import Updatequestions from "./components/questions/Updatequestions";
import Displayquestions from "./components/questions/Displayquestions";
import Addfeedbacks from "./components/feedback/Addfeedbacks";
import Updatefeedbacks from "./components/feedback/Updatefeedbacks";
import Displayfeedback from "./components/feedback/Displayfeedbacks";
import Displayfeedback2 from "./components/feedback/Displayfeedback2";
import compiler from "./components/Tutorial/compiler";
import tute from "./components/Tutorial/tute";
import tutorialhub from "./components/Tutorial/tutorialhub";
import tutbeg from "./components/Tutorial/tutbeg";
import tutint from "./components/Tutorial/tutint";

import IntermediatePage from "./components/Exersice/Intermediate/Intermediate";
import BeginnersPage from "./components/Exersice/Beginners/Beginners";
import BeginnersExersixePage from "./components/Exersice/Beginners/BeginnersExercise";
import IntermediateExercisePage from "./components/Exersice/Intermediate/IntermediateExercise";
import ExerciseDisplayPage from "./components/Exersice/Beginners/ExerciseDisplayPage";
import ExerciseGrid from "./components/Exersice/Beginners/ExerciseGrid";
import ExerciseGridIntermediate from "./components/Exersice/Intermediate/ExerciseGridIntermediate";

import Challenges from "./components/Challenges/ChallengePage";
import ChallengeDetailsPage from "./components/Challenges/ChallengeDetailsPage";
import AttempChallenge from "./components/Challenges/AttempChallenge";
import ChooseChallenge from "./components/Challenges/ChooseChallenge";
import ChallengeNotification from "./components/Challenges/ChallengeNotification";


class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isAuthenticated: false // Initially user is not authenticated
  //   };
  // }

  // // Method to handle user authentication
  // handleAuthentication = () => {
  //   // Implement your authentication logic here
  //   // For simplicity, let's assume user is authenticated when this method is called
  //   this.setState({ isAuthenticated: true });
  // };

  render() {
    // const { isAuthenticated } = this.state;
    return (
      <>
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/SignIn" component={SignIn} />
          <Route
            exact
            path="/ProfileKiddo"
            component={ProfileKiddo}
          />
          <Route exact path="/courses" component={CourseHome} />
          <Route exact path="/pricing" component={Pricing} />
          <Route exact path="/journal" component={Blog} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/SignIn' component={SignIn} />
          <Route exact path='/ProfileKiddo' component={ProfileKiddo} />
          
          <Route exact path='/team' component={Team} />
          <Route exact path='/pricing' component={Pricing} />
          <Route exact path='/journal' component={Blog} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/addquestions' component={Addquestions} />
          <Route exact path='/updatequestions/:id' component={Updatequestions} />
          <Route exact path='/displayquestions' component={Displayquestions} />
          <Route exact path='/addfeedbacks' component={Addfeedbacks} />
          <Route exact path='/updatefeedbacks/:id' component={Updatefeedbacks} />
          <Route exact path='/displayfeedbacks' components={Displayfeedback} />
          <Route exact path='/displayfeedback2' component={Displayfeedback2} />
          <Route exact path='/tutes' component={tute} />
          <Route exact path='/compilers' component={compiler} />
          <Route exact path='/tutorialhubs' component={tutorialhub} />
          <Route exact path='/tutbegs' component={tutbeg}/>
          <Route exact path='/tutints' component={tutint}/>

          {/* Thisera */}
          <Route exact path='/exersice' component={Exersice} />
          <Route exact path='/intermediate' component={IntermediatePage} />
          <Route exact path='/beginners' component={BeginnersPage} />
          <Route exact path='/beginnersexercise' component={BeginnersExersixePage} />
          <Route exact path='/intermediatesexercise' component={IntermediateExercisePage} />
          <Route path="/exercise/selectedEx/:exerciseId" component={ExerciseDisplayPage} />
          <Route path="/gridpage" component={ExerciseGrid} />
          <Route path="/gridpageintermediate" component={ExerciseGridIntermediate}/>

          {/* Tennkoon */}

                    {/* Sandumina */}
                    <Route exact path="/challenge" component={Challenges} />
                    <Route
                        exact path="/challenge/details/:id"
                        component={ChallengeDetailsPage}
                    />
                    <Route exact path="/challenge/attemp/:id" component={AttempChallenge}/>
                    <Route exact path="/challenge/choose/:id" component={ChooseChallenge} />
                    <Route exact path="/challenge/notification/:id" component={ChallengeNotification} />

          {/* Sandumina */}
          <Route exact path="/challenge" component={Challenges} />

          {/* <Route exact path='/exersice'>
            {isAuthenticated ? <Exersice /> : <Redirect to='/signup' />}
          </Route>
          <Route exact path='/courses'>
            {isAuthenticated ? <CourseHome /> : <Redirect to='/signup' />}
          </Route>
          <Route exact path='/team'>
            {isAuthenticated ? <Team /> : <Redirect to='/signup' />}
          </Route>
          <Route exact path='/pricing'>
            {isAuthenticated ? <Pricing /> : <Redirect to='/signup' />}
          </Route>
          <Route exact path='/journal'>
            {isAuthenticated ? <Blog /> : <Redirect to='/signup' />}
          </Route>
          <Route exact path='/contact'>
            {isAuthenticated ? <Contact /> : <Redirect to='/signup' />}
          </Route> */}
        </Router>
      </>
    );
  }
}

export default App;
