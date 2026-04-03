//import FC from react
import { type FC } from "react";

//import Link from react router dom
import { Link, useLocation } from "react-router";

//import custom hook useLogout
import { useLogout } from "../hooks/auth/useLogout";

const SidebarMenu: FC = () => {

    //initialize useLogout
    const logout = useLogout();
    const location = useLocation();

    const menuItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        )},
        { path: '/admin/users', label: 'Users', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        )},
    ];

    return (
        <div className="glass rounded-2xl overflow-hidden animate-fade-in-up">
            {/* Header */}
            <div className="px-5 py-4 border-b border-border/50">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                    Main Menu
                </h3>
            </div>

            {/* Menu Items */}
            <div className="p-3 space-y-1">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                                isActive
                                    ? 'bg-primary/15 text-primary-light shadow-lg shadow-primary/10'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated/50'
                            }`}
                        >
                            <span className={`transition-transform duration-300 group-hover:scale-110 ${
                                isActive ? 'text-primary-light' : ''
                            }`}>
                                {item.icon}
                            </span>
                            {item.label}
                        </Link>
                    );
                })}

                {/* Divider */}
                <div className="my-2 border-t border-border/30"></div>

                {/* Logout */}
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-danger hover:bg-danger/10 transition-all duration-300 cursor-pointer group"
                >
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default SidebarMenu;
