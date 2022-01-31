import React,{useEffect, useState} from 'react'
import { connect } from 'react-redux'
import {getBlogs, deleteBlog} from '../../actions'
import "../../css/Mystory.css"
import { faEye, faUserEdit, faTimes} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Spinner, Modal, Button} from "react-bootstrap"


const MyStory = ({getBlog,deletePost, user}) => {

    const [fetchedBlogs, setFetchedBlogs] = useState([])
    const [fetched, setFetched] = useState(false)
    const [show, setShow] = useState(false);
    const [id, setId] = useState("");
    
 
   


    useEffect(() => {
        if(!fetched){
            getBlog()
            
           
        }
       

    },[])

    useEffect(() => {
        if(user && !fetched){
            setFetchedBlogs((fetchedBlogs) => [...fetchedBlogs, ...user.blogs])
            setFetched(true)
           
        }else if(user && fetched){
            getBlog()
            setFetched(false)
            
        }
    },[user])

    const handleClose = () => {
        setShow(false)
        setId("")
    }

    const handleCloseSubmission = async () => {
        await deletePost(id)
        setShow(false)
        setFetchedBlogs([])
        
    }
    const handleShow = (id) => {
        setId(id)
        setShow(true)
    }



    
 
    
    return (
        <>
         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to remove the blog?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
               Cancel
            </Button>
            <Button variant="primary" onClick={handleCloseSubmission}>
                Remove
            </Button>
            </Modal.Footer>
        </Modal>

          <div className="mainCover">
               <h1>My Articles</h1><br></br>
               <div className="container_main">

                    {!fetched && <div style = {{display:"flex", justifyContent:"center", alignItems:"center", width:"100%"}}>
                                            <Spinner animation="border" variant="primary"/>    
                                        </div>
                    }

                    {fetchedBlogs && fetchedBlogs.map((blog,id) => {
                        return <div className="container_child" key={id}>
                                    <div className="close_button">
                                        <button onClick={() => handleShow(blog._id)}><i><FontAwesomeIcon icon={faTimes}/></i></button>
                                    </div>
                                    <h1>{blog.title}</h1>
                                    <p>Created At<span>{blog.createdAt}</span></p>
                                    <img src={blog.imageUrl} alt="blog picture" />
                                    <div className="buttons">
                                        <a href={`/home/profile/readBlog/${blog._id}`}><span><FontAwesomeIcon icon={faEye} /></span></a>
                                        <a href={`/home/profile/editBlog/${blog._id}`}><span><FontAwesomeIcon icon={faUserEdit} /></span></a>
                                    </div>
                                    
                                  
                                </div>
                    })}
                </div>
        </div>
        </>
       
        
    )


  
}

const mapStateToProps = state => {
    return {
      auth: state.auth,
      user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBlog: () => dispatch(getBlogs()),
        deletePost: (id) =>dispatch(deleteBlog(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyStory)
