import { useAuth } from '../../context/AuthContext';

import { useNavigate } from 'react-router-dom';
import { LogOut, Package, User as UserIcon, Settings, Shield } from 'lucide-react';

export default function Profile() {
    const { user, signOut, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    if (!user) {
        return (
            <div className="min-h-screen pt-32 text-center text-[#7f7363]">
                Войдите, чтобы посмотреть личный кабинет.
            </div>
        );
    }

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">

            <div className="flex items-center justify-between">
                <h1 className="text-4xl z-title text-[#1f1b16]" style={{ fontWeight: 500 }}>Личный кабинет</h1>
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-2 border border-[#e0b7b3] bg-[#fbefee] text-[#aa4440] rounded-[6px] hover:bg-[#f7e7e6] transition-colors"
                >
                    <LogOut size={16} /> Выйти
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* User Info Card */}
                <div className="md:col-span-1 z-shell p-6">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-[#efe7da] rounded-full flex items-center justify-center text-[#7f7363] mb-4 overflow-hidden border border-[#dacfbf]">
                            {user.user_metadata.avatar_url ? (
                                <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <UserIcon size={40} />
                            )}
                        </div>
                        <h2 className="text-xl text-[#1f1b16] mb-1">{user.user_metadata.full_name || 'Клиент'}</h2>
                        <p className="text-sm text-[#7f7363] mb-6">{user.email}</p>

                        {isAdmin && (
                            <button
                                onClick={() => navigate('/admin')}
                                className="w-full mb-2 py-2 z-btn-primary flex items-center justify-center gap-2"
                            >
                                <Shield size={14} /> Админка
                            </button>
                        )}

                        <button className="w-full py-2 border border-[#d9cebe] rounded-[6px] text-sm text-[#6f6354] hover:text-[#1f1b16] hover:bg-[#f4eee5] transition-colors flex items-center justify-center gap-2">
                            <Settings size={14} /> Настройки
                        </button>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="md:col-span-2 space-y-6">

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="z-shell p-5">
                            <div className="text-[#8a7f70] text-xs uppercase mb-2">Активные заказы</div>
                            <div className="text-3xl text-[#1f1b16]">0</div>
                        </div>
                        <div className="z-shell p-5">
                            <div className="text-[#8a7f70] text-xs uppercase mb-2">Бонусные баллы</div>
                            <div className="text-3xl text-[#8b6a47]">150</div>
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="z-shell p-6">
                        <h3 className="text-lg text-[#1f1b16] mb-4 flex items-center gap-2">
                            <Package size={20} className="text-[#857968]" /> История заказов
                        </h3>

                        <div className="text-center py-10 text-[#7f7363] text-sm">
                            У вас пока нет заказов.
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
