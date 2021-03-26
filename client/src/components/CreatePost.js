import axios from 'axios';
import React,{Component} from 'react';

class CreatePost extends Component{

    constructor(props){
        super(props);
            this.state = {
            title:"",
            description:"",
            category:""
            
        }
    }

    handleInputChange = (e)=>{
        const{name,value} = e.target;
        this.setState({
            ...this.state,
            [name]:value,
        })
    }

    onSubmit=(e)=>{
        e.preventDefault();
        const{title,description,category} = this.state;
        const data = {
            title:title,
            description:description,
            postCategory:category
        }
        console.log(data);
        axios.post("/posts/add",data)
        .then((res)=>{
            if(res.data.success){
                alert("Successfully Added")
                this.setState({
                    title:"",
                    description:"",
                    category:""
                })
            }
        })
    }

    render(){
    return(
    <div className="col-md-10 mt-3 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">
            Create New Post</h1>
            <form className="needs-validation" novalidate >
                <div className="form-group">
                    <label>Title</label>
                    <input
                         type="text"
                         className="form-control"
                         name="title"
                         placeholder="Enter title"
                         value={this.state.title}
                         onChange={this.handleInputChange}
                        />
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <input type="text"
                           className="form-control"
                           name="category"
                           placeholder="Enter category"
                           value={this.state.category}
                           onChange={this.handleInputChange}
                           />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input type="text"
                           className="form-control"
                           name="description"
                           placeholder="Enter description"
                           value={this.state.description}
                           onChange={this.handleInputChange}
                           />       
                </div>
              <br></br>  
                <div>
                <button className="btn btn-success" type="submit" onClick={this.onSubmit}>
                    <i className="far fa-check-square"></i>
                    &nbsp;Submit
                </button>
                </div>
            </form>
    
    </div>
    )}
}

export default CreatePost;