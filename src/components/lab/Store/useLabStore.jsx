import { create } from 'zustand'

export const useLabStore = create((set) => ({
  activeTools: {
    ohm: false,
    resistor: false,
  },
  openTool: (toolId) => set((state) => ({
    activeTools: {
      ...state.activeTools,
      [toolId]: true
    }
  })),
  closeTool: (toolId) => set((state) => ({
    activeTools: {
      ...state.activeTools,
      [toolId]: false
    }
  }))
}))