import { useCallback, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Network, AlertCircle } from 'lucide-react';

interface ArticleNode {
  id: string;
  title: string;
  category: string;
  citations: number;
  connections: number;
  optimizationScore: number;
}

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'default',
    data: { 
      label: (
        <div className="text-xs">
          <div className="font-semibold mb-1">Deep Learning for CV</div>
          <div className="text-muted-foreground">Citations: 1523</div>
          <Badge variant="secondary" className="mt-1 text-[10px]">Computer Vision</Badge>
        </div>
      ) 
    },
    position: { x: 250, y: 0 },
    style: { 
      background: 'hsl(var(--card))',
      border: '2px solid hsl(var(--primary))',
      borderRadius: '8px',
      padding: '12px',
      width: 180,
    },
  },
  {
    id: '2',
    data: { 
      label: (
        <div className="text-xs">
          <div className="font-semibold mb-1">CNN Architectures</div>
          <div className="text-muted-foreground">Citations: 2341</div>
          <Badge variant="secondary" className="mt-1 text-[10px]">Neural Networks</Badge>
        </div>
      ) 
    },
    position: { x: 100, y: 150 },
    style: { 
      background: 'hsl(var(--card))',
      border: '2px solid hsl(var(--primary))',
      borderRadius: '8px',
      padding: '12px',
      width: 180,
    },
  },
  {
    id: '3',
    data: { 
      label: (
        <div className="text-xs">
          <div className="font-semibold mb-1">Object Detection</div>
          <div className="text-muted-foreground">Citations: 1876</div>
          <Badge variant="secondary" className="mt-1 text-[10px]">Computer Vision</Badge>
        </div>
      ) 
    },
    position: { x: 400, y: 150 },
    style: { 
      background: 'hsl(var(--card))',
      border: '2px solid hsl(var(--primary))',
      borderRadius: '8px',
      padding: '12px',
      width: 180,
    },
  },
  {
    id: '4',
    data: { 
      label: (
        <div className="text-xs">
          <div className="font-semibold mb-1">Transfer Learning</div>
          <div className="text-muted-foreground">Citations: 3102</div>
          <Badge variant="secondary" className="mt-1 text-[10px]">Machine Learning</Badge>
        </div>
      ) 
    },
    position: { x: 250, y: 300 },
    style: { 
      background: 'hsl(var(--card))',
      border: '2px solid hsl(var(--primary))',
      borderRadius: '8px',
      padding: '12px',
      width: 180,
    },
  },
  {
    id: '5',
    data: { 
      label: (
        <div className="text-xs">
          <div className="font-semibold mb-1">Attention Mechanisms</div>
          <div className="text-muted-foreground">Citations: 4521</div>
          <Badge variant="destructive" className="mt-1 text-[10px]">
            <AlertCircle className="w-3 h-3 mr-1" />
            Optimize
          </Badge>
        </div>
      ) 
    },
    position: { x: 600, y: 150 },
    style: { 
      background: 'hsl(var(--card))',
      border: '2px solid hsl(var(--destructive))',
      borderRadius: '8px',
      padding: '12px',
      width: 180,
    },
  },
  {
    id: '6',
    data: { 
      label: (
        <div className="text-xs">
          <div className="font-semibold mb-1">Transformers</div>
          <div className="text-muted-foreground">Citations: 5634</div>
          <Badge variant="secondary" className="mt-1 text-[10px]">NLP</Badge>
        </div>
      ) 
    },
    position: { x: 450, y: 450 },
    style: { 
      background: 'hsl(var(--card))',
      border: '2px solid hsl(var(--primary))',
      borderRadius: '8px',
      padding: '12px',
      width: 180,
    },
  },
];

