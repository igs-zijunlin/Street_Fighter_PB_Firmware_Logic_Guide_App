import { Activity } from 'lucide-react';
import { MermaidFlowchart } from '../../components/MermaidFlowchart';

export default function MotorSpinFlowchart() {
    // prettier-ignore
    const motorSpinMermaid = `
flowchart TD
    Start((開始)) --> IDLE
    IDLE["馬達閒置或歸零<br/>等待啟動與關閉命令"]
    RUN["馬達持續正轉中<br/>(等待 Sensor H/L 狀態改變)"]
    STOP_WAIT["停止 1 秒鐘<br/>(準備反轉解卡)"]
    BACK_RUN["馬達反轉中<br/>(依據脈衝或時間)"]
    STOP_RESET["停止 1 秒鐘<br/>(準備重新正轉)"]
    FATAL_ERROR(("致命錯誤<br/>(SENSOR_FAIL)"))
    
    IDLE -->|設定啟動| RUN
    
    RUN -->|Timer 發現卡死| STOP_WAIT
    RUN -->|順利觸發了 Sensor| IDLE

    STOP_WAIT -->|停止倒數結束| BACK_RUN
    BACK_RUN -->|達反轉條件| STOP_RESET
    
    STOP_RESET -->|重試次數未滿| RUN
    STOP_RESET -->|重試超過設定次數| FATAL_ERROR
    `;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 font-sans">
            <header className="mb-6 md:mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-violet-600 rounded-xl shadow-lg shadow-violet-200">
                        <Activity size={28} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Motor Spin 狀態機流程圖
                    </h1>
                </div>
                <p className="text-slate-500 text-lg ml-1">
                    控制單向連續旋轉馬達，包含遇到阻力時的自動退回與重試防護機制。
                </p>
            </header>

            <section className="mb-10">
                <div className="flex items-center gap-2 mb-4 px-1">
                    <div className="w-1.5 h-6 bg-violet-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold">Motor Spin Flow</h2>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-slate-100/50 border-b border-slate-100 p-4">
                        <p className="text-sm font-medium text-slate-600">
                            遇卡死將進行一秒鐘的退回並重試，預設允許重試三次。
                        </p>
                    </div>
                    <div className="p-4 md:p-8 overflow-x-auto">
                        <div className="min-w-[600px] flex justify-center bg-white p-4 rounded-xl border border-slate-100">
                            <MermaidFlowchart chart={motorSpinMermaid} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
