//import FC from react
import { type FC, useState, type FormEvent } from "react";

//import SidebarMenu
import SidebarMenu from '../../../../components/SidebarMenu';

//import useNavigate and Link from react-router
import { useNavigate, Link } from 'react-router';

//import custom hook useUserCreate
import { useUserCreate } from '../../../../hooks/auth/user/useUserCreate';

//import useToast
import { useToast } from '../../../../hooks/useToast';

//interface for validation errors
interface ValidationErrors {
    [key: string]: string[];
}

const UserCreate: FC = () => {

    //initialize useNavigate
    const navigate = useNavigate();

    //initialize toast
    const { addToast } = useToast();

    //define state user
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    //define state errors
    const [errors, setErrors] = useState<ValidationErrors>({});

    // Inisialisasi useUserCreate
    const { mutate, isPending } = useUserCreate();

    // Handle submit form
    const storeUser = async (e: FormEvent) => {
        e.preventDefault();

        // Call the user create mutation
        mutate({
            name,
            email,
            password
        }, {
            onSuccess: () => {

                //show toast
                addToast(`User "${name}" created successfully! 🎉`, 'success');

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

                addToast('Failed to create user. Please try again.', 'error');
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            <h2 className="text-sm font-semibold uppercase tracking-widest text-text-muted">Add User</h2>
                        </div>

                        {/* Body */}
                        <div className="p-6 md:p-8">
                            <form onSubmit={storeUser} className="space-y-5 max-w-lg">
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
                                        placeholder="Password"
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
                                                Saving...
                                            </>
                                        ) : 'Save'}
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

export default UserCreate
