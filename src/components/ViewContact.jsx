import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ContactService } from '../services/ContactService';

const ViewContact = () => {

    let { id } = useParams();

    const [state, setstate] = useState({
        loading: false,
        contacts: [],
        error: '',
        group: ''
    });

    const fetchbyid = async () => {
        try {
            setstate({ ...state, loading: true });
            let response = await ContactService.getContactById(id);
            let groupResponse = await ContactService.getGroup(response.data);
            console.log(response.data);
            setstate({ ...state, loading: false, contacts: response.data, group: groupResponse.data });
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchbyid();
    }, []);

    let { loading, contacts, error, group } = state;

    return (
        <>
            {/* <h1>{id}</h1> */}
            <section className='view-contact-intro'>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className='text-success h1'>View Contact</p>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi delectus temporibus accusamus natus sed at commodi numquam odio sit, itaque distinctio corporis dignissimos deserunt, quas dolor, ipsa magnam? Eligendi, dolor?</p>
                        </div>
                    </div>
                </div>
            </section>
            {
                Object.keys(contacts).length > 0 && Object.keys(group).length > 0 &&
                <section className='view-contact mt-5'>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <img src={contacts.photo} className='contact-img' alt="" />
                            </div>
                            <div className="col-md-7">
                                <ul className='list-group'>
                                    <li className='list-group-item list-group-item-action'>Name : <span className='text-secondary'>{contacts.name}</span>
                                    </li>
                                    <li className='list-group-item list-group-item-action'>Mobile No : <span className='text-secondary'>{contacts.mobile}</span>
                                    </li>
                                    <li className='list-group-item list-group-item-action'>Email : <span className='text-secondary'>
                                        {contacts.email}
                                    </span>
                                    </li>
                                    <li className='list-group-item list-group-item-action'>Company : <span className='text-secondary'>{contacts.company}</span>
                                    </li>
                                    <li className='list-group-item list-group-item-action'>Title : <span className='text-secondary'>{contacts.title}</span>
                                    </li>
                                    <li className='list-group-item list-group-item-action'>Group : <span className='text-secondary'>{group.name}</span>
                                    </li>
                                </ul>
                                <Link to={'/contactlist'} className='btn btn-warning mt-3 mx-2'>Back</Link>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default ViewContact