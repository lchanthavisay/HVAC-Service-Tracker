
export enum ViewType {
  MANUALS = 'MANUALS',
  HISTORY = 'HISTORY',
  NEW_ENTRY = 'NEW_ENTRY',
  SCAN = 'SCAN'
}

export interface HVACUnit {
  id: string;
  name: string;
}

export interface Manual {
  id: string;
  title: string;
  version: string;
  size: string;
  type: 'pdf' | 'dwg' | 'xlsx';
  category: string;
}

export interface ServiceRecord {
  id: string;
  unitId: string;
  date: string;
  technician: string;
  notes: string;
  photos: string[];
}
