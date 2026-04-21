import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
    const { loading, user, isAdmin } = useAuth();

    if (loading) {
        return <div className="p-10 text-center text-[#7b6f5f]">Проверяю доступ...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return (
            <div className="p-10 max-w-xl mx-auto">
                <div className="z-shell p-8 text-center">
                    <h1 className="z-title text-3xl mb-2">Нет доступа</h1>
                    <p className="text-[#7b6f5f]">У вас нет прав администратора.</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
