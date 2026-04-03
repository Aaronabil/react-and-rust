// import FC from react
import { type FC, useState, type FormEvent } from 'react';

//import hook useNavigate from react router
import { useNavigate } from "react-router";

//import custom  hook useRegister from hooks
import { useRegister } from "../../../hooks/auth/useRegister";

//import useToast
import { useToast } from '../../../hooks/useToast';

//interface for validation errors
interface ValidationErrors {
    [key: string]: string[];
}

const Register: FC = () => {

    //initialize navigate
    const navigate = useNavigate();

    //initialize useRegister
    const { mutate, isPending } = useRegister();

    //initialize toast
    const { addToast } = useToast();

    //define state
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    //define state for errors
    const [errors, setErrors] = useState<ValidationErrors>({});

    // Handle submit form
    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();

        // Call the register mutation
        mutate({
            name,
            email,
            password
        }, {
            onSuccess: () => {

                //show toast
                addToast('Account created successfully! Please login.', 'success');

                // Redirect to login page
                navigate('/login');
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

                addToast('Something went wrong. Please try again.', 'error');
            }

        })

    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
            <div className="w-full max-w-md animate-fade-in-up">
                {/* Background Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary rounded-3xl blur-xl opacity-10 pointer-events-none"></div>

                <div className="relative glass rounded-2xl overflow-hidden">
                    {/* Header gradient */}
                    <div className="h-1 bg-gradient-to-r from-accent via-primary to-primary-light"></div>

                    <div className="p-8">
                        {/* Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/20 flex items-center justify-center">
                                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-center text-text-primary mb-1">Create Account</h2>
                        <p className="text-sm text-text-muted text-center mb-8">Join us and start learning</p>

                        <form onSubmit={handleRegister} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 bg-surface-elevated/50 border border-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                                    placeholder="John Doe"
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
                                    className="w-full px-4 py-3 bg-surface-elevated/50 border border-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                                    placeholder="name@example.com"
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
                                    className="w-full px-4 py-3 bg-surface-elevated/50 border border-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <div className="mt-2 px-4 py-2.5 bg-danger/10 border border-danger/20 rounded-xl text-danger text-sm">
                                        {errors.password[0]}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3.5 bg-gradient-to-r from-accent to-primary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/25 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 cursor-pointer"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating account...
                                    </span>
                                ) : 'REGISTER'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
