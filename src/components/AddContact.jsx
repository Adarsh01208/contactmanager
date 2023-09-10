import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactService } from '../services/ContactService'

const AddContact = () => {

    let navigate = useNavigate();

    const [state, setstate] = useState({
        loading: false,
        contact: {
            name: '',
            photo: '',
            mobile: '',
            email: '',
            company: '',
            title: '',
            group: ''
        },
        groups: [],
        error: ''
    })

    const selectGroup = async () => {
        try {
            setstate({ ...state, loading: true });
            let response = await ContactService.getGroups();
            setstate({ ...state, loading: false, groups: response.data });
        }
        catch (error) {
            console.log(error);
        }
    }

    const updateinput = (e) => {
        setstate({
            ...state,
            contact: {
                ...state.contact,
                [e.target.name]: e.target.value
            }
        })
    }

    useEffect(() => {
        selectGroup();
    }, [])

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            setstate({ ...state, loading: true });
            let response = await ContactService.createContact(state.contact);
            if (response) {
                navigate('/contactlist', { replace: true })
            }
        }
        catch (error) {
            setstate({ ...state, loading: false, error: error.message });
            navigate('/addcontact', { replace: false })
            console.log(error);
        }
    }

    let { loading, contact, groups, error } = state;

    return (
        <>
            {/* <pre>{JSON.stringify(state.contact)}</pre> */}
            <div className="container mt-5">
                <div className="row">
                    <div className="col">
                        <p className='text-success h1'>Add Contact</p>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi delectus temporibus accusamus natus sed at commodi numquam odio sit, itaque distinctio corporis dignissimos deserunt, quas dolor, ipsa magnam? Eligendi, dolor?</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <form onSubmit={submitForm}>
                            <div className='mb-2'>
                                <input type="text" className='form-control' placeholder='Name'
                                    name='name' required={true}
                                    onChange={updateinput} value={contact.name} />
                            </div>
                            <div className='mb-2'>
                                <input type="text" className='form-control' placeholder='Photo Url' required={true} name='photo' onChange={updateinput} value={contact.photo} />
                            </div>

                            <div className='mb-2'>
                                <input type="number" className='form-control' placeholder='Mobile No' required={true} name='mobile'onChange={updateinput} value={contact.mobile} />
                            </div>

                            <div className='mb-2'>
                                <input type="email" className='form-control' placeholder='Email' required={true}
                                    name='email'onChange={updateinput} value={contact.email} />
                            </div>

                            <div className='mb-2'>
                                <input type="text" className='form-control' placeholder='Company' required={true} name='company' onChange={updateinput} value={contact.company} />
                            </div>

                            <div className='mb-2'>
                                <input type="text" className='form-control' placeholder='title' required={true} 
                                name='title' onChange={updateinput} value={contact.title} />
                            </div>
                            <div className='mb-2'>
                                <select className='form-control' onChange={updateinput} required={true} name='group' value={contact.group}>
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
                                <input type="submit" className='btn btn-success' value='Create' />
                                <Link to={'/contactlist'} className='btn btn-dark ms-2'>Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddContact;