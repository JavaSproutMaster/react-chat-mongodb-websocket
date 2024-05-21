import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FooterAdmin from '../../Components/Admin/Footer/FooterAdmin'
import AdminNavbar from '../../Components/Admin/Navbar/AdminNavbar'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import axios from 'axios';
import swal from 'sweetalert';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default function ViewPages() {

    const params = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [status, setStatus] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/pages/${params.id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            setTitle(result.data.data.title);
            setContent(result.data.data.content);
            setStatus(result.data.data.type);
        });
    }, [params.id]);

    function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("files", file);
            fetch(`${process.env.REACT_APP_BASE_URL}/admin/pages/upload-image`, {
              method: "post",
              body: body
              // mode: "no-cors"
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({
                  default: `${process.env.REACT_APP_BASE_URL}/${res.data}`
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      }
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }



    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = {
            title: title,
            content: content,
            type: status
        }

        axios.put(`${process.env.REACT_APP_BASE_URL}/admin/pages/${params.id}`, formData, {
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(res => {
            if (res.data.success === true) {
                swal("Data is updated successfully", "success");
                navigate(`/admin/pages`);

            } else if (res.data.error) {
                swal(res.data.error.message, "error");

            }
        });

    }


    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <AdminNavbar />
            <div className="flex flex-wrap min600">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 gridstyle">
                    <h1 className='text-2xl text-black font-bold mb-3'>Edit Pages</h1>
                    <form className='mt-4 shadow-md p-4 rounded bg-white' onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
                                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                            </div>
                            <div className='col-sm-12'>
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Content</label>
                                    <CKEditor
                                        config={{
                                          extraPlugins: [uploadPlugin]
                                        }}
                                        editor={ ClassicEditor }
                                        data = {content}
                                        onChange={ ( event, editor ) => {
                                            const data = editor.getData();
                                            setContent(data);
                                        } }
                                        onReady={(editor) => {}}
                                        onBlur={(event, editor) => {}}
                                        onFocus={(event, editor) => {}}
                                    />
                                </div>
                            </div> 

                            <div className='col-sm-12'>
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Status</label>
                                    <select id="availability" value={status} onChange={(e) => setStatus(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value=''>Please select</option>
                                        <option value="confideas">Confideas</option>
                                        <option value="client_sources">Client Sources</option>
                                        <option value="advisor_sources">Advisor Sources</option>
                                    </select>
                                </div>
                            </div>                     
                            
                        </div>
                        <div className='flex'>
                            <button type="submit" className="text-white bg-package-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Submit</button>
                            <Link to='/admin/pages' className="text-white bg-dark font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center ml-2">Go Back</Link>
                        </div>
                    </form>
                </div>
            </div>
            <FooterAdmin />
        </div>
    )
}
