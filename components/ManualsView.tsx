
import React from 'react';
import { MANUALS } from '../constants';

interface ManualsViewProps {
  selectedUnitId: string;
  onAddClick: () => void;
}

const ManualsView: React.FC<ManualsViewProps> = ({ selectedUnitId, onAddClick }) => {
  return (
    <div className="flex flex-col gap-2 p-4 pb-24">
      <h3 className="text-[#49739c] dark:text-slate-400 text-xs font-semibold uppercase tracking-wider px-1 py-2">Documentation & Schematics</h3>
      
      {MANUALS.map((manual) => (
        <div 
          key={manual.id} 
          className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-[#cedbe8] dark:border-slate-800 shadow-sm transition-transform active:scale-[0.98]"
        >
          <div className="flex items-center gap-4">
            <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
              manual.type === 'pdf' ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' :
              manual.type === 'dwg' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
              'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
            }`}>
              <span className="material-symbols-outlined text-3xl">
                {manual.type === 'pdf' ? 'picture_as_pdf' : manual.type === 'dwg' ? 'account_tree' : 'description'}
              </span>
            </div>
            <div className="flex flex-col">
              <p className="text-[#0d141c] dark:text-white text-sm font-bold leading-tight">{manual.title}</p>
              <p className="text-[#49739c] dark:text-slate-400 text-xs mt-1">{manual.version} • {manual.size}</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-[#f0f2f5] dark:bg-slate-800 text-[#0d141c] dark:text-white rounded-lg text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            View
          </button>
        </div>
      ))}

      <div className="mt-4 px-2">
        <button className="flex items-center justify-center gap-2 w-full h-14 bg-white dark:bg-slate-900 text-primary border-2 border-dashed border-primary/30 rounded-xl font-bold hover:bg-primary/5 transition-colors">
          <span className="material-symbols-outlined">upload_file</span>
          Upload Manual
        </button>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={onAddClick}
        className="fixed bottom-6 right-6 flex items-center justify-center size-14 bg-primary text-white rounded-full shadow-lg shadow-primary/40 hover:scale-105 active:scale-95 transition-transform z-50"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </div>
  );
};

export default ManualsView;
