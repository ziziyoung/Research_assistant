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
    label: 'Foundation',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--primary))' },
  },
  { 
    id: 'e1-3', 
    source: '1', 
    target: '3',
    label: 'Application',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--primary))' },
  },
  { 
    id: 'e2-4', 
    source: '2', 
    target: '4',
    label: 'Enables',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--primary))' },
  },
  { 
    id: 'e3-4', 
    source: '3', 
    target: '4',
    label: 'Uses',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--primary))' },
  },
  { 
    id: 'e1-5', 
    source: '1', 
    target: '5',
    label: 'Needs optimization',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--destructive))', strokeDasharray: '5,5' },
  },
  { 
    id: 'e5-6', 
    source: '5', 
    target: '6',
    label: 'Evolution',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--primary))' },
  },
  { 
    id: 'e4-6', 
    source: '4', 
    target: '6',
    label: 'Advanced',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--primary))' },
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
    <div className="h-full flex flex-col p-6">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Network className="h-6 w-6 text-primary" />
              AI Knowledge Graph
            </h2>
            <p className="text-muted-foreground">
              Visualize article relationships and discover optimization opportunities
            </p>
          </div>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search articles in graph..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-4 gap-4 mb-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{nodes.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Connections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{edges.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Clusters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-destructive">Optimization Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">1</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2 mb-4">
          <Badge variant="secondary">Computer Vision</Badge>
          <Badge variant="secondary">Neural Networks</Badge>
          <Badge variant="secondary">Machine Learning</Badge>
          <Badge variant="secondary">NLP</Badge>
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" />
            Needs Optimization
          </Badge>
        </div>
      </div>

      <Card className="flex-1 min-h-0">
        <CardContent className="p-0 h-full">
          <div style={{ height: '600px' }}>
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
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-destructive" />
          Process Structure Test Results
        </h3>
        <p className="text-sm text-muted-foreground mb-2">
          Graph analysis indicates 1 optimization opportunity:
        </p>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>
            <span className="font-medium">Attention Mechanisms</span> - High citation count but weak connections. 
            Recommend linking to related transformer architectures.
          </li>
        </ul>
      </div>
    </div>
  );
};