const initialEdges: Edge[] = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2',
    label: 'Introduces modular layers',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
    labelStyle: { fill: 'hsl(var(--foreground))', fontWeight: 500, fontSize: 11 },
    labelBgStyle: { fill: 'hsl(var(--background))', fillOpacity: 0.9 },
  },
  { 
    id: 'e1-3', 
    source: '1', 
    target: '3',
    label: 'Adds real-time detection',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
    labelStyle: { fill: 'hsl(var(--foreground))', fontWeight: 500, fontSize: 11 },
    labelBgStyle: { fill: 'hsl(var(--background))', fillOpacity: 0.9 },
  },
  { 
    id: 'e2-4', 
    source: '2', 
    target: '4',
    label: 'Reduces training data needs',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
    labelStyle: { fill: 'hsl(var(--foreground))', fontWeight: 500, fontSize: 11 },
    labelBgStyle: { fill: 'hsl(var(--background))', fillOpacity: 0.9 },
  },
  { 
    id: 'e3-4', 
    source: '3', 
    target: '4',
    label: 'Improves accuracy 23%',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
    labelStyle: { fill: 'hsl(var(--foreground))', fontWeight: 500, fontSize: 11 },
    labelBgStyle: { fill: 'hsl(var(--background))', fillOpacity: 0.9 },
  },
  { 
    id: 'e1-5', 
    source: '1', 
    target: '5',
    label: 'Missing attention context',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--destructive))', strokeDasharray: '5,5', strokeWidth: 2 },
    labelStyle: { fill: 'hsl(var(--destructive))', fontWeight: 500, fontSize: 11 },
    labelBgStyle: { fill: 'hsl(var(--background))', fillOpacity: 0.9 },
  },
  { 
    id: 'e5-6', 
    source: '5', 
    target: '6',
    label: 'Self-attention breakthrough',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
    labelStyle: { fill: 'hsl(var(--foreground))', fontWeight: 500, fontSize: 11 },
    labelBgStyle: { fill: 'hsl(var(--background))', fillOpacity: 0.9 },
  },
  { 
    id: 'e4-6', 
    source: '4', 
    target: '6',
    label: 'Scales to large datasets',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
    labelStyle: { fill: 'hsl(var(--foreground))', fontWeight: 500, fontSize: 11 },
    labelBgStyle: { fill: 'hsl(var(--background))', fillOpacity: 0.9 },
  },
];

export const AIKnowledgeGraph = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [searchQuery, setSearchQuery] = useState('');

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="h-full flex flex-col gap-3 p-4">
      {/* Compact Header with Stats */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Network className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Knowledge Graph</h2>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Articles:</span>
            <span className="font-semibold">{nodes.length}</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Connections:</span>
            <span className="font-semibold">{edges.length}</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Clusters:</span>
            <span className="font-semibold">3</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5 text-destructive" />
            <span className="font-semibold text-destructive">1</span>
          </div>
        </div>
      </div>

      {/* Compact Search and Filters */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-3.5 w-3.5" />
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-9 text-sm"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <Badge variant="secondary" className="text-xs">Computer Vision</Badge>
          <Badge variant="secondary" className="text-xs">Neural Networks</Badge>
          <Badge variant="secondary" className="text-xs">Machine Learning</Badge>
          <Badge variant="secondary" className="text-xs">NLP</Badge>
          <Badge variant="destructive" className="text-xs">
            <AlertCircle className="w-3 h-3 mr-1" />
            Optimize
          </Badge>
        </div>
      </div>

      {/* Maximized Graph */}
      <Card className="flex-1 min-h-0 border-2">
        <CardContent className="p-0 h-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            attributionPosition="bottom-left"
          >
            <Controls />
            <Background />
          </ReactFlow>
        </CardContent>
      </Card>

      {/* Compact Analysis Footer */}
      <div className="px-3 py-2 bg-muted/50 rounded-md border border-muted-foreground/20">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
          <div className="flex-1 text-sm">
            <span className="font-medium">Analysis:</span>
            <span className="text-muted-foreground ml-1.5">
              <span className="font-medium text-foreground">Attention Mechanisms</span> shows weak connections despite high citations. 
              Link to transformer architectures for optimization.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
