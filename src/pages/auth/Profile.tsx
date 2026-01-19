import { useAuth } from '../../context/AuthContext';

import { useNavigate } from 'react-router-dom';
import { LogOut, Package, User as UserIcon, Settings } from 'lucide-react';

export default function Profile() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    if (!user) {
        return (
            <div className="min-h-screen pt-32 text-center text-zinc-400">
                Please log in to view your profile.
            </div>
        );
    }

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">

            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Личный кабинет</h1>
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                >
                    <LogOut size={16} /> Выйти
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* User Info Card */}
                <div className="md:col-span-1 bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 mb-4 overflow-hidden border-2 border-white/10">
                            {user.user_metadata.avatar_url ? (
                                <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <UserIcon size={40} />
                            )}
                        </div>
                        <h2 className="text-xl font-bold text-white mb-1">{user.user_metadata.full_name || 'User'}</h2>
                        <p className="text-sm text-zinc-500 mb-6">{user.email}</p>

                        <button className="w-full py-2 bg-white/5 border border-white/5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                            <Settings size={14} /> Настройки
                        </button>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="md:col-span-2 space-y-6">

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-5">
                            <div className="text-zinc-500 text-xs uppercase mb-2">Активные заказы</div>
                            <div className="text-3xl font-bold text-white">0</div>
                        </div>
                        <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-5">
                            <div className="text-zinc-500 text-xs uppercase mb-2">Бонусные баллы</div>
                            <div className="text-3xl font-bold text-purple-400">150</div>
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Package size={20} className="text-zinc-500" /> История заказов
                        </h3>

                        <div className="text-center py-10 text-zinc-500 text-sm">
                            У вас пока нет заказов.
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
