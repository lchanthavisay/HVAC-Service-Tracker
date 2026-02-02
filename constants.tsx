
import { HVACUnit, Manual, ViewType } from './types';

export const HVAC_UNITS: HVACUnit[] = [
  { id: 'unit-702', name: 'Chiller Unit #702 - Lab A' },
  { id: 'unit-405', name: 'Air Handler #405 - Cleanroom' },
  { id: 'unit-112', name: 'Exhaust Fan #112 - Chemical Storage' },
  { id: 'unit-a-101', name: 'Unit A-101 Condenser' },
];

export const MANUALS: Manual[] = [
  { id: 'm1', title: 'Installation Guide.pdf', version: '2.4', size: '4.2 MB', type: 'pdf', category: 'Installation' },
  { id: 'm2', title: 'Electrical Schematic.dwg', version: 'Wiring Diagram', size: '1.8 MB', type: 'dwg', category: 'Schematics' },
  { id: 'm3', title: 'Maintenance Manual.pdf', version: '2023 Revision', size: '12.5 MB', type: 'pdf', category: 'Maintenance' },
  { id: 'm4', title: 'Parts List.xlsx', version: 'BOM Inventory', size: '0.4 MB', type: 'xlsx', category: 'Inventory' },
];

export const TABS = [
  { id: ViewType.MANUALS, label: 'Manuals' },
  { id: ViewType.HISTORY, label: 'History' },
  { id: ViewType.NEW_ENTRY, label: 'New Entry' },
];
