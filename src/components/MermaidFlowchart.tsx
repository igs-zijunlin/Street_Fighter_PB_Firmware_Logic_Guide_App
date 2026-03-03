import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Loader2, AlertCircle } from 'lucide-react';

interface MermaidFlowchartProps {
    chart: string;
}

export const MermaidFlowchart: React.FC<MermaidFlowchartProps> = ({ chart }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            theme: 'base',
            themeVariables: {
                primaryColor: '#ffffff',
                primaryTextColor: '#1e293b',
                primaryBorderColor: '#94a3b8',
                lineColor: '#64748b',
                secondaryColor: '#f8fafc',
                tertiaryColor: '#f1f5f9',
            },
        });

        const renderChart = async () => {
            setLoading(true);
            setError(null);
            try {
                const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
                const { svg: svgContent } = await mermaid.render(id, chart);
                setSvg(svgContent);
            } catch (err) {
                console.error('Mermaid rendering failed', err);
                setError(err instanceof Error ? err.message : 'Unknown error rendering chart');
            } finally {
                setLoading(false);
            }
        };

        if (chart) {
            renderChart();
        }
    }, [chart]);

    if (error) {
        return (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 font-mono text-sm max-w-full overflow-hidden">
                <div className="flex items-center gap-2 mb-2 font-semibold">
                    <AlertCircle className="w-4 h-4" />
                    <span>圖表渲染失敗</span>
                </div>
                <pre className="whitespace-pre-wrap word-break-all bg-white/50 p-2 rounded border border-rose-100 mt-2">
                    {error}
                </pre>
            </div>
        );
    }

    return (
        <div className="relative min-h-[200px] w-full flex items-center justify-center">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10 rounded-xl">
                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                </div>
            )}
            <div
                ref={containerRef}
                className="mermaid-container w-full max-w-full shrink-0 flex justify-center py-4 [&>svg]:max-w-full"
                dangerouslySetInnerHTML={{ __html: svg }}
            />
        </div>
    );
};
