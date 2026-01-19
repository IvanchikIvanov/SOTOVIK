import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Cart() {
    return (
        <div className="pt-20 px-6 min-h-screen flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <span className="text-2xl">🛒</span>
            </div>
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <p className="text-white/60">Looks like you haven't added anything yet.</p>

            <Link
                to="/catalog"
                className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors"
            >
                Start Shopping
            </Link>
        </div>
    );
}
