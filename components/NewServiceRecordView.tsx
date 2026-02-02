
import React, { useState, useRef } from 'react';

interface NewServiceRecordViewProps {
  selectedUnitId: string;
  onSave: () => void;
}

const NewServiceRecordView: React.FC<NewServiceRecordViewProps> = ({ selectedUnitId, onSave }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [technician, setTechnician] = useState('John Smith');
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<string[]>([
    'https://picsum.photos/seed/hv1/400/400',
    'https://picsum.photos/seed/hv2/400/400',
    'https://picsum.photos/seed/hv3/400/400',
    'https://picsum.photos/seed/hv4/400/400'
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddPhoto = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotos(prev => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="p-4 space-y-6 pb-32">
        <div className="flex flex-col">
          <label className="text-[#0d141c] dark:text-slate-300 text-sm font-bold uppercase tracking-wider pb-2">Service Date</label>
          <div className="relative group">
            <input 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-input flex w-full rounded-xl text-[#0d141c] dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 h-14 px-4 text-base font-normal leading-normal" 
              type="date" 
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <span className="material-symbols-outlined">calendar_today</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-[#0d141c] dark:text-slate-300 text-sm font-bold uppercase tracking-wider pb-2">Technician</label>
          <input 
            value={technician}
            onChange={(e) => setTechnician(e.target.value)}
            className="form-input flex w-full rounded-xl text-[#0d141c] dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 h-14 px-4 text-base font-normal leading-normal" 
            placeholder="Enter name..." 
            type="text" 
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[#0d141c] dark:text-slate-300 text-sm font-bold uppercase tracking-wider pb-2">Maintenance Notes</label>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="form-input flex w-full rounded-xl text-[#0d141c] dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 min-h-[160px] placeholder:text-gray-400 p-4 text-base font-normal leading-relaxed resize-none" 
            placeholder="Enter diagnostic results, parts replaced, or calibration details..."
          ></textarea>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between pb-2">
            <p className="text-[#0d141c] dark:text-slate-300 text-sm font-bold uppercase tracking-wider">Photo Attachments</p>
            <span className="text-xs text-gray-500 font-medium">{photos.length} photos</span>
          </div>
          <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 py-2">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={onFileChange}
            />
            <button 
              onClick={handleAddPhoto}
              className="shrink-0 size-24 border-2 border-dashed border-primary/40 rounded-xl flex flex-col items-center justify-center bg-primary/5 dark:bg-primary/10 active:bg-primary/20 transition-colors group"
            >
              <span className="material-symbols-outlined text-primary text-3xl mb-1 group-active:scale-90 transition-transform">add_a_photo</span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">Add Photo</span>
            </button>
            
            {photos.map((src, idx) => (
              <div key={idx} className="shrink-0 relative size-24 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <img alt={`Attachment ${idx + 1}`} className="w-full h-full object-cover" src={src}/>
                <button 
                  onClick={() => removePhoto(idx)}
                  className="absolute top-1 right-1 size-6 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 max-w-md w-full p-4 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 z-50">
        <button 
          onClick={onSave}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] ios-shadow"
        >
          <span className="material-symbols-outlined">save</span>
          Save Record
        </button>
      </footer>
    </div>
  );
};

export default NewServiceRecordView;
