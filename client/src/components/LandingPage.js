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

  onDelete = (id) =>{
    axios.delete(`/posts/delete/${id}`)
         .then(res=> alert(res.data.title + ' deleted successfully'))
         this.getPosts();
  }

  filterContent(posts, searchTerm){
    const result = posts.filter(post =>post.title.toLowerCase().includes(searchTerm)||
    post.description.toLowerCase().includes(searchTerm)||
    post.title.toLowerCase().includes(searchTerm));
    this.setState({posts:result});
  }

  handleTextSearch =(e)=>{
    const searchTerm = e.currentTarget.value;
    axios.get('/posts')
    .then((res)=>{
       if(res.data.success){
        this.filterContent(res.data.posts,searchTerm)

       }
    })
  }

  render(){
    return(
    <div className="container"> 
      <form class="d-flex">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
      onChange={this.handleTextSearch}
      ></input>
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
      {this.state.posts.map((post,index) =>{
       
     return (
     <div  className="container"> 
     
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
              <td dangerouslySetInnerHTML={{ __html:post.description}} ></td>
              <td>{post.postCategory}</td>
              <td>
                <a className= "btn btn-warning" href={`/edit/${post._id}`}>
                  <i className="fas fa-edit"></i>&nbsp;Edit
                </a>&nbsp;
                <a className= "btn btn-danger" href='#' 
                onClick={()=> this.onDelete(post._id)}>
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