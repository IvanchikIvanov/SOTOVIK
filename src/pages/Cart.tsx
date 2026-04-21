import { Link } from 'react-router-dom';

export default function Cart() {
    return (
        <div className="pt-20 px-6 min-h-screen flex items-center justify-center">
            <div className="z-shell w-full max-w-xl p-10 text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#f1ebe2] flex items-center justify-center border border-[#dacfbf]">
                <span className="text-2xl">🛒</span>
                </div>
                <h2 className="text-4xl text-[#1f1b16] z-title" style={{ fontWeight: 500 }}>Корзина пока пуста</h2>
                <p className="text-[#756958]">Добавьте товары из каталога и вернитесь к оформлению заказа.</p>

                <Link
                    to="/catalog/smartphones"
                    className="z-btn-primary inline-flex items-center justify-center"
                >
                    Перейти в каталог
                </Link>
            </div>
        </div>
    );
}
