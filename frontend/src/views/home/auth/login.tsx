// import FC from react
import { type FC, useState, useContext, type FormEvent } from 'react';

//import hook useNavigate from react router
import { useNavigate } from "react-router";

//import custom  hook useLogin from hooks
import { useLogin } from "../../../hooks/auth/useLogin";

//import js-cookie
import Cookies from 'js-cookie'

//import context
import { AuthContext } from '../../../context/AuthContext';

//import useToast
import { useToast } from '../../../hooks/useToast';

//interface for validation errors
interface ValidationErrors {
    [key: string]: string[];
}

export const Login: FC = () => {

    //initialize navigate
    const navigate = useNavigate();

    //initialize useLogin
    const { mutate, isPending } = useLogin();

    //destruct auth context "setIsAuthenticated"
    const { setIsAuthenticated } = useContext(AuthContext)!;

    //initialize toast
    const { addToast } = useToast();

    //define state
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    //define state for errors
    const [errors, setErrors] = useState<ValidationErrors>({});

    // Handle submit form
    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        // Call the login mutation
        mutate({
            email,
            password
        }, {
            onSuccess: (data: any) => {

                //set token to cookie
                Cookies.set('token', data.data.token);

                //set user to cookie
                Cookies.set('user', JSON.stringify({
                    id: data.data.user.id,
                    name: data.data.user.name,
                    email: data.data.user.email
                }));

                //set isAuthenticated to true
                setIsAuthenticated(true);

                //show toast
                addToast(`Welcome back, ${data.data.user.name}! 🎉`, 'success');

                // Redirect to dashboard page
                navigate('/admin/dashboard');
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

                // LOGIN FAILED (401)
                if (status === 401) {
                    setErrors({
                        email: [response.message],
                    });
                    addToast('Invalid email or password.', 'error');
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
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur-xl opacity-10 pointer-events-none"></div>

                <div className="relative glass rounded-2xl overflow-hidden">
                    {/* Header gradient */}
                    <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary-light"></div>

                    <div className="p-8">
                        {/* Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 flex items-center justify-center">
                                <svg className="w-8 h-8 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-center text-text-primary mb-1">Welcome Back</h2>
                        <p className="text-sm text-text-muted text-center mb-8">Sign in to your account</p>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-2">Email Address</label>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-surface-elevated/50 border border-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
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
                                    className="w-full px-4 py-3 bg-surface-elevated/50 border border-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
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
                                className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-hover text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 cursor-pointer"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : 'LOGIN'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
