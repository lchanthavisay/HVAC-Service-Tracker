
import React from 'react';

interface HistoryViewProps {
  selectedUnitId: string;
}

const HistoryView: React.FC<HistoryViewProps> = ({ selectedUnitId }) => {
  const mockHistory = [
    { id: 1, date: '2023-10-27', tech: 'John Smith', type: 'PM', desc: 'Routine filter replacement and coolant check.' },
    { id: 2, date: '2023-08-15', tech: 'Sarah Jones', type: 'Repair', desc: 'Replaced failed capacitor on blower motor.' },
    { id: 3, date: '2023-05-10', tech: 'Mike Wilson', type: 'Audit', desc: 'System efficiency audit - operating at 94%.' },
  ];

  return (
    <div className="p-4 space-y-4 pb-10">
      <h3 className="text-[#49739c] dark:text-slate-400 text-xs font-semibold uppercase tracking-wider px-1 py-2">Service Logs</h3>
      
      {mockHistory.map(log => (
        <div key={log.id} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm hover:border-primary transition-colors cursor-pointer group">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm font-bold text-[#0d141c] dark:text-white">{log.date}</p>
              <p className="text-xs text-[#49739c] dark:text-slate-400 font-medium">{log.tech}</p>
            </div>
            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
              log.type === 'Repair' ? 'bg-red-100 text-red-600' :
              log.type === 'Audit' ? 'bg-blue-100 text-blue-600' :
              'bg-emerald-100 text-emerald-600'
            }`}>
              {log.type}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
            {log.desc}
          </p>
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end">
             <span className="text-primary text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
               View Details <span className="material-symbols-outlined text-sm">arrow_forward</span>
             </span>
          </div>
        </div>
      ))}

      <div className="flex flex-col items-center justify-center py-10 text-gray-400">
        <span className="material-symbols-outlined text-4xl mb-2">history_edu</span>
        <p className="text-sm">No older records for this unit</p>
      </div>
    </div>
  );
};

export default HistoryView;
