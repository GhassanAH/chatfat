import React,{useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import DOMPurify from 'dompurify';
import {getBlogById} from '../../actions'
import {Spinner} from "react-bootstrap"
import "../../css/Read.css"

const Read = ({readBlog, user}) => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null)
    const [render, setRender] = useState(false)

    useEffect(() => {
        readBlog(id)
    }, [])

    useEffect(() => {
        if(user && !render){
            setBlog(user.blogs[0])
            setRender(true)
            
        }
        
    }, [user])

    const createMarkup = (html) => {
        return  {
            __html: DOMPurify.sanitize(html)
        }

    }


    return (
        <div className="m_container">
            {!render && <div style = {{display:"flex", justifyContent:"center", alignItems:"center", width:"100%"}}>
                                            <Spinner animation="border" variant="primary"/>    
                                        </div>
            }
            {blog && 
                        <div className="content-container">
                            <h1>{blog.title}</h1>
                            <img src={blog.imageUrl} alt="blog picture"></img>
                            <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div>
                        </div>
                    
            }
        </div>
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
        readBlog: (id) => dispatch(getBlogById(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Read)
