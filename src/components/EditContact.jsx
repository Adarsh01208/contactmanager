import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ContactService } from '../services/ContactService';

const EditContact = () => {

    let navigate = useNavigate();

    let { id } = useParams();

    const [state, setstate] = useState({
        loading: false,
        contacts: {
            name: '',
            photo: '',
            mobile: '',
            email: '',
            company: '',
            title: '',
            group: ''
        },
        error: '',
        groups: []

    })
    const fetchbyid = async () => {
        try {
            setstate({ ...state, loading: true });
            let response = await ContactService.getContactById(id);
            let groupResponse = await ContactService.getGroups(response.data);
            console.log(response.data);
            setstate({ ...state, loading: false, contacts: response.data, groups: groupResponse.data });
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchbyid();
    }, []);



    let updateInput = (e) => {
        setstate({
            ...state,
            contacts: {
                ...state.contacts,
                [e.target.name]: e.target.value
            }
        })
    }

    const submitUpdate = async (e) => {
        e.preventDefault();
        try {
            let response = await ContactService.updateContact(state.contacts, id);
            if (response) {
                navigate('/contactlist', { replace: true })
            }
        }
        catch (error) {
            setstate({ ...state, loading: false, error: error.message });
            navigate('/editcontact', { replace: false })
            console.log(error);
        }
    }

    let { loading, contacts, error, groups } = state;

    return (
        <>
            {/* <pre>{JSON.stringify(contacts)}</pre> */}
            <div className="container mt-4">
                <div className="row">
                    <div className="col">
                        <p className='text-success h1'>Edit Contact</p>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi delectus temporibus accusamus natus sed at commodi numquam odio sit, itaque distinctio corporis dignissimos deserunt, quas dolor, ipsa magnam? Eligendi, dolor?</p>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <form onSubmit={submitUpdate}>
                            <div className='mb-2'>
                                <input type="text" required={true} name='name' onChange={updateInput} value={contacts.name} className='form-control' placeholder='Name' />
                            </div>
                            <div className='mb-2'>
                                <input type="text" required={true} name='photo' onChange={updateInput} value={contacts.photo} className='form-control' placeholder='Photo Url' />
                            </div>
                            <div className='mb-2'>
                                <input type="number" required={true} name='mobile' onChange={updateInput} value={contacts.mobile} className='form-control' placeholder='Mobile No' />
                            </div>
                            <div className='mb-2'>
                                <input type="email" required={true} name='email' onChange={updateInput} value={contacts.email} className='form-control' placeholder='Email' />
                            </div>
                            <div className='mb-2'>
                                <input type="text" required={true} name='company' onChange={updateInput} value={contacts.company} className='form-control' placeholder='Company' />
                            </div>

                            <div className='mb-2'>
                                <input type="text" required={true} name='title' onChange={updateInput} value={contacts.title} className='form-control' placeholder='title' />
                            </div>
                            <div className='mb-2'>
                                <select className='form-control' required={true} name='group' onChange={updateInput} value={contacts.group} >
                                    <option value="">Select</option>
                                    {
                                        groups.length > 0 &&
                                        groups.map((group) => {
                                            return (
                                                <option key={group.id} value={group.id}  >{group.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <input type="submit" className='btn btn-success' value='Update' />
                                <Link to={'/contactlist'} className='btn btn-dark ms-2'>Cancel</Link>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6 ">
                        <img src={contacts.photo} className='contact-img' alt="" />
                    </div>

                </div>
            </div>
        </>
    )
}

export default EditContact;