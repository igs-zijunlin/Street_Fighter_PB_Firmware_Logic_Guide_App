import { Ticket } from 'lucide-react';
import { MermaidFlowchart } from '../../components/MermaidFlowchart';

export default function TicketFlowchart() {
    // prettier-ignore
    const ticketMermaid = `
flowchart TD
    Start((開始)) --> STOP
    
    STOP["馬達停止"]
    RUNNING["馬達運轉出票"]
    
    STOP -->|有待出票數量| RUNNING
    
    subgraph PulseScan ["出票感應器 (Pulse Scan)"]
        direction LR
        P_HIGH["未偵測到票"]
        P_LOW["偵測到票遮斷"]
        ERR_EMPTY(("可能沒票了<br/>(ERR_EMPTY)"))
        ERR_JAM(("可能卡票<br/>(ERR_JAM)"))
        OUTPUT_ACK_Node(("扣除待出 1 張<br/>產生 1 個 ACK"))
        
        P_HIGH -->|票券經過| P_LOW
        P_LOW -->|離開| OUTPUT_ACK_Node
        OUTPUT_ACK_Node --> P_HIGH
        
        P_LOW -->|遮斷過長 Active_Timeout| ERR_EMPTY
        P_HIGH -->|未遮斷過長 Idle_Timeout| ERR_JAM
    end
    
    RUNNING -.->|掃描感應器| PulseScan
    RUNNING -->|待出票數量歸零 或 發生錯誤| STOP
    `;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 font-sans">
            <header className="mb-6 md:mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-pink-600 rounded-xl shadow-lg shadow-pink-200">
                        <Ticket size={28} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Ticket 狀態機流程圖
                    </h1>
                </div>
                <p className="text-slate-500 text-lg ml-1">
                    彩票機的感應器與馬達控制邏輯，處理出票與感應異常 (卡票/無票)。
                </p>
            </header>

            <section className="mb-10">
                <div className="flex items-center gap-2 mb-4 px-1">
                    <div className="w-1.5 h-6 bg-pink-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold">Ticket Dispenser Logic</h2>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-slate-100/50 border-b border-slate-100 p-4">
                        <p className="text-sm font-medium text-slate-600">
                            結合 Pulse Scan 來扣除待出數量，並附帶閒置與活動超時保護。
                        </p>
                    </div>
                    <div className="p-4 md:p-8 overflow-x-auto">
                        <div className="min-w-[650px] flex justify-center bg-white p-4 rounded-xl border border-slate-100">
                            <MermaidFlowchart chart={ticketMermaid} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
