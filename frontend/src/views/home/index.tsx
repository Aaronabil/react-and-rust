// import FC from react
import { type FC } from 'react';

// import Link from react-router
import { Link } from 'react-router';

const Home: FC = () => {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
            <div className="relative w-full max-w-3xl animate-fade-in-up">
                {/* Background Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary-light rounded-3xl blur-xl opacity-20 animate-gradient"></div>

                {/* Card */}
                <div className="relative glass rounded-3xl p-10 md:p-14 text-center animate-pulse-glow">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-xs font-semibold uppercase tracking-widest mb-8">
                        <span className="w-2 h-2 bg-primary-light rounded-full animate-pulse"></span>
                        React + Rust
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                        <span className="bg-gradient-to-r from-text-primary via-primary-light to-accent bg-clip-text text-transparent">
                            FULLSTACK
                        </span>
                        <br />
                        <span className="text-text-primary">DEVELOPER</span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto mb-10 leading-relaxed">
                        Belajar FullStack Developer dengan <span className="text-accent font-semibold">Rust</span> dan <span className="text-primary-light font-semibold">React TypeScript</span>
                    </p>

                    {/* Divider */}
                    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-10"></div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/register"
                            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light transition-all duration-300"></div>
                            <span className="relative text-white flex items-center gap-2">
                                REGISTER
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        </Link>
                        <Link
                            to="/login"
                            className="group inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold rounded-xl border border-border hover:border-primary/50 text-text-secondary hover:text-text-primary bg-surface-elevated/30 hover:bg-surface-elevated/60 transition-all duration-300 hover:scale-105"
                        >
                            LOGIN
                            <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
