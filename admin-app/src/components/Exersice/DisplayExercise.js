import React, { Component } from 'react';
import axios from 'axios';

class DisplayExercise extends Component {
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
    axios.delete(`http://localhost:8000/disposeditem/delete/${id}`).then((res)=>{
     
      this.retrieveDisposedDetails()


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
                <a href={`/stock/add-disposed-item`}><button className='btn btn-warning' style={{marginTop:"15px"}}><i class="fa-solid fa-pen-to-square"></i> Add Disposed Item</button></a>
                <table className='content-table'>
                  <thead className='tData'>
                    <tr>
                      <th scope="col"  style={{borderTopLeftRadius:"10px"}}>C/No</th>
                      <th scope="col" >Disposed Item Name</th>
                      <th scope="col" >Item Category</th>
                      <th scope="col" >Item Quantity</th>
                      
                      
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
                      <td ><button className="btn btn-danger"  >Delete</button></td>
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

export default DisplayExercise;
