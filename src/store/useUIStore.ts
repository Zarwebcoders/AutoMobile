import { create } from 'zustand';

export type TabType = 'categories' | 'account' | 'car-filter' | 'search' | 'shop-filter';

interface UIState {
  isMobileSideBarOpen: boolean;
  activeMobileTab: TabType;
  openMobileSideBar: (tab?: TabType) => void;
  closeMobileSideBar: () => void;
  setActiveMobileTab: (tab: TabType) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileSideBarOpen: false,
  activeMobileTab: 'categories',
  openMobileSideBar: (tab = 'categories') => set({ isMobileSideBarOpen: true, activeMobileTab: tab }),
  closeMobileSideBar: () => set({ isMobileSideBarOpen: false }),
  setActiveMobileTab: (tab) => set({ activeMobileTab: tab }),
}));
