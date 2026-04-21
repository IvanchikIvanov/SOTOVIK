import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="min-h-[calc(100vh-56px)] px-4 py-20 flex items-center justify-center">
            <div className="max-w-md w-full rounded-[10px] border border-[#ddd3c4] bg-[#fffdf9] p-8 text-center">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#8d806e] mb-3">404</p>
                <h1
                    className="text-4xl text-[#1f1b16] mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                >
                    Страница не найдена
                </h1>
                <p className="text-sm text-[#6b5f4f] mb-6">
                    Проверьте адрес или вернитесь в каталог.
                </p>
                <Link
                    to="/catalog/smartphones"
                    className="inline-flex items-center justify-center rounded-[4px] border border-[#cfc2af] px-5 py-2 text-[11px] uppercase tracking-[0.12em] text-[#3b342c] hover:bg-[#f6f1e9] transition-colors"
                >
                    Перейти в каталог
                </Link>
            </div>
        </div>
    );
}
