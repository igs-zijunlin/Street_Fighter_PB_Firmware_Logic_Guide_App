import { Banknote } from 'lucide-react';
import { MermaidFlowchart } from '../../components/MermaidFlowchart';

export default function CoinSRFlowchart() {
    // prettier-ignore
    const coinMermaid = `
flowchart TD
    Start((開始)) --> HIGH_Inactive
    
    HIGH_Inactive["等待硬幣遮斷<br/>(Current == Inactive)"]
    DEBOUNCE_1["防彈跳 (DebounceTime++)"]
    LOW_Active["硬幣遮斷中<br/>(Current == Active)"]
    ERROR_JAM(("錯誤<br/>(作弊或卡幣)"))
    DEBOUNCE_2["防彈跳 (電位回歸)"]
    OUTPUT_ACK(("產生 1 個<br/>ACK 投幣訊號"))
    
    HIGH_Inactive -->|Sensor 電位改變| DEBOUNCE_1
    DEBOUNCE_1 -->|持續不變達 Debounce_Timeout| LOW_Active
    
    LOW_Active -->|遮斷時間大於 Active_Timeout| ERROR_JAM
    LOW_Active -->|Sensor 電位回到 High| DEBOUNCE_2
    
    DEBOUNCE_2 -->|持續 High 達 Timeout| OUTPUT_ACK
    OUTPUT_ACK --> HIGH_Inactive
    `;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 font-sans">
            <header className="mb-6 md:mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-amber-500 rounded-xl shadow-lg shadow-amber-200">
                        <Banknote size={28} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Coin SR 狀態機流程圖
                    </h1>
                </div>
                <p className="text-slate-500 text-lg ml-1">
                    投幣感應器的硬體邏輯，包含 Debounce 防彈跳與防作弊逾時偵測。
                </p>
            </header>

            <section className="mb-10">
                <div className="flex items-center gap-2 mb-4 px-1">
                    <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold">Coin Sensor Processing</h2>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="p-4 md:p-8 overflow-x-auto overflow-y-hidden bg-white">
                        <div className="min-w-[700px] flex justify-center">
                            <MermaidFlowchart chart={coinMermaid} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
