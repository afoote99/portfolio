"use client";

import { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  projects,
  CAPABILITY_COLORS,
  type Capability,
} from "@/lib/projects";

const CAP_ORDER: Capability[] = [
  "Claude",
  "OpenAI",
  "Vision",
  "Voice",
  "Realtime",
  "Graph / Canvas",
];

type NData = {
  label: string;
  color: string;
  kind: "project" | "cap";
  slug?: string;
  dimmed: boolean;
  active: boolean;
};

function hiddenHandles() {
  return (
    <>
      <Handle type="target" position={Position.Top} style={{ opacity: 0, top: "50%", left: "50%" }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0, top: "50%", left: "50%" }} />
    </>
  );
}

function ProjectNode({ data }: NodeProps) {
  const d = data as unknown as NData;
  return (
    <div
      style={{
        opacity: d.dimmed ? 0.22 : 1,
        transition: "opacity .2s ease, transform .2s ease, box-shadow .2s ease",
        transform: d.active ? "scale(1.08)" : "scale(1)",
      }}
      className="cursor-pointer select-none"
    >
      {hiddenHandles()}
      <div
        className="flex items-center justify-center rounded-full text-center font-semibold"
        style={{
          width: 96,
          height: 96,
          fontSize: 13,
          color: "#fff",
          background: `radial-gradient(circle at 35% 30%, ${d.color}cc, ${d.color}22 70%, transparent)`,
          border: `2px solid ${d.color}`,
          boxShadow: d.active
            ? `0 0 28px ${d.color}aa, inset 0 0 18px ${d.color}55`
            : `0 0 14px ${d.color}55`,
          padding: 6,
          lineHeight: 1.15,
        }}
      >
        {d.label}
      </div>
    </div>
  );
}

function CapNode({ data }: NodeProps) {
  const d = data as unknown as NData;
  return (
    <div
      style={{
        opacity: d.dimmed ? 0.25 : 1,
        transition: "opacity .2s ease, transform .2s ease",
        transform: d.active ? "scale(1.1)" : "scale(1)",
      }}
      className="select-none"
    >
      {hiddenHandles()}
      <div
        className="flex items-center justify-center rounded-full font-medium uppercase tracking-wide"
        style={{
          minWidth: 70,
          height: 34,
          padding: "0 14px",
          fontSize: 11,
          color: d.color,
          background: "#12121c",
          border: `1px dashed ${d.color}99`,
          boxShadow: d.active ? `0 0 18px ${d.color}66` : "none",
        }}
      >
        {d.label}
      </div>
    </div>
  );
}

const nodeTypes = { project: ProjectNode, cap: CapNode };

export default function Constellation() {
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);

  // Static base layout (radial): caps inner ring, projects outer ring.
  const base = useMemo(() => {
    const RP = 300; // project radius
    const RC = 120; // capability radius
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    CAP_ORDER.forEach((cap, i) => {
      const a = (i / CAP_ORDER.length) * Math.PI * 2 - Math.PI / 2;
      nodes.push({
        id: `cap:${cap}`,
        type: "cap",
        position: { x: Math.cos(a) * RC - 35, y: Math.sin(a) * RC - 17 },
        data: { label: cap, color: CAPABILITY_COLORS[cap], kind: "cap" },
        draggable: false,
        selectable: false,
      });
    });

    projects.forEach((p, i) => {
      const a = (i / projects.length) * Math.PI * 2 - Math.PI / 2;
      nodes.push({
        id: p.slug,
        type: "project",
        position: { x: Math.cos(a) * RP - 48, y: Math.sin(a) * RP - 48 },
        data: { label: p.name, color: p.accent, kind: "project", slug: p.slug },
        draggable: false,
      });
      p.caps.forEach((cap) => {
        edges.push({
          id: `${p.slug}__${cap}`,
          source: p.slug,
          target: `cap:${cap}`,
          style: { stroke: CAPABILITY_COLORS[cap], strokeWidth: 1.3, opacity: 0.35 },
        });
      });
    });

    return { nodes, edges };
  }, []);

  // Which nodes/edges are "connected" to the hovered element
  const connected = useMemo(() => {
    if (!hovered) return null;
    const nodeSet = new Set<string>([hovered]);
    const edgeSet = new Set<string>();
    if (hovered.startsWith("cap:")) {
      const cap = hovered.slice(4) as Capability;
      projects.forEach((p) => {
        if (p.caps.includes(cap)) {
          nodeSet.add(p.slug);
          edgeSet.add(`${p.slug}__${cap}`);
        }
      });
    } else {
      const p = projects.find((x) => x.slug === hovered);
      p?.caps.forEach((cap) => {
        nodeSet.add(`cap:${cap}`);
        edgeSet.add(`${p.slug}__${cap}`);
      });
    }
    return { nodeSet, edgeSet };
  }, [hovered]);

  const nodes: Node[] = useMemo(
    () =>
      base.nodes.map((n) => {
        const active = hovered === n.id;
        const dimmed = !!connected && !connected.nodeSet.has(n.id);
        return { ...n, data: { ...n.data, dimmed, active } };
      }),
    [base.nodes, connected, hovered]
  );

  const edges: Edge[] = useMemo(
    () =>
      base.edges.map((e) => {
        if (!connected) return e;
        const on = connected.edgeSet.has(e.id);
        return {
          ...e,
          animated: on,
          style: {
            ...e.style,
            opacity: on ? 0.95 : 0.06,
            strokeWidth: on ? 2.2 : 1,
          },
        };
      }),
    [base.edges, connected]
  );

  const onEnter = useCallback((_: unknown, n: Node) => setHovered(n.id), []);
  const onLeave = useCallback(() => setHovered(null), []);
  const onClick = useCallback(
    (_: unknown, n: Node) => {
      const d = n.data as unknown as NData;
      if (d.kind === "project" && d.slug) router.push(`/projects/${d.slug}`);
    },
    [router]
  );

  return (
    <div className="h-[480px] w-full sm:h-[560px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeMouseEnter={onEnter}
        onNodeMouseLeave={onLeave}
        onNodeClick={onClick}
        fitView
        fitViewOptions={{ padding: 0.22 }}
        minZoom={0.3}
        maxZoom={1.4}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnScroll={false}
        panOnDrag={true}
        zoomOnPinch={true}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={26} size={1} color="#1e1e2e" />
      </ReactFlow>
    </div>
  );
}
