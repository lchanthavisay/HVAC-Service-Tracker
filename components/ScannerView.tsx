
import React from 'react';

interface ScannerViewProps {
  onClose: () => void;
}

const ScannerView: React.FC<ScannerViewProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-900 overflow-hidden max-w-md mx-auto">
      {/* Camera Viewfinder Background */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="HVAC laboratory equipment" 
          className="h-full w-full object-cover opacity-60" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvZcIJZsnskzy6mTWr3tmOQv56FIfid6DrfxhtHSDknD9ttPbrYbymcY47NDK3pZrRpsy0ZZNoRffESynW6fMP5MRRvnmRhXudZnTVedcThdTdm06OlkiaTBpLMSsb1oEBC97wP_KHpxDsIerCjQWltznzx9LTA-j4ozxuMjsZINbIR4v7FLTJI71lQgcao14UIDsWnT0PlNB6ceBCkTCsy5Gp3qbPVJH4uMMDnQreoClf81aAjEXHfTIfnHrT4wtA7jMZUsbm-_2u"
        />
        
        {/* Scanning Reticle & Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-64 h-64 md:w-80 md:h-80 viewfinder-cutout rounded-xl flex items-center justify-center">
            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl"></div>
            
            {/* Scanning Line Animation */}
            <div className="w-full h-0.5 bg-primary/60 absolute top-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(13,127,242,0.8)] animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* UI Layer */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top Navigation */}
        <div className="flex items-center p-4 pt-12 md:pt-6 justify-between bg-transparent">
          <button 
            onClick={onClose}
            className="flex size-12 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md active:bg-black/50 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Scan QR Code</h2>
          <button className="flex size-12 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md active:bg-black/50 transition-colors">
            <span className="material-symbols-outlined">flashlight_on</span>
          </button>
        </div>

        {/* Instructional Body Text */}
        <div className="mt-auto flex flex-col items-center gap-4 px-6 pb-8">
          <div className="bg-black/40 backdrop-blur-lg rounded-xl px-6 py-4 text-center">
            <p className="text-white text-base font-medium leading-normal">
              Point the camera at the equipment QR code
            </p>
            <p className="text-white/60 text-xs mt-1">
              Align the code within the frame to scan automatically
            </p>
          </div>
          {/* Manual Entry Option */}
          <button className="text-primary font-bold text-sm bg-primary/10 px-4 py-2 rounded-full backdrop-blur-sm active:bg-primary/20 transition-colors">
            Enter Serial Manually
          </button>
        </div>

        {/* Footer Controls */}
        <div className="p-6 pb-12 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-center gap-8 mb-8">
            <button className="flex shrink-0 items-center justify-center rounded-full size-12 bg-white/10 text-white backdrop-blur-md border border-white/20">
              <span className="material-symbols-outlined">image</span>
            </button>
            <button className="flex shrink-0 items-center justify-center rounded-full size-20 bg-white p-1 shadow-lg group active:scale-95 transition-transform">
              <div className="w-full h-full rounded-full border-4 border-black/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-black text-4xl">qr_code_scanner</span>
              </div>
            </button>
            <button className="flex shrink-0 items-center justify-center rounded-full size-12 bg-white/10 text-white backdrop-blur-md border border-white/20">
              <span className="material-symbols-outlined">sync</span>
            </button>
          </div>
          <div className="flex px-4">
            <button 
              onClick={onClose}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 flex-1 bg-white/10 hover:bg-white/20 text-white text-base font-bold leading-normal tracking-[0.015em] border border-white/10 backdrop-blur-md transition-all active:scale-[0.98]"
            >
              <span className="truncate">Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerView;
