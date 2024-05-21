import axios from 'axios'
import swal from 'sweetalert'
import React, { useState, useEffect } from 'react'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import AdminNavbar from '../../Components/Admin/Navbar/AdminNavbar'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default function SignupInfo() {

    const [formValues, setFormValues] = useState([{ listname: ""}]);
    const [headline,setHeadline] = useState('');
    const [content, setContent] = useState();
    const [contentValues,setContentValues] = useState('');
    const [featureheadline1,setfeatureHeadline1] = useState('');
    const [featuredesc1,setfeatureHDesc1] = useState('');
    const [featureImage1,setFeatureImage1] = useState('');
    const [featureheadline2,setfeatureHeadline2] = useState('');
    const [featuredesc2,setfeatureHDesc2] = useState('');
    const [featureImage2,setFeatureImage2] = useState('');
    const [featureheadline3,setfeatureHeadline3] = useState('');
    const [featuredesc3,setfeatureHDesc3] = useState('');
    const [featureImage3,setFeatureImage3] = useState('');

    const [signupinfoId,setSignupinfo_id] = useState('');

    const [selectedImage1, setSelectedImage1] = useState();
    const [selectedImage2, setSelectedImage2] = useState();
    const [selectedImage3, setSelectedImage3] = useState();

    const HandleImage1 = (e) => {
        setSelectedImage1(e.target.files[0]);
        setFeatureImage1(e.target.files[0]);
    }

    const HandleImage2 = (e) => {
        setSelectedImage2(e.target.files[0]);
        setFeatureImage2(e.target.files[0]);
    }

    const HandleImage3 = (e) => {
        setSelectedImage3(e.target.files[0]);
        setFeatureImage3(e.target.files[0]);
    }   

    let handleChange = (i, e) => {

        const { name, value } = e.target;
        const list = [...formValues];
        list[i][name] = value;
        setFormValues(list);
      }
    
    let addFormFields = () => {
        setFormValues([...formValues, { listname: ""}])
    }
    
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/signupinfo`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            setHeadline(result.data.data.headline);
            setFormValues(result.data.title);
            setfeatureHeadline1(result.data.data.featureheadline1);
            setfeatureHDesc1(result.data.data.featuredesc1);
            setfeatureHeadline2(result.data.data.featureheadline2);
            setfeatureHDesc2(result.data.data.featuredesc2);
            setfeatureHeadline3(result.data.data.featureheadline3);
            setfeatureHDesc3(result.data.data.featuredesc3);
            setFeatureImage1(result.data.data.featureimage1);
            setFeatureImage2(result.data.data.featureimage2);
            setFeatureImage3(result.data.data.featureimage3);
            setSignupinfo_id(result.data.data._id);
        });
    }, []);

    const SubmitSignupInfo = (chattopc_id) => {

        const formData = new FormData();

        if(featureImage1) {
            formData.append("featureimage1", featureImage1);
        }

        if(featureImage2) {
            formData.append("featureimage2", featureImage2);
        }

        if(featureImage3) {
            formData.append("featureimage3", featureImage3);
        }

        var contentNew = [];
        if(formValues) {
            formValues.map((item) => (
                contentNew.push(item.listname)
            ))
        }

        formData.append("headline", headline);
        formData.append("featureheadline1", featureheadline1);
        formData.append("featuredesc1", featuredesc1);
        formData.append("featureheadline2", featureheadline2);
        formData.append("featuredesc2", featuredesc2);
        formData.append("featureheadline3", featureheadline3);
        formData.append("featuredesc3", featuredesc3);
        formData.append("title",contentNew);

            axios.put(`${process.env.REACT_APP_BASE_URL}/admin/signupinfo/${chattopc_id}`, formData, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'content-type': 'multipart/form-data',
                    'Authorization': `Bearer ` + localStorage.getItem('accessToken')
                },
            }).then(result => {
                setHeadline(result.data.data.headline);
                setfeatureHeadline1(result.data.data.featureheadline1);
                setfeatureHDesc1(result.data.data.featuredesc1);
                setfeatureHeadline2(result.data.data.featureheadline2);
                setfeatureHDesc2(result.data.data.featuredesc2);
                setfeatureHeadline3(result.data.data.featureheadline3);
                setfeatureHDesc3(result.data.data.featuredesc3);
                swal("success", "Saved", "success");
            }); 
    }

    const ImageDelete = (type,chatTopicId) => {
        if(type === 'featureimage1') {
           setFeatureImage1('');
           const formData = {
             "featureimage1": ''
           }
           axios.post(`${process.env.REACT_APP_BASE_URL}/admin/signupinfo/${chatTopicId}`, formData, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
            }).then(result => {
                swal("success", "Deleted", "success");
            });
        } else if(type === 'featureimage2') {
            setFeatureImage2('');
            const formData = {
              "featureimage2": ''
            }
            axios.post(`${process.env.REACT_APP_BASE_URL}/admin/signupinfo/${chatTopicId}`, formData, {
             headers: {
                 'Accept': 'application/json, text/plain, */*',
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ` + localStorage.getItem('accessToken')
             },
             }).then(result => {
                 swal("success", "Deleted", "success");
             });
        } else if(type === 'featureimage3') {
            setFeatureImage3('');
            const formData = {
              "featureimage3": ''
            }
            axios.post(`${process.env.REACT_APP_BASE_URL}/admin/signupinfo/${chatTopicId}`, formData, {
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

  return (
    <div className="relative md:ml-64 bg-default-skin">
        <Sidebar/>
        <AdminNavbar/>
        <div className="flex flex-wrap min600">
            <div className="w-full mb-12 xl:mb-0 px-4 padding-top80">
                <h1 className='text-2xl text-black font-bold mb-3'>Signup Information</h1>
                    <form id="submit" className='mt-4 shadow-md p-4 rounded bg-white'>
                        <div className='form-group'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Main headline</label>
                            <input type="text" name = "listname" value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Main Headline" className="bg-white mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className='addListField float-right'>
                            <button className="text-white bg-package-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center" type="button" onClick={() => addFormFields()}>Add list item</button>
                        </div>
                        {
                                formValues.map((data, index)=>{
                                const { listname } = data;
                                        return(
                                            <div className="slotForm" key={index} style={{clear: "both"}}>
                                                <div className="form-group">
                                                    <label className='control-label'>List title</label>
                                                    <input type="text" onChange={(evnt)=>handleChange(index, evnt)} value={listname} name="listname" className="bg-white mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="List name" />
                                                </div>
                                                
                                            
                                                <div className='form-group'>
                                                <label className='control-label'>&nbsp;</label>
                                            
                                                {(formValues.length!==1)? <button className="btn btn-danger remove saveBtn mt-1" type="button" style={{background: "#a61f5b", borderColor: "#a61f5b", color: "#fff", fontWeight: "500"}} onClick={removeFormFields}>Remove</button>:''}
                                            </div>
                                           </div>
                                        )
                                    })

                         }
                </form>
                <h2 className='text-2xl text-black font-bold mt-10 mb-3'>Features</h2>
                <form className='mt-4 shadow-md p-4 rounded bg-white'>
                    <div className='form-group'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Feature 1</label>
                        <input type="text"  value={featureheadline1} onChange={(e) => setfeatureHeadline1(e.target.value)} placeholder="Feature Headline" className="bg-white mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <input type="text" value={featuredesc1} onChange={(e) => setfeatureHDesc1(e.target.value)} placeholder="Feature Description" className="bg-white mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <input type="file" onChange={HandleImage1} className="bg-white mb-2 mt-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {
                               !selectedImage1 && featureImage1 && 
                               <>
                                  <img src={`${process.env.REACT_APP_BASE_URL}/${featureImage1}`} className="img-fluid" style={{maxWidth: "200px"}} />
                                  <button type="button" onClick={() => ImageDelete('featureimage1',signupinfoId)} className="btn btn-primary" style={{ marginTop: '2%' }}>Delete</button>
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
                    <div className='form-group'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Feature 2</label>
                        <input type="text"  value={featureheadline2} onChange={(e) => setfeatureHeadline2(e.target.value)} placeholder="Feature Headline" className="bg-white mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <input type="text" value={featuredesc2} onChange={(e) => setfeatureHDesc2(e.target.value)} placeholder="Feature Description" className="bg-white mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <input type="file" onChange={HandleImage2} className="bg-white mb-2 mt-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                           {
                               !selectedImage2 && featureImage2 && 
                               <>
                                  <img src={`${process.env.REACT_APP_BASE_URL}/${featureImage2}`} className="img-fluid" style={{maxWidth: "200px"}} />
                                  <button type="button" onClick={() => ImageDelete('featureimage2',signupinfoId)} className="btn btn-primary" style={{ marginTop: '2%' }}>Delete</button>
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
                    <div className='form-group'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Feature 3</label>
                        <input type="text"  value={featureheadline3} onChange={(e) => setfeatureHeadline3(e.target.value)} placeholder="Feature Headline" className="bg-white mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <input type="text" value={featuredesc3} onChange={(e) => setfeatureHDesc3(e.target.value)} placeholder="Feature Description" className="bg-white mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <input type="file" onChange={HandleImage3} className="bg-white mb-2 mt-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {
                               !selectedImage3 && featureImage3 && 
                               <>
                                  <img src={`${process.env.REACT_APP_BASE_URL}/${featureImage3}`} className="img-fluid" style={{maxWidth: "200px"}} />
                                  <button type="button" onClick={() => ImageDelete('featureimage3',signupinfoId)} className="btn btn-primary" style={{ marginTop: '2%' }}>Delete</button>
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
                
                <div className="text-center mt-3 mb-10">
                    <button type="button" onClick={() => SubmitSignupInfo(signupinfoId)} className="text-white bg-package-maroon font-medium rounded text-md max-w-xs sm:w-auto px-3 py-2 text-center">SAVE</button>
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}
