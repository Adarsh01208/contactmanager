import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ContactService } from '../services/ContactService';

const ContactList = () => {

    const [query, setquery] = useState({
        text: ''
    });

    const [state, setstate] = useState({
        loading: false,
        contacts: [],
        filteredContacts: [],
        error: ''
    });

    const fetchContacts = async () => {
        try {
            setstate({
                ...state,
                loading: true
            });
            let response = await ContactService.getAllContacts();
            // console.log(response.data);
            setstate(
                {
                    ...state,
                    loading: false,
                    contacts: response.data,
                    filteredContacts: response.data
                });
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchContacts();
    }, []);



    const clickDelete = async (id) => {
        try {
            setstate({
                ...state,
                loading: true
            });
            let response = await ContactService.deleteContact(id);
            if (response) {
                fetchContacts();
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const searchContacts = async (e) => {
        setquery({ ...query, text: e.target.value });
        let filtered = state.contacts.filter((contact) => {
            return contact.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setstate({ ...state, filteredContacts: filtered });
    }

    let { loading, contacts, error, filteredContacts } = state;

    return (
        <>
            {/* <pre>{JSON.stringify(contacts)}</pre> */}
            <section className='contact-search p-3'>
                <div className='container'>
                    <div className='grid'>
                        <div className="row">
                            <div className="col">
                                <p className='h3'> Contact Manager
                                    <Link to={'/addcontact'} className="btn btn-primary ms-2">
                                        <i className='fa fa-plus-circle me-2' />New

                                    </Link>
                                </p>
                                <p className=''>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla porro quia reiciendis nesciunt fuga voluptatem dolores, repudiandae dolorum. Corporis eius ipsa in error officiis nostrum eveniet eos obcaecati enim! Architecto?
                                </p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <form className='row' >
                                    <div className='col'>
                                        <div className="mb-2">
                                            <input type="text" name='text' value={query.text} onChange={searchContacts} className='form-control' placeholder='Search Contacts...' />

                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-2">
                                            <input type="submit" className='btn btn-outline-dark' value='Search' />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>

            </section>

            <section className='contact-list p-3'>
                <div className='container'>
                    <div className='row '>
                        {
                            filteredContacts.length > 0 &&
                            filteredContacts.map((contact) => {
                                return (
                                    <div className="col-md-6" key={contact.id}>
                                        <div className="card shadow-lg my-2 ">
                                            <div className="card-body">
                                                <div className="row d-flex align-items-center ">
                                                    <div className="col-md-4">
                                                        <img src={contact.photo} className='img-fluid ' height={150} width={150} alt="" />
                                                    </div>
                                                    <div className="col-md-7 ">
                                                        <ul className='list-group'>
                                                            <li className='list-group-item list-group-item-action'>Name : <span className='text-secondary'>{contact.name}</span>
                                                            </li>
                                                            <li className='list-group-item'>Mobile : <span className='text-secondary'>{contact.mobile}</span>
                                                            </li>
                                                            <li className='list-group-item'>Email : <span className='text-secondary'>{contact.email}</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className='col-md-1 justify-content-center p-1 '>
                                                        <Link to={`/viewcontact/${contact.id}`} className='btn btn-warning my-1'>
                                                            <i className='fa fa-eye' />
                                                        </Link>
                                                        <Link to={`/editcontact/${contact.id}`} className='btn btn-primary my-1'>
                                                            <i className='fa fa-pencil' />
                                                        </Link>
                                                        <button className='btn btn-danger my-1' onClick={() => clickDelete(contact.id)}>
                                                            <i className='fa fa-trash' />
                                                        </button>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactList