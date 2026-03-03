import { Cpu } from 'lucide-react';
import { MermaidFlowchart } from '../../components/MermaidFlowchart';

export default function SpecialHPFlowchart() {
    // prettier-ignore
    const specialHpMermaid = `
flowchart TD
    subgraph Routine ["IGS_SpecialHP_Routine (1ms)"]
        direction TB
        Watercheck{"檢查水位 Sensor<br/>(射幣/贈幣 高低水位)"}
        SorterCmd["連續 5 秒低水位<br/>送出對應通道切換指令"]
        Water_OK["維持當前通道"]
        
        Watercheck -->|低水位| SorterCmd
        Watercheck -->|正常| Water_OK
        
        subgraph MotorOp ["IGS_MACHINE_HP_MotorOperation"]
            direction TB
            FWD["正轉給幣 (Time 0~N)"]
            STOP1["停止等待 (Time N~M)"]
            REV["反轉解卡/退回 (Time M~X)"]
            STOP2["停止重置 (Time X~Y)"]
            
            FWD --> STOP1 --> REV --> STOP2 --> FWD
        end
    end

    subgraph Polling ["IGS_SpecialHP_Polling"]
        direction TB
        Start((開始))
        IDLE["閒置狀態 (IDLE)<br/>等待給幣命令或清除錯誤"]
        CHECK_CHANNEL{"通道是否需切換?"}
        SWITCHING["切換通道中<br/>(Wait 500ms)"]
        MOTOR_RUN["馬達運轉中<br/>(開始出幣)"]
        
        Start --> IDLE
        IDLE -->|有待出幣且無錯誤| CHECK_CHANNEL
        CHECK_CHANNEL -->|是| SWITCHING
        CHECK_CHANNEL -->|否通道吻合| MOTOR_RUN
        
        SWITCHING -->|通電 1S 後復歸檢查| CHECK_CHANNEL
        
        MOTOR_RUN -->|成功出幣或發生異常| IDLE
    end
    
    Routine -.->|更新水位的目標通道| Polling
    `;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 font-sans">
            <header className="mb-6 md:mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
                        <Cpu size={28} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Special HP 狀態機流程圖
                    </h1>
                </div>
                <p className="text-slate-500 text-lg ml-1">
                    展示 IGS 街機控制單元中「分離式 Hopper (分幣裝置)」的詳細控制邏輯與硬體防呆處理。
                </p>
            </header>

            <section className="mb-10">
                <div className="flex items-center gap-2 mb-4 px-1">
                    <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold">Special_HP Polling & Routine</h2>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-slate-100/50 border-b border-slate-100 p-4 flex justify-between items-center">
                        <p className="text-sm font-medium text-slate-600">
                            同時處理水位監測與馬達控制的雙軌運行邏輯
                        </p>
                    </div>
                    <div className="p-4 md:p-8 overflow-x-auto">
                        <div className="min-w-[800px] flex justify-center bg-white p-4 rounded-xl border border-slate-100">
                            <MermaidFlowchart chart={specialHpMermaid} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
