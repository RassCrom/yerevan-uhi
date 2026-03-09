import { create } from 'zustand';
import { YEREVAN_CENTER } from '@utils/constants';

export const useMapStore = create((set) => ({
  viewState: {
    latitude: YEREVAN_CENTER[1],
    longitude: YEREVAN_CENTER[0],
    zoom: 12,
    pitch: 0,
    bearing: 0,
  },
  setViewState: (vs) => set({ viewState: vs }),

  activeLayers: ['temperature'],
  toggleLayer: (id) =>
    set((s) => ({
      activeLayers: s.activeLayers.includes(id)
        ? s.activeLayers.filter((l) => l !== id)
        : [...s.activeLayers, id],
    })),
  setLayers: (layers) => set({ activeLayers: layers }),

  hoveredFeature: null,
  setHoveredFeature: (f) => set({ hoveredFeature: f }),
}));
