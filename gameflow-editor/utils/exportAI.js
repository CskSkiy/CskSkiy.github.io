export function exportAI(nodes, edges) {
  let text = "";

  nodes.forEach((node) => {
    const next = edges
      .filter(
        (e) =>
          e.source === node.id
      )
      .map((e) => e.target);

    text += `
================================

ID:
${node.id}

TYPE:
${node.data.type}

TEXT:
${node.data.label}

STATUS:
${node.data.status}

NEXT:
${next.join(", ")}

`;
  });

  const blob = new Blob(
    [text],
    { type: "text/plain" }
  );

  const a =
    document.createElement("a");

  a.href =
    URL.createObjectURL(blob);

  a.download =
    "AI_GAME_FLOW.txt";

  a.click();
}
