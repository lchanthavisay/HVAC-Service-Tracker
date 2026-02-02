
import React, { useState } from 'react';
import { ViewType } from './types';
import ManualsView from './components/ManualsView';
import NewServiceRecordView from './components/NewServiceRecordView';
import HistoryView from './components/HistoryView';
import ScannerView from './components/ScannerView';
import { TABS, HVAC_UNITS } from './constants';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQrqJa-6fvt3KwTI5hx9elxr0qCJgTBE4",
  authDomain: "hvac-service-tracker.firebaseapp.com",
  projectId: "hvac-service-tracker",
  storageBucket: "hvac-service-tracker.firebasestorage.app",
  messagingSenderId: "489586619585",
  appId: "1:489586619585:web:6c102dfb20e4e8f5591040"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.MANUALS);
  const [selectedUnitId, setSelectedUnitId] = useState(HVAC_UNITS[0].id);

  const handleSaveRecord = async (unitId: string, notes: string, photoData: string) => {
  try {
    let imageUrl = "";

    // 1. If there is a photo, upload it to Firebase Storage
    if (photoData) {
      const photoRef = ref(storage, `hvac_records/${Date.now()}.jpg`);
      // Convert the string photo into a blob format Firebase understands
      const snapshot = await uploadBytes(photoRef, await (await fetch(photoData)).blob());
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    // 2. Save everything to the Firestore Database
    await addDoc(collection(db, "service_calls"), {
      unitId: unitId,
      technicianNotes: notes,
      photoUrl: imageUrl,
      timestamp: new Date()
    });

    alert("Service Record Saved Successfully!");
  } catch (e) {
    console.error("Firebase Error:", e);
    alert("Save failed. Check your Firebase console.");
  }
};
  
  const renderView = () => {
    switch (currentView) {
      case ViewType.MANUALS:
        return <ManualsView selectedUnitId={selectedUnitId} onAddClick={() => setCurrentView(ViewType.NEW_ENTRY)} />;
      case ViewType.NEW_ENTRY:
        return <NewServiceRecordView selectedUnitId={selectedUnitId} onSave={() => setCurrentView(ViewType.HISTORY)} />;
      case ViewType.HISTORY:
        return <HistoryView selectedUnitId={selectedUnitId} />;
      case ViewType.SCAN:
        return <ScannerView onClose={() => setCurrentView(ViewType.MANUALS)} />;
      default:
        return <ManualsView selectedUnitId={selectedUnitId} onAddClick={() => setCurrentView(ViewType.NEW_ENTRY)} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white dark:bg-background-dark border-x border-gray-200 dark:border-gray-800 relative flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark/95 backdrop-blur-sm border-b border-[#cedbe8] dark:border-slate-800 shrink-0">
        <div className="flex items-center p-4 justify-between">
          <button 
            onClick={() => setCurrentView(ViewType.MANUALS)}
            className="text-[#0d141c] dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <h2 className="text-[#0d141c] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
            {currentView === ViewType.NEW_ENTRY ? 'New Service Record' : currentView === ViewType.SCAN ? 'Scan QR Code' : 'Manuals & History'}
          </h2>
          <div className="flex items-center justify-end gap-1">
            <button 
              onClick={() => setCurrentView(ViewType.SCAN)}
              className="flex cursor-pointer items-center justify-center rounded-lg h-10 w-10 bg-transparent text-primary hover:bg-primary/10 transition-colors"
            >
              <span className="material-symbols-outlined">qr_code_scanner</span>
            </button>
            <button className="flex cursor-pointer items-center justify-center rounded-lg h-10 w-10 bg-transparent text-[#0d141c] dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
        </div>
      </header>

      {/* Equipment Selector */}
      <div className="px-4 py-4 shrink-0 bg-background-light dark:bg-background-dark">
        <label className="flex flex-col w-full">
          <p className="text-[#49739c] dark:text-slate-400 text-xs font-semibold uppercase tracking-wider pb-1 px-1">Selected Equipment</p>
          <div className="relative">
            <select 
              value={selectedUnitId}
              onChange={(e) => setSelectedUnitId(e.target.value)}
              className="appearance-none block w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d141c] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-[#cedbe8] dark:border-slate-700 bg-white dark:bg-slate-900 h-14 px-4 pr-10 text-base font-medium leading-normal shadow-sm transition-all"
            >
              {HVAC_UNITS.map(unit => (
                <option key={unit.id} value={unit.id}>{unit.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#49739c]">
              <span className="material-symbols-outlined">unfold_more</span>
            </div>
          </div>
        </label>
      </div>

      {/* Navigation Tabs */}
      <nav className="bg-background-light dark:bg-background-dark sticky top-[152px] z-40 shrink-0">
        <div className="flex border-b border-[#cedbe8] dark:border-slate-800 px-4">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setCurrentView(tab.id)}
              className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 flex-1 transition-all ${
                currentView === tab.id 
                  ? 'border-b-primary text-primary' 
                  : 'border-b-transparent text-[#49739c] dark:text-slate-500 hover:text-primary'
              }`}
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">{tab.label}</p>
            </button>
          ))}
        </div>
      </nav>

      {/* Dynamic View Content */}
      <main className="flex-1 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
