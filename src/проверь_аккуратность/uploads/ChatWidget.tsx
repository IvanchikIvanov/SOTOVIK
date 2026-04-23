import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Loader2 } from 'lucide-react';
import { getProductContext, formatPrice, searchProducts } from '../data/products';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const SYSTEM_PROMPT = `Ты — дружелюбный и профессиональный консультант интернет-магазина SOTOVIK. Помогай клиентам выбрать технику, отвечай на вопросы о характеристиках и ценах. Будь краток, но информативен. Отвечай на русском языке.

Вот каталог товаров в наличии:
${getProductContext()}

Правила:
1. Рекомендуй только товары из каталога выше.
2. Если товара нет в наличии — скажи об этом.
3. Если вопрос не про товары — вежливо перенаправь к теме магазина.
4. Будь дружелюбным и используй эмодзи умеренно.`;

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isWiggling, setIsWiggling] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Привет! Я ИИ-консультант SOTOVIK. Чем могу помочь?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Wiggle animation after 30 seconds (once)
    useEffect(() => {
        const wiggleTimeout = setTimeout(() => {
            if (!isOpen) {
                setIsWiggling(true);
                setTimeout(() => setIsWiggling(false), 1000);
            }
        }, 30000);

        return () => clearTimeout(wiggleTimeout);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

            if (!apiKey || apiKey === 'sk-your-openai-api-key-here') {
                // Demo mode without API key
                const found = searchProducts(userMessage);
                let response = '';

                if (found.length > 0) {
                    response = `Нашел для вас:\n\n${found.slice(0, 3).map(p =>
                        `📱 **${p.name}**\n💰 ${formatPrice(p.price)}\n${p.in_stock ? '✅ В наличии' : '❌ Нет в наличии'}\n`
                    ).join('\n')}`;
                } else {
                    response = 'К сожалению, ничего не нашел по вашему запросу. Попробуйте спросить про iPhone, Samsung, iPad, AirPods или PlayStation!';
                }

                setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            } else {
                // Real OpenAI API call
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: 'gpt-4o-mini',
                        messages: [
                            { role: 'system', content: SYSTEM_PROMPT },
                            ...messages.map(m => ({ role: m.role, content: m.content })),
                            { role: 'user', content: userMessage }
                        ],
                        max_tokens: 500,
                        temperature: 0.7
                    })
                });

                if (!response.ok) {
                    throw new Error('API Error');
                }

                const data = await response.json();
                const assistantMessage = data.choices[0]?.message?.content || 'Простите, возникла ошибка. Попробуйте позже.';

                setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Произошла ошибка при обработке запроса. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 overflow-hidden
                    bg-[#fffdf9] border-2
                    ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
                    ${isWiggling ? 'animate-wiggle' : ''}
                `}
                style={{
                    borderColor: '#52525b',
                    animation: isWiggling ? 'wiggle 0.5s ease-in-out 2' : 'none'
                }}
            >
                <img src="/logoLight.svg" alt="Chat" className="w-10 h-10 object-contain" />
            </button>

            {/* Chat Window */}
            <div className={`fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] md:w-[400px] transition-all duration-300 origin-bottom-right
        ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}
      `}>
                <div className="rounded-[10px] shadow-2xl overflow-hidden border border-[#d9cebe] flex flex-col h-[500px] bg-[#fffdf9]">
                    {/* Header */}
                    <div
                        className="px-4 py-3 flex items-center justify-between border-b"
                        style={{ backgroundColor: '#8b6a47', borderColor: '#7a5c3d' }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/25 flex items-center justify-center">
                                <Bot size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white text-sm">ИИ Консультант</h3>
                                <p className="text-xs text-[#f2e8db]">Онлайн • SOTOVIK</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f7f2ea]">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'assistant' && (
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-[#e9dece]">
                                        <Bot size={16} className="text-[#6f6354]" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap
                   ${msg.role === 'user'
                                            ? 'text-white rounded-br-md'
                                            : 'bg-[#fffdf9] text-[#3e352c] rounded-bl-md border border-[#dbcfbf]'
                                        }
                `}
                                    style={msg.role === 'user' ? { backgroundColor: '#8b6a47' } : {}}
                                >
                                    {msg.content}
                                </div>
                                {msg.role === 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-[#e9dece] flex items-center justify-center flex-shrink-0">
                                        <User size={16} className="text-[#6f6354]" />
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-2 justify-start">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#e9dece]">
                                    <Loader2 size={16} className="animate-spin text-[#6f6354]" />
                                </div>
                                <div className="bg-[#fffdf9] px-4 py-2 rounded-2xl rounded-bl-md border border-[#dbcfbf]">
                                    <span className="text-sm text-[#7a6d5d]">Думаю...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t bg-[#fffdf9] border-[#ddd1c2]">
                        <div className="flex gap-2">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Спросите о товаре..."
                                className="flex-1 px-4 py-2 rounded-[6px] text-sm outline-none transition-colors border border-[#dbcfbf] bg-[#f8f3eb] text-[#2f2821] placeholder:text-[#8f8373] focus:bg-white"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={isLoading || !input.trim()}
                                className="px-4 py-2 rounded-[6px] text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                style={{ backgroundColor: '#8b6a47' }}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
