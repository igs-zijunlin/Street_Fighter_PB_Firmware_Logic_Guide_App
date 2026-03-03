import { Navigation } from 'lucide-react';
import { MermaidFlowchart } from '../../components/MermaidFlowchart';

export default function MotorPoinFlowchart() {
    // prettier-ignore
    const motorPoinMermaid = `
flowchart TD
    Start((開始)) --> Normal_Move
    
    Normal_Move["一般移動<br/>檢查 Sensor 是否到達目標值"]
    End_Success(("成功抵達目標位置<br/>產生 ACK 並關閉控制"))
    
    Normal_Move -->|到達目標| End_Success
    Normal_Move -->|長時間未到達 RunTimeOut| Retry_Start
    
    subgraph Retry ["Retry State Machine (自救機制)"]
        direction TB
        Retry_Start("啟動 Retry 機制")
        R_FWD["正轉"]
        R_STOP1["停 1S"]
        R_REV["反轉"]
        R_STOP2["停 1S"]
        
        Retry_Start --> R_FWD
        R_FWD -->|Error Flag 觸發| R_STOP1
        R_STOP1 -->|1S 結束| R_REV
        R_REV -->|回退時間結束| R_STOP2
    end
    
    R_STOP2 -->|重試次數未滿| R_FWD
    R_STOP2 -->|重試超過限制| Fatal_Error(("Fatal Error<br/>致命錯誤"))
    `;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 font-sans">
            <header className="mb-6 md:mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-emerald-600 rounded-xl shadow-lg shadow-emerald-200">
                        <Navigation size={28} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Motor Poin 狀態機流程圖
                    </h1>
                </div>
                <p className="text-slate-500 text-lg ml-1">
                    控制特定點位抵達之馬達，確保移動到指定 Sensor 定位，未抵達時使用自救機制。
                </p>
            </header>

            <section className="mb-10">
                <div className="flex items-center gap-2 mb-4 px-1">
                    <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold">Motor Poin Flow</h2>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="p-4 md:p-8 overflow-x-auto overflow-y-hidden bg-white">
                        <div className="min-w-[600px] flex justify-center">
                            <MermaidFlowchart chart={motorPoinMermaid} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
