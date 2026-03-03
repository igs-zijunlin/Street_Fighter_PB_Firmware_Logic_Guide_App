import {
  Gamepad2,
  Cpu,
  Layers,
  Network,
  ShieldCheck,
  MonitorPlay,
  Activity
} from 'lucide-react';
import { MermaidFlowchart } from '../components/MermaidFlowchart';

export default function StreetFighter6NWDescription() {
  const architectureMermaid = `
    graph TD
      Master[主控板 Master] <-->|SPI 輪詢通訊| MCU[STM32F215ZE]
      OTBoard[OT Board I/O擴充板] <-->|UART 通訊| MCU
      
      subgraph 韌體核心模組
        MCU --> GPIO[GPIO 狀態控制]
        MCU --> Protocol[通訊協定解析]
        MCU --> Timer[SysTick 系統心跳]
      end

      subgraph 周邊硬體控制
        GPIO --> Coin[投幣器/計分]
        GPIO --> Ticket[出票機/出獎裝置]
        GPIO --> Motor[馬達控制 Spin/Poin]
        GPIO --> Marquee[跑馬燈/音效效果]
      end

      subgraph 安全與加密
        Crypto[ECC/AES/SHA-256] -.-> Protocol
      end
  `;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 font-sans">
      {/* 頁面標題 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent flex items-center gap-3">
          <Gamepad2 className="w-10 h-10 text-cyan-600" />
          <span style={{ fontFamily: 'var(--font-cyber, system-ui)' }}>
            Street Fighter 6 NW - IGS MCU
          </span>
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          專案架構與硬體控制說明頁面
        </p>
      </div>

      {/* 主內容網格 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 左側資訊區 (佔 2 欄) */}
        <div className="lg:col-span-2 space-y-6">

          {/* 專案概述 */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <MonitorPlay className="w-6 h-6 text-blue-600" />
              專案概述
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              本專案是針對 IGS (International Games System) 的 "Street Fighter 6 NW" 遊戲機台所開發的微控制器 (MCU) 韌體。
              MCU 的主要職責是控制機台的各種周邊硬體，並透過序列通訊協定與主控板進行互動，確保遊戲整體的聲光效果與互動體驗。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>投幣/計分管理</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>出票機與出獎裝置</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div>各種作動馬達控制</li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-cyan-500"></div>跑馬燈與音效控制</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-cyan-500"></div>感測器與狀態偵測</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-500"></div>安全加密與認證</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 系統流程與架構圖 */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <Activity className="w-6 h-6 text-blue-600" />
              硬體通訊與系統狀態機
            </h2>
            <div className="overflow-x-auto overflow-y-hidden bg-slate-50 p-4 rounded-xl border border-slate-100">
              <MermaidFlowchart chart={architectureMermaid} />
            </div>
          </section>

          {/* 軟體架構 */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <Layers className="w-6 h-6 text-blue-600" />
              軟體架構
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2">核心模組 (Core)</h3>
                <p className="text-sm text-slate-600 mb-2">
                  <span className="font-mono bg-white px-1.5 py-0.5 rounded text-slate-800 border border-slate-200 text-xs mr-2">main.c</span>
                  <span className="font-mono bg-white px-1.5 py-0.5 rounded text-slate-800 border border-slate-200 text-xs mr-2">igs_timer.c</span>
                  <span className="font-mono bg-white px-1.5 py-0.5 rounded text-slate-800 border border-slate-200 text-xs">igs_protocol.c</span>
                </p>
                <p className="text-sm text-slate-600">負責系統初始化、1ms SysTick 系統心跳、以及透過 SPI (主控板) 和 UART (OT Board) 進行的通訊協定。</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h3 className="font-semibold text-slate-800 mb-2">功能模組 (Features)</h3>
                <p className="text-sm text-slate-600 mb-2 flex flex-wrap gap-2">
                  <span className="font-mono bg-white px-1.5 py-0.5 rounded text-slate-800 border border-slate-200 text-xs">igs_coin_sr.c</span>
                  <span className="font-mono bg-white px-1.5 py-0.5 rounded text-slate-800 border border-slate-200 text-xs">igs_ticket.c</span>
                  <span className="font-mono bg-white px-1.5 py-0.5 rounded text-slate-800 border border-slate-200 text-xs">igs_motor_spin.c</span>
                  <span className="font-mono bg-white px-1.5 py-0.5 rounded text-slate-800 border border-slate-200 text-xs">igs_marquee.c</span>
                </p>
                <p className="text-sm text-slate-600">實作週邊具體控制邏輯，包括馬達運轉、出票、跑馬燈燈效等功能。</p>
              </div>
            </div>
          </section>

        </div>

        {/* 右側資訊區 (佔 1 欄) */}
        <div className="space-y-6">

          {/* 硬體平台 */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <Cpu className="w-6 h-6 text-emerald-600" />
              硬體平台
            </h2>
            <ul className="space-y-3">
              <li className="flex flex-col">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">MCU</span>
                <span className="font-mono text-slate-700">STMicroelectronics STM32F215ZE</span>
              </li>
              <li className="flex flex-col">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Core</span>
                <span className="text-slate-700">ARM Cortex-M3 (25MHz)</span>
              </li>
              <li className="flex flex-col">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Memory</span>
                <span className="text-slate-700">512KB Flash / 128KB RAM</span>
              </li>
              <li className="flex flex-col">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Environment</span>
                <span className="text-slate-700">Keil uVision 5 / ARM Compiler 5.06</span>
              </li>
            </ul>
          </section>

          {/* 通訊協定 */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <Network className="w-6 h-6 text-cyan-600" />
              通訊介面
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-cyan-500 pl-3">
                <h3 className="font-semibold text-slate-800">SPI (主控板)</h3>
                <p className="text-sm text-slate-600 mt-1">
                  主從架構的輪詢機制。主控板定時發送輪詢封包 (SOH + 輪詢編號 + 資料 + Checksum)。
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-3">
                <h3 className="font-semibold text-slate-800">UART (OT Board)</h3>
                <p className="text-sm text-slate-600 mt-1">
                  非同步通訊延伸介面。亦用於線上應用程式更新 (IAP) 來更新韌體。
                </p>
              </div>
            </div>
          </section>

          {/* 加密機制 */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <ShieldCheck className="w-6 h-6 text-amber-500" />
              加密機制
            </h2>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></div>
                <span><strong>ECC (P-256)</strong> 用於數位簽章驗證韌體完整性以及 ECDH 金鑰交換。</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></div>
                <span><strong>AES-256 CBC</strong> 使用協商金鑰對通訊資料加密/解密。</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></div>
                <span><strong>SHA-256</strong> 驗證資料傳輸與封包之完整性。</span>
              </li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
