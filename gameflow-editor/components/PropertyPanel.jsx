import { useFlowStore } from "../store/flowStore";

export default function PropertyPanel() {
  const selected =
    useFlowStore(
      (state) => state.selectedNode
    );

  const updateNode =
    useFlowStore(
      (state) => state.updateNode
    );

  if (!selected) {
    return (
      <div className="panel">
        請選擇節點
      </div>
    );
  }

  return (
    <div className="panel">
      <h3>屬性表</h3>

      <input
        value={selected.data.label}
        onChange={(e) =>
          updateNode(selected.id, {
            label: e.target.value,
          })
        }
      />

      <input
        type="color"
        value={selected.data.color}
        onChange={(e) =>
          updateNode(selected.id, {
            color: e.target.value,
          })
        }
      />

      <select
        value={selected.data.status}
        onChange={(e) =>
          updateNode(selected.id, {
            status: e.target.value,
          })
        }
      >
        <option value="todo">未完成</option>
        <option value="doing">進行中</option>
        <option value="done">完成</option>
        <option value="bug">Bug</option>
        <option value="blocked">阻塞</option>
      </select>

      <textarea
        value={selected.data.note}
        onChange={(e) =>
          updateNode(selected.id, {
            note: e.target.value,
          })
        }
      />
    </div>
  );
}
