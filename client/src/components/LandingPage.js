import React,{Component} from 'react';
import axios from 'axios';


class LandingPage extends Component{

  constructor(props){
    super(props);
    this.state={
      posts:[]
    }
  }

  componentDidMount(){
    this.getPosts();
  }

  getPosts(){
    axios.get('/posts')
         .then((res)=>{
            if(res.data.success){
              this.setState({
                posts:res.data.posts,
              })
              console.log(this.state.posts);
            }
         })

  }

  render(){
    return(
    <div className="container"> 
      
      {this.state.posts.map((post,index) =>{
         
     return (
     <div  > 
        <table class="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <th scope="row">{index}</th>
              <td>
              <a href={`/posts/${post._id}`}>{post.title}</a>
              </td>
              <td>{post.description}</td>
              <td>{post.postCategory}</td>
              <td>
                <a className= "btn btn-warning" href='#'>
                  <i className="fas fa-edit"></i>&nbsp;Edit
                </a>&nbsp;
                <a className= "btn btn-danger" href='#'>
                  <i class="far fa-trash-alt"></i>&nbsp;Delete
                </a>
              </td>           
            </tr>         
          </tbody>
        </table>
      </div>   
           
      )})}  <button className="btn btn-dark" ><a href="/add">Add Post</a></button>
      
      </div> 
    
    )}
}


export default LandingPage;