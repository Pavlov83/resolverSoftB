import axios from 'axios';
import React,{Component} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
                <CKEditor
                    editor={ ClassicEditor }
                    data={this.state.description}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        this.setState({description:data})
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
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