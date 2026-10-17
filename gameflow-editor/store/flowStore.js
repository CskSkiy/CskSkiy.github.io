import { create } from "zustand";

export const useFlowStore = create((set) => ({
  nodes: [],
  edges: [],
  selectedNode: null,

  setNodes: (nodes) => set({ nodes }),

  setEdges: (edges) => set({ edges }),

  selectNode: (node) =>
    set({
      selectedNode: node,
    }),

  updateNode: (id, data) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === id
          ? {
              ...n,
              data: {
                ...n.data,
                ...data,
              },
            }
          : n
      ),
    })),
}));
