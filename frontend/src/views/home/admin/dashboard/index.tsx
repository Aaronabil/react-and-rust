//import FC from react
import { type FC } from "react";

//import SidebarMenu
import SidebarMenu from '../../../../components/SidebarMenu';

//import custom hook useAuthUser
import { useAuthUser } from '../../../../hooks/auth/useAuthUser';

const Dashboard: FC = () => {

    // get user from useAuthUser
    const user = useAuthUser();

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar */}
                <div className="lg:w-64 flex-shrink-0">
                    <SidebarMenu />
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    {/* Page Header */}
                    <div className="glass rounded-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-border/50 flex items-center gap-3">
                            <svg className="w-5 h-5 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <h2 className="text-sm font-semibold uppercase tracking-widest text-text-muted">Dashboard</h2>
                        </div>
                        <div className="p-6 md:p-8">
                            {user ? (
                                <div className="flex items-center gap-5">
                                    {/* Avatar */}
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-primary/20">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-text-primary">
                                            Selamat datang, <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">{user.name}</span>!
                                        </p>
                                        <p className="text-sm text-text-muted mt-0.5">You are now logged in to the admin panel.</p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-text-secondary">Kamu belum login.</p>
                            )}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { label: 'Status', value: 'Active', icon: '●', color: 'text-success' },
                            { label: 'Role', value: 'Admin', icon: '◆', color: 'text-primary-light' },
                            { label: 'Session', value: 'Online', icon: '◉', color: 'text-accent' },
                        ].map((stat) => (
                            <div key={stat.label} className="glass rounded-2xl p-5 hover:border-primary/30 transition-all duration-300 group">
                                <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">{stat.label}</p>
                                <p className="text-xl font-bold text-text-primary flex items-center gap-2">
                                    <span className={`text-sm ${stat.color}`}>{stat.icon}</span>
                                    {stat.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
