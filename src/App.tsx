import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Menu,
  Terminal,
  Settings,
  LayoutDashboard,
  Activity,
  Cpu,
  Navigation,
  Banknote,
  Ticket
} from 'lucide-react';
import StreetFighter6NWDescription from './pages/StreetFighter6NWDescription';
import SpecialHPFlowchart from './pages/hardware/SpecialHPFlowchart';
import MotorSpinFlowchart from './pages/hardware/MotorSpinFlowchart';
import MotorPoinFlowchart from './pages/hardware/MotorPoinFlowchart';
import CoinSRFlowchart from './pages/hardware/CoinSRFlowchart';
import TicketFlowchart from './pages/hardware/TicketFlowchart';

const Sidebar = () => {
  const location = useLocation();

  const mainNavItems = [
    { path: '/', label: '專案概述', icon: <LayoutDashboard className="w-5 h-5" /> },
  ];

  const hardwareNavItems = [
    { path: '/flowcharts/special-hp', label: 'Special HP', icon: <Cpu className="w-5 h-5" /> },
    { path: '/flowcharts/motor-spin', label: 'Motor Spin', icon: <Activity className="w-5 h-5" /> },
    { path: '/flowcharts/motor-poin', label: 'Motor Poin', icon: <Navigation className="w-5 h-5" /> },
    { path: '/flowcharts/coin-sr', label: 'Coin SR', icon: <Banknote className="w-5 h-5" /> },
    { path: '/flowcharts/ticket', label: 'Ticket', icon: <Ticket className="w-5 h-5" /> },
  ];

  return (
    <div className="w-64 bg-[#0f172a] text-slate-300 flex flex-col h-full border-r border-slate-800 shadow-xl shrink-0">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3 text-white">
          <Terminal className="w-8 h-8 text-blue-500" />
          <span className="font-bold text-lg tracking-wider" style={{ fontFamily: 'var(--font-cyber, system-ui)' }}>
            SF6 NW
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-2 font-mono">IGS Firmware Logic Web</p>
      </div>

      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${location.pathname === item.path
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                : 'hover:bg-slate-800 hover:text-white'
                }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        <div>
          <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            硬體元件狀態圖
          </h3>
          <div className="space-y-1">
            {hardwareNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 ${location.pathname === item.path
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                  : 'hover:bg-slate-800 hover:text-white text-sm'
                  }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800 text-center text-xs text-slate-500">
        v1.0.0
      </div>
    </div>
  );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Header & Sidebar */}
      <div className="md:hidden">
        <div className="fixed top-0 left-0 right-0 h-16 bg-[#0f172a] flex items-center justify-between px-4 z-50">
          <div className="flex items-center gap-2 text-white">
            <Terminal className="w-6 h-6 text-blue-500" />
            <span className="font-bold tracking-wider" style={{ fontFamily: 'var(--font-cyber, system-ui)' }}>SF6 NW</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-slate-300 p-2"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <div
          className={`fixed top-16 left-0 bottom-0 w-64 z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Sidebar />
        </div>
      </div>

      <main className="flex-1 overflow-y-auto mt-16 md:mt-0 relative">
        <div className="max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<StreetFighter6NWDescription />} />
          <Route path="/flowcharts/special-hp" element={<SpecialHPFlowchart />} />
          <Route path="/flowcharts/motor-spin" element={<MotorSpinFlowchart />} />
          <Route path="/flowcharts/motor-poin" element={<MotorPoinFlowchart />} />
          <Route path="/flowcharts/coin-sr" element={<CoinSRFlowchart />} />
          <Route path="/flowcharts/ticket" element={<TicketFlowchart />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
