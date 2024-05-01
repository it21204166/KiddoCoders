import React, { Component } from 'react';
import axios from 'axios';

class Exersice extends Component {
  constructor(props){
    super(props)
    this.state = {
      allExercisesDetaild:[]
    }
  }

  componentDidMount(){
    this.retrieveExerciseDetails();
  }


  retrieveExerciseDetails(){
    axios.get("http://localhost:8000/exerciese/get").then(res=>{
      if(res.data.success){
        this.setState({
          allExercisesDetaild:res.data.existingDetails
        })
      }
    })
  }

  onDelete = (id) =>{
    axios.delete(`http://localhost:8000/exercisedelete/delete/${id}`).then((res)=>{
     
      this.retrieveExerciseDetails()


    })
  }


    render() {
        

        return (
            <div className='stock'>


        

              {/* <div className='App'>
                  <ToastContainer
                    position='top-right'
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme='light'
                   />
                </div> */}
                <div>

            <div className='btn-inline' style={{marginTop:"80px"}} >
                
                
                


              </div>

            

              <div>
              <a href={'/exercisemanagement/exercise/addexercise'} ><button className='btn-success'>Add Exersice</button></a>
        
                <table className='content-table'>
                  <thead className='tData'>
                    <tr>
                      <th scope="col"  style={{borderTopLeftRadius:"10px"}}>C/No</th>
                      <th scope="col" >Exercise Title</th>
                      <th scope="col" >Exercise Category</th>
                      <th scope="col" >About Exercise</th>
                      <th scope="col" >Exercise(beginners/intermediate)</th>
                      
                      
                      <th scope="col"  style={{border:"none",borderTopRightRadius:"10px"}}>Option</th>
                    </tr>

                  </thead>
                  <tbody scope="raw">
                  {this.state.allExercisesDetaild.map((results,index)=>(
                    <tr>
                      <td >{results.eTitle}</td>
                      <td >{results.eCategory}</td>
                      <td >{results.eAbout}</td>
                      <td >{results.eUnder}</td>
                      

                      <div >
                      <td ><a href={`/stock/edit-damaged-item/${results._id}`}><button className="btn btn-warning">Edit</button></a></td>
                      <td ><button className="btn btn-danger" onClick={()=>this.onDelete(results._id)} >Delete</button></td>
                      <td ><a href={`/stock/view-disposed-item/${results._id}`}><button className="btn btn-primary">View</button></a></td>
                      </div>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
              {/* onClick={()=>{this.onDelete(results._id);displayLoginNotification()}}  */}
                
                
                
            </div>
                
            </div>
        );
    }
}

export default Exersice;
