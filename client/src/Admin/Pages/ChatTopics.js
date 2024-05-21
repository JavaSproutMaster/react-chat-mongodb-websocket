import React, { useState, useEffect } from 'react'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import AdminNavbar from '../../Components/Admin/Navbar/AdminNavbar'
import FooterAdmin from '../../Components/Admin/Footer/FooterAdmin'
import axios from 'axios'
import swal from 'sweetalert'

export default function ChatTopics() {

    const [selectedImage1, setSelectedImage1] = useState();
    const [selectedImage2, setSelectedImage2] = useState();
    const [selectedImage3, setSelectedImage3] = useState();
    const [selectedImage4, setSelectedImage4] = useState();

    const [topic1headline,settopic1headline] = useState([]);
    const [topic1content,settopic1content] = useState([]);
    const [topicimage1,settopic1image] = useState('');

    const [topic2headline,settopic2headline] = useState([]);
    const [topic2content,settopic2content] = useState([]);
    const [topicimage2,settopic2image] = useState('');

    const [topic3headline,settopic3headline] = useState([]);
    const [topic3content,settopic3content] = useState([]);
    const [topicimage3,settopic3image] = useState('');

    const [topic4headline,settopic4headline] = useState([]);
    const [topic4content,settopic4content] = useState([]);
    const [topicimage4,settopic4image] = useState('');

    const [chatTopicId,setChatTopic_id] = useState('');

    const HandleImage1 = (e) => {
        setSelectedImage1(e.target.files[0]);
        settopic1image(e.target.files[0]);
    }

    const HandleImage2 = (e) => {
        setSelectedImage2(e.target.files[0]);
        settopic2image(e.target.files[0]);
    }

    const HandleImage3 = (e) => {
        setSelectedImage3(e.target.files[0]);
        settopic3image(e.target.files[0]);
    }

    const HandleImage4 = (e) => {
        setSelectedImage4(e.target.files[0]);
        settopic4image(e.target.files[0]);
    }

    useEffect(() => {
        
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/chat-topics`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            debugger;
            settopic1headline(result.data.data.topic1headline);
            settopic1content(result.data.data.topic1content);
            settopic2headline(result.data.data.topic2headline);
            settopic2content(result.data.data.topic2content);
            settopic3headline(result.data.data.topic3headline);
            settopic3content(result.data.data.topic3content);
            settopic4headline(result.data.data.topic4headline);
            settopic4content(result.data.data.topic4content);
            setChatTopic_id(result.data.data._id);
            settopic1image(result.data.data.topicimage1);
            settopic2image(result.data.data.topicimage2);
            settopic3image(result.data.data.topicimage3);
            settopic4image(result.data.data.topicimage4);
        });
    }, []);

    const SubmitChatTopics = (chattopc_id) => {

        const formData = new FormData();

        if(topicimage1) {
            formData.append("topicimage1", topicimage1);
        }

        if(topicimage2) {
            formData.append("topicimage2", topicimage2);
        }

        if(topicimage3) {
            formData.append("topicimage3", topicimage3);
        }

        if(topicimage4) {
            formData.append("topicimage4", topicimage4);
        }

        formData.append("topic1headline", topic1headline);
        formData.append("topic1content", topic1content);
        formData.append("topic2headline", topic2headline);
        formData.append("topic2content", topic2content);
        formData.append("topic3headline", topic3headline);
        formData.append("topic3content", topic3content);
        formData.append("topic4headline", topic4headline);
        formData.append("topic4content", topic4content);
        
        if(topic1content.length > 200 || topic2content.length > 200 || topic3content.length > 200 || topic4content.length > 200) {
            swal("error", "Character limit is 200 please try to write words within the limit of 200 character", "error");
        } else {
            axios.put(`${process.env.REACT_APP_BASE_URL}/admin/chat-topics/${chattopc_id}`, formData, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'content-type': 'multipart/form-data',
                    'Authorization': `Bearer ` + localStorage.getItem('accessToken')
                },
            }).then(result => {
                settopic1headline(result.data.data.topic1headline);
                settopic1content(result.data.data.topic1content);
                settopic2headline(result.data.data.topic2headline);
                settopic2content(result.data.data.topic2content);
                settopic3headline(result.data.data.topic3headline);
                settopic3content(result.data.data.topic3content);
                settopic4headline(result.data.data.topic4headline);
                settopic4content(result.data.data.topic4content);
                swal("success", "Saved", "success");
            });
        } 
    }

    const ImageDelete = (type,chatTopicId) => {
        if(type === 'topicimage1') {
           settopic1image('');
           const formData = {
             "topicimage1": ''
           }
           axios.post(`${process.env.REACT_APP_BASE_URL}/admin/chat-topics/${chatTopicId}`, formData, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
            }).then(result => {
                swal("success", "Deleted", "success");
            });
        } else if(type === 'topicimage2') {
            settopic2image('');
            const formData = {
              "topicimage2": ''
            }
            axios.post(`${process.env.REACT_APP_BASE_URL}/admin/chat-topics/${chatTopicId}`, formData, {
             headers: {
                 'Accept': 'application/json, text/plain, */*',
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ` + localStorage.getItem('accessToken')
             },
             }).then(result => {
                 swal("success", "Deleted", "success");
             });
        } else if(type === 'topicimage3') {
            settopic3image('');
            const formData = {
              "topicimage3": ''
            }
            axios.post(`${process.env.REACT_APP_BASE_URL}/admin/chat-topics/${chatTopicId}`, formData, {
             headers: {
                 'Accept': 'application/json, text/plain, */*',
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ` + localStorage.getItem('accessToken')
             },
             }).then(result => {
                 swal("success", "Deleted", "success");
             });
        } else if(type === 'topicimage4') {
            settopic4image('');
            const formData = {
              "topicimage4": ''
            }
            axios.post(`${process.env.REACT_APP_BASE_URL}/admin/chat-topics/${chatTopicId}`, formData, {
             headers: {
                 'Accept': 'application/json, text/plain, */*',
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ` + localStorage.getItem('accessToken')
             },
             }).then(result => {
                 swal("success", "Deleted", "success");
             });
        }
    }
    debugger;
  return (
    <div className='relative md:ml-64 bg-default-skin'>
        <Sidebar/>
        <AdminNavbar/>
        <div className="flex flex-wrap min600">
            <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 gridstyle">
                <h1 className='text-2xl text-black font-bold mb-3'>Chat Topics</h1>
                <form className='mt-4 shadow-md p-4 rounded bg-white'>

                        <div className="form-group">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                            <input type="text" id="headline" value={topic1headline} onChange={(e) => settopic1headline(e.target.value)} placeholder="Headline for Topic One" className="bg-white mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <textarea id="topic" rows="3" value={topic1content} onChange={(e) => settopic1content(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Content for Topic One"></textarea>
                            <input type="file" onChange={HandleImage1} className="bg-white mb-2 mt-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {
                               !selectedImage1 && topicimage1 && 
                               <>
                                  <img src={`${process.env.REACT_APP_BASE_URL}/${topicimage1}`} className="img-fluid" style={{maxWidth: "200px"}} />
                                  <button type="button" onClick={() => ImageDelete('topicimage1',chatTopicId)} className="btn btn-primary" style={{ marginTop: '2%' }}>Delete</button>
                               </>      
                            }
                            {selectedImage1 && (
                                <div>
                                    <img
                                        src={URL.createObjectURL(selectedImage1)}
                                        alt="Thumb" 
                                    />
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                            <input type="text" id="headline" value={topic2headline} onChange={(e) => settopic2headline(e.target.value)} placeholder="Headline for Topic Two" className="bg-white mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <textarea id="topic" rows="3" value={topic2content} onChange={(e) => settopic2content(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Content for Topic Two"></textarea>
                            <input type="file" onChange={HandleImage2} className="bg-white mb-2 mt-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {
                               !selectedImage2 && topicimage2 && 
                               <>
                                  <img src={`${process.env.REACT_APP_BASE_URL}/${topicimage2}`} className="img-fluid" style={{maxWidth: "200px"}} />   
                                  <button type="button" onClick={() => ImageDelete('topicimage2',chatTopicId)} className="btn btn-primary" style={{ marginTop: '2%' }}>Delete</button>
                               </> 
                            }
                            {selectedImage2 && (
                                <div>
                                    <img
                                        src={URL.createObjectURL(selectedImage2)}
                                        alt="Thumb" 
                                    />
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                            <input type="text" id="headline" value={topic3headline} onChange={(e) => settopic3headline(e.target.value)}  placeholder="Headline for Topic Three" className="bg-white mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <textarea id="topic" rows="3" value={topic3content}  onChange={(e) => settopic3content(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Content for Topic Three"></textarea>
                            <input type="file" onChange={HandleImage3} className="bg-white mb-2 mt-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {
                                !selectedImage3 && topicimage3 && 
                                <>
                                    <img src={`${process.env.REACT_APP_BASE_URL}/${topicimage3}`} className="img-fluid" style={{maxWidth: "200px"}} />   
                                    <button type="button" onClick={() => ImageDelete('topicimage3',chatTopicId)} className="btn btn-primary" style={{ marginTop: '2%' }}>Delete</button>
                                </>
                            }
                            {selectedImage3 && (
                                <div>
                                    <img
                                        src={URL.createObjectURL(selectedImage3)}
                                        alt="Thumb" 
                                    />
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                            <input type="text" id="headline" value={topic4headline} onChange={(e) => settopic4headline(e.target.value)}  placeholder="Headline for Topic Four" className="bg-white mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <textarea id="topic" rows="3" value={topic4content} onChange={(e) => settopic4content(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Content for Topic Four"></textarea>
                            <input type="file" onChange={HandleImage4} className="bg-white mb-2 mt-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {
                                !selectedImage4 && topicimage4 && 
                                <>
                                    <img src={`${process.env.REACT_APP_BASE_URL}/${topicimage4}`} className="img-fluid" style={{maxWidth: "200px"}} />   
                                    <button type="button" onClick={() => ImageDelete('topicimage4',chatTopicId)} className="btn btn-primary" style={{ marginTop: '2%' }}>Delete</button>
                                </>
                            }
                            {selectedImage4 && (
                                <div>
                                    <img
                                        src={URL.createObjectURL(selectedImage4)}
                                        alt="Thumb" 
                                    />
                                </div>
                            )}
                        </div>
    
                    <div className='mt-2'>
                        <button type="button" onClick={() => SubmitChatTopics(chatTopicId)} className="text-white bg-package-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Save</button>
                    </div>
                </form>
            </div>
        </div>
        <FooterAdmin/>
    </div>
  )
}
