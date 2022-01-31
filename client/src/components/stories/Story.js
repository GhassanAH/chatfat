import React,{useState,useEffect} from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState} from 'draft-js'
import {Form, Button, Alert, Spinner} from "react-bootstrap"
import { convertToHTML, convertFromHTML } from 'draft-convert'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../css/Portfolio.css"
import { connect } from 'react-redux'
import {submitBlogs, getBlogById, updadteBlog} from '../../actions'
import {useHistory, useParams} from 'react-router-dom'


const Story = ({submitBlog, readBlog, updateBlogs, user}) => {

    const [render, setRender] = useState(false)
    const [picture, setPicture] = useState("")
    const [load, setLoad] = useState(false)
    const [update, setUpdate] = useState(false)
    const [title, setTitle] = useState("")
    const [error, setError] = useState("")
    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty())
    const [video, setVideo] = useState("")
    const [updatePage, setUpdatePage] = useState(false)
    let history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        if(id){
            setUpdate(true)
            readBlog(id)
        }else{
            setRender(true) 
        }
    },[])

    useEffect(() => {
        if(user){
            if(user.success && update){
                console.log(user.blogs)
                setError("")
                setTitle(user.blogs[0].title)
                setPicture(user.blogs[0].imageUrl)
                setVideo(user.blogs[0].videoUrl)
                const blocksFromHTML = convertFromHTML(user.blogs[0].content);
                const state = ContentState.createFromBlockArray(blocksFromHTML.getBlocksAsArray(), blocksFromHTML.getEntityMap());
                setEditorState(EditorState.createWithContent(state))
                setUpdatePage(true)
                setUpdate(false)
                setRender(true)
            }else if(user.success){
                setError("")
                setLoad(false)
            }
            else{
                setError(user.message)
            }
        }
    }, [user])
    

    const convertContentToHTML = () => {
        setLoad(true)
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent())
        if(updatePage){
            updateBlogs(id,title, currentContentAsHTML,picture,video)
        }else{
            submitBlog(title, currentContentAsHTML, picture, video)
        }
        redirectToProfile()
    }

    const redirectToProfile = () => {
        while(true)
        {
            if(!load)
            {
                if(!error)
                {
                    history.replace('/home/profile')
                }
                break
            }

        }
       
    }

    

  

    return (
            
             <div className="main-container">
                    <h4>Write a story and add a picture or a video</h4><br></br>
                    {!render && <div style = {{display:"flex", justifyContent:"center", alignItems:"center", width:"100%"}}>
                            <Spinner animation="border" variant="primary"/>    
                        </div>
                    }

                    {error && <Alert variant="danger">
                            {error}
                        </Alert>
                    }
                    {render &&
                    <>  
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={setEditorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editor-class"
                            wrapperStyle={{ width: "80%",height:"auto", background:"#fff", color:"#222",border: "10px solid rgb(166, 192, 194)" }}
                        />
                        <br></br>
                        <br></br>                        
                        <Form style={{ width: "80%", fontSize:"1.7rem"}} onSubmit={convertContentToHTML}>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Enter your title" required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>picture link</Form.Label>
                                <Form.Control onChange={(e) => setPicture(e.target.value)} value={picture} type="picture-link" placeholder="Enter your picture link" required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>video link</Form.Label>
                                <Form.Control onChange={(e) => setVideo(e.target.value)} value={video} type="video-link" placeholder="Enter your video link" />
                            </Form.Group>
                            
                            <Button variant="primary" type="submit">
                                {updatePage? "Update": "Submit"}
                                { load &&
                                    <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                }
                            </Button>
                        </Form>
                    </>
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
        submitBlog: (title, content, image, video ) => dispatch(submitBlogs(title, content, image, video )),
        readBlog: (id) => dispatch(getBlogById(id)),
        updateBlogs: (id,title,content,imageUrl,videoUrl) => dispatch(updadteBlog(id,title,content,imageUrl,videoUrl))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Story)
