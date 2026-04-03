//import FC from react
import { type FC, useState } from "react";

//import SidebarMenu
import SidebarMenu from '../../../../components/SidebarMenu';

//import Link from react-route
import { Link } from "react-router";

//import custom hook useUsers and interface User
import { useUsers, type User } from "../../../../hooks/auth/user/useUsers";

//import custom hook useUserDelete
import { useUserDelete } from "../../../../hooks/auth/user/useUserDelete";

//import query client TanStack Query
import { useQueryClient } from '@tanstack/react-query';

//import useToast
import { useToast } from '../../../../hooks/useToast';

//import ConfirmModal
import ConfirmModal from '../../../../components/ConfirmModal';

const UsersIndex: FC = () => {

    // get users from useUsers
    const { data: users, isLoading, isError, error } = useUsers();

    //initialize useQueryClient
    const queryClient = useQueryClient();

    //initialize useUserDelete
    const { mutate, isPending } = useUserDelete();

    //initialize toast
    const { addToast } = useToast();

    //state for modal
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<{ id: number; name: string } | null>(null);

    //open delete modal
    const openDeleteModal = (id: number, name: string) => {
        setUserToDelete({ id, name });
        setDeleteModalOpen(true);
    };

    //handle delete user
    const handleDelete = () => {
        if (!userToDelete) return;

        //call useUserDelete
        mutate(userToDelete.id, {
            onSuccess: () => {
                //refetch data
                queryClient.invalidateQueries({ queryKey: ['users'] });
                addToast(`User "${userToDelete.name}" deleted successfully.`, 'success');
                setDeleteModalOpen(false);
                setUserToDelete(null);
            },
            onError: () => {
                addToast('Failed to delete user. Please try again.', 'error');
                setDeleteModalOpen(false);
                setUserToDelete(null);
            }
        });
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
                        <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <h2 className="text-sm font-semibold uppercase tracking-widest text-text-muted">Users</h2>
                            </div>
                            <Link
                                to="/admin/users/create"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-success to-success-hover text-white text-xs font-semibold rounded-xl hover:shadow-lg hover:shadow-success/25 hover:scale-105 transition-all duration-300"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                ADD USER
                            </Link>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            {/* Loading State */}
                            {isLoading && (
                                <div className="flex items-center justify-center gap-3 py-12">
                                    <svg className="animate-spin w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span className="text-text-secondary text-sm">Loading users...</span>
                                </div>
                            )}

                            {/* Error State */}
                            {isError && (
                                <div className="px-4 py-3 bg-danger/10 border border-danger/20 rounded-xl text-danger text-sm text-center">
                                    Error: {error.message}
                                </div>
                            )}

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-border/50">
                                            <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Full Name</th>
                                            <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Email Address</th>
                                            <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted w-48">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/30">
                                        {
                                            users?.map((user: User) => (
                                                <tr key={user.id} className="group hover:bg-surface-elevated/30 transition-colors duration-200">
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/10 flex items-center justify-center text-primary-light text-sm font-semibold">
                                                                {user.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <span className="text-sm font-medium text-text-primary">{user.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-text-secondary">{user.email}</td>
                                                    <td className="px-4 py-4 text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <Link
                                                                to={`/admin/users/edit/${user.id}`}
                                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary-light text-xs font-medium rounded-lg hover:bg-primary/20 transition-all duration-200"
                                                            >
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                                EDIT
                                                            </Link>
                                                            <button
                                                                onClick={() => openDeleteModal(user.id, user.name)}
                                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-danger/10 text-danger text-xs font-medium rounded-lg hover:bg-danger/20 transition-all duration-200 cursor-pointer"
                                                            >
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                                DELETE
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={deleteModalOpen}
                title="Delete User"
                message={`Are you sure you want to delete "${userToDelete?.name}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                type="danger"
                isLoading={isPending}
                onConfirm={handleDelete}
                onCancel={() => {
                    setDeleteModalOpen(false);
                    setUserToDelete(null);
                }}
            />
        </div>
    )
}

export default UsersIndex
