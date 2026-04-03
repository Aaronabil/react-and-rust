//import FC from react
import { type FC, useState, useEffect, type FormEvent } from "react";

//import SidebarMenu
import SidebarMenu from '../../../../components/SidebarMenu';

//import useNavigate, useParams and Link from react-router
import { useNavigate, useParams, Link } from 'react-router';

//import custom hook useUserByById
import { useUserById } from '../../../../hooks/auth/user/useUserById';

//import custom hook useUserUpdate
import { useUserUpdate } from '../../../../hooks/auth/user/useUserUpdate';

//interface for validation errors
interface ValidationErrors {
    [key: string]: string[];
}

const UserEdit: FC = () => {

    //initialize useNavigate
    const navigate = useNavigate();

    //initialize useParams
    const { id } = useParams();

    //define state user
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    //define state errors
    const [errors, setErrors] = useState<ValidationErrors>({});

    // inisialisasi useUSerById
    const { data: user } = useUserById(Number(id));

    //set data user to state
    useEffect(() => {

        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    // Inisialisasi useUserUpdate
    const { mutate, isPending } = useUserUpdate();

    // Handle submit form
    const updateUser = async (e: FormEvent) => {
        e.preventDefault();

        // Call the user update mutation
        mutate({
            id: Number(id),
            data: {
                name,
                email,
                password
            }
        }, {
            onSuccess: () => {

                // Redirect to users index
                navigate('/admin/users');

            },
            onError: (error: any) => {
                const response = error.response?.data;
                const status = error.response?.status;

                // reset error
                setErrors({});

                // VALIDATION ERROR (422)
                if (status === 422 && response?.data) {
                    setErrors(response.data);
                    return;
                }

                // EMAIL DUPLICATE (409)
                if (status === 409) {
                    setErrors({
                        email: [response.message],
                    });
                    return;
                }
            }
        })
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-3">
                    <SidebarMenu />
                </div>
                <div className="col-md-9">
                    <div className="card border-0 rounded-4 shadow-sm">
                        <div className="card-header">
                            EDIT USER
                        </div>
                        <div className="card-body">
                            <form onSubmit={updateUser}>

                                <div className="form-group mb-3">
                                    <label className="mb-1 fw-bold">Full Name</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Full Name" />
                                    {errors.name && <div className="alert alert-danger mt-2 rounded-4">{errors.namme[0]}</div>}
                                </div>

                                <div className="form-group mb-3">
                                    <label className="mb-1 fw-bold">Email address</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control"
                                        placeholder="Email Address" />
                                    {errors.email && <div className="alert alert-danger mt-2 rounded-4">{errors.email[0]}</div>}
                                </div>

                                <div className="form-group mb-3">
                                    <label className="mb-1 fw-bold">Password</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control"
                                        placeholder="Password" />
                                    {errors.password && <div className="alert alert-danger mt-2 rounded-4">{errors.password[0]}</div>}
                                </div>

                                <button type="submit" className="btn btn-md btn-primary rounded-4 shadow-sm border-0" disabled={isPending}>
                                    {isPending ? 'Updating...' : 'Update'}
                                </button>

                                <Link to="/admin/users" className="btn btn-md btn-secondary rounded-4 shadow-sm border-0 ms-2">Cancel</Link>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default UserEdit
