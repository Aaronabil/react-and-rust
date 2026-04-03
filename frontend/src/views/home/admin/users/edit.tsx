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

//import useToast
import { useToast } from '../../../../hooks/useToast';

//interface for validation errors
interface ValidationErrors {
    [key: string]: string[];
}

const UserEdit: FC = () => {

    //initialize useNavigate
    const navigate = useNavigate();

    //initialize useParams
    const { id } = useParams();

    //initialize toast
    const { addToast } = useToast();

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

                //show toast
                addToast(`User "${name}" updated successfully! ✅`, 'success');

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
                    addToast('Please check your input fields.', 'warning');
                    return;
                }

                // EMAIL DUPLICATE (409)
                if (status === 409) {
                    setErrors({
                        email: [response.message],
                    });
                    addToast('Email address is already taken.', 'error');
                    return;
                }

                addToast('Failed to update user. Please try again.', 'error');
            }
        })
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar */}
                <div className="lg:w-64 flex-shrink-0">
                    <SidebarMenu />
                </div>

                {/* Main Content */}
                <div className="flex-1 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="glass rounded-2xl overflow-hidden">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-border/50 flex items-center gap-3">
                            <svg className="w-5 h-5 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <h2 className="text-sm font-semibold uppercase tracking-widest text-text-muted">Edit User</h2>
                        </div>

                        {/* Body */}
                        <div className="p-6 md:p-8">
                            <form onSubmit={updateUser} className="space-y-5 max-w-lg">
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-3 bg-surface-elevated/50 border border-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                                        placeholder="Full Name"
                                    />
                                    {errors.name && (
                                        <div className="mt-2 px-4 py-2.5 bg-danger/10 border border-danger/20 rounded-xl text-danger text-sm">
                                            {errors.name[0]}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 bg-surface-elevated/50 border border-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                                        placeholder="Email Address"
                                    />
                                    {errors.email && (
                                        <div className="mt-2 px-4 py-2.5 bg-danger/10 border border-danger/20 rounded-xl text-danger text-sm">
                                            {errors.email[0]}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-2">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 bg-surface-elevated/50 border border-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                                        placeholder="Leave blank to keep current password"
                                    />
                                    {errors.password && (
                                        <div className="mt-2 px-4 py-2.5 bg-danger/10 border border-danger/20 rounded-xl text-danger text-sm">
                                            {errors.password[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 pt-2">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-hover text-white font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 cursor-pointer"
                                        disabled={isPending}
                                    >
                                        {isPending ? (
                                            <>
                                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Updating...
                                            </>
                                        ) : 'Update'}
                                    </button>
                                    <Link
                                        to="/admin/users"
                                        className="px-6 py-3 border border-border text-text-secondary text-sm font-medium rounded-xl hover:bg-surface-elevated/50 hover:text-text-primary transition-all duration-300"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserEdit
