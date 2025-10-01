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

interface GraphCategory {
  id: string;
  name: string;
  count: number;
  nodes: Node[];
  edges: Edge[];
  optimizations: number;
}

// Computer Vision Category
const cvNodes: Node[] = [
  {
    id: 'cv1',
    data: { 
      label: (
        <div className="text-xs">
          <div className="font-semibold mb-1">Deep Learning for CV</div>
          <div className="text-muted-foreground">Citations: 1523</div>
        </div>
      ) 
    },
    position: { x: 250, y: 50 },
    style: { 
      background: 'hsl(var(--card))',
      border: '2px solid hsl(var(--primary))',
      borderRadius: '8px',
      padding: '12px',
      width: 180,
    },
  },
  {
    id: 'cv2',
    data: { 
      label: (
        <div className="text-xs">
          <div className="font-semibold mb-1">CNN Architectures</div>
          <div className="text-muted-foreground">Citations: 2341</div>
        </div>
      ) 
    },
    position: { x: 100, y: 200 },
    style: { 
      background: 'hsl(var(--card))',
      border: '2px solid hsl(var(--primary))',
      borderRadius: '8px',
      padding: '12px',
      width: 180,
    },
  },
  {
    id: 'cv3',
    data: { 
      label: (
        <div className="text-xs">
          <div className="font-semibold mb-1">Object Detection</div>
          <div className="text-muted-foreground">Citations: 1876</div>
        </div>
      ) 
    },
    position: { x: 400, y: 200 },
    style: { 
      background: 'hsl(var(--card))',
      border: '2px solid hsl(var(--primary))',
      borderRadius: '8px',
      padding: '12px',
      width: 180,
    },
  },
  {
    id: 'cv4',
    data: { 
      label: (
        <div className="text-xs">
          <div className="font-semibold mb-1">Image Segmentation</div>
          <div className="text-muted-foreground">Citations: 1654</div>
        </div>
      ) 
    },
    position: { x: 250, y: 350 },
    style: { 
      background: 'hsl(var(--card))',
      border: '2px solid hsl(var(--primary))',
      borderRadius: '8px',
      padding: '12px',
      width: 180,
    },
  },
];

const cvEdges: Edge[] = [
  { 
    id: 'cv-e1', source: 'cv1', target: 'cv2',
    label: 'Foundation architecture',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
    labelStyle: { fill: 'hsl(var(--foreground))', fontWeight: 500, fontSize: 11 },
    labelBgStyle: { fill: 'hsl(var(--background))', fillOpacity: 0.9 },
  },
  { 
    id: 'cv-e2', source: 'cv1', target: 'cv3',
    label: 'Enables detection',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
    labelStyle: { fill: 'hsl(var(--foreground))', fontWeight: 500, fontSize: 11 },
    labelBgStyle: { fill: 'hsl(var(--background))', fillOpacity: 0.9 },
  },
  { 
    id: 'cv-e3', source: 'cv2', target: 'cv4',
    label: 'Pixel-level prediction',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
    labelStyle: { fill: 'hsl(var(--foreground))', fontWeight: 500, fontSize: 11 },
    labelBgStyle: { fill: 'hsl(var(--background))', fillOpacity: 0.9 },
  },
  { 
    id: 'cv-e4', source: 'cv3', target: 'cv4',
    label: 'Shared backbone',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
    labelStyle: { fill: 'hsl(var(--foreground))', fontWeight: 500, fontSize: 11 },
    labelBgStyle: { fill: 'hsl(var(--background))', fillOpacity: 0.9 },
  },
];

// NLP Category
const nlpNodes: Node[] = [
  {
    id: 'nlp1',
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
    position: { x: 250, y: 50 },
    style: { 
      background: 'hsl(var(--card))',
      border: '2px solid hsl(var(--destructive))',
      borderRadius: '8px',
      padding: '12px',
      width: 180,
    },
  },
  {
    id: 'nlp2',
    data: { 
      label: (
        <div className="text-xs">
          <div className="font-semibold mb-1">Transformers</div>
          <div className="text-muted-foreground">Citations: 5634</div>
        </div>
      ) 
    },
    position: { x: 250, y: 200 },
    style: { 
      background: 'hsl(var(--card))',
      border: '2px solid hsl(var(--primary))',
      borderRadius: '8px',
      padding: '12px',
      width: 180,
    },
  },
  {
    id: 'nlp3',
    data: { 
      label: (
        <div className="text-xs">
          <div className="font-semibold mb-1">BERT</div>
          <div className="text-muted-foreground">Citations: 6234</div>
        </div>
      ) 
    },
    position: { x: 100, y: 350 },
    style: { 
      background: 'hsl(var(--card))',
      border: '2px solid hsl(var(--primary))',
      borderRadius: '8px',
      padding: '12px',
      width: 180,
    },
  },
  {
    id: 'nlp4',
    data: { 
      label: (
        <div className="text-xs">
          <div className="font-semibold mb-1">GPT Architecture</div>
          <div className="text-muted-foreground">Citations: 7123</div>
        </div>
      ) 
    },
    position: { x: 400, y: 350 },
    style: { 
      background: 'hsl(var(--card))',
      border: '2px solid hsl(var(--primary))',
      borderRadius: '8px',
      padding: '12px',
      width: 180,
    },
  },
];

const nlpEdges: Edge[] = [
  { 
    id: 'nlp-e1', source: 'nlp1', target: 'nlp2',
    label: 'Self-attention breakthrough',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
    labelStyle: { fill: 'hsl(var(--foreground))', fontWeight: 500, fontSize: 11 },
    labelBgStyle: { fill: 'hsl(var(--background))', fillOpacity: 0.9 },
  },
  { 
    id: 'nlp-e2', source: 'nlp2', target: 'nlp3',
    label: 'Bidirectional encoding',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
    labelStyle: { fill: 'hsl(var(--foreground))', fontWeight: 500, fontSize: 11 },
    labelBgStyle: { fill: 'hsl(var(--background))', fillOpacity: 0.9 },
  },
  { 
    id: 'nlp-e3', source: 'nlp2', target: 'nlp4',
    label: 'Autoregressive model',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
    labelStyle: { fill: 'hsl(var(--foreground))', fontWeight: 500, fontSize: 11 },
    labelBgStyle: { fill: 'hsl(var(--background))', fillOpacity: 0.9 },
  },
];

// Machine Learning Category
const mlNodes: Node[] = [
  {
    id: 'ml1',
    data: { 
      label: (
        <div className="text-xs">
          <div className="font-semibold mb-1">Transfer Learning</div>
          <div className="text-muted-foreground">Citations: 3102</div>
        </div>
      ) 
    },
    position: { x: 250, y: 50 },
    style: { 
      background: 'hsl(var(--card))',
      border: '2px solid hsl(var(--primary))',
      borderRadius: '8px',
      padding: '12px',
      width: 180,
    },
  },
  {
    id: 'ml2',
    data: { 
      label: (
        <div className="text-xs">
          <div className="font-semibold mb-1">Fine-tuning Methods</div>
          <div className="text-muted-foreground">Citations: 2876</div>
        </div>
      ) 
    },
    position: { x: 100, y: 200 },
    style: { 
      background: 'hsl(var(--card))',
      border: '2px solid hsl(var(--primary))',
      borderRadius: '8px',
      padding: '12px',
      width: 180,
    },
  },
  {
    id: 'ml3',
    data: { 
      label: (
        <div className="text-xs">
          <div className="font-semibold mb-1">Few-Shot Learning</div>
          <div className="text-muted-foreground">Citations: 2543</div>
        </div>
      ) 
    },
    position: { x: 400, y: 200 },
    style: { 
      background: 'hsl(var(--card))',
      border: '2px solid hsl(var(--primary))',
      borderRadius: '8px',
      padding: '12px',
      width: 180,
    },
  },
];

const mlEdges: Edge[] = [
  { 
    id: 'ml-e1', source: 'ml1', target: 'ml2',
    label: 'Adaptation technique',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
    labelStyle: { fill: 'hsl(var(--foreground))', fontWeight: 500, fontSize: 11 },
    labelBgStyle: { fill: 'hsl(var(--background))', fillOpacity: 0.9 },
  },
  { 
    id: 'ml-e2', source: 'ml1', target: 'ml3',
    label: 'Reduces data requirements',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
    labelStyle: { fill: 'hsl(var(--foreground))', fontWeight: 500, fontSize: 11 },
    labelBgStyle: { fill: 'hsl(var(--background))', fillOpacity: 0.9 },
  },
];

const graphCategories: GraphCategory[] = [
  {
    id: 'computer-vision',
    name: 'Computer Vision',
    count: 4,
    nodes: cvNodes,
    edges: cvEdges,
    optimizations: 0,
  },
  {
    id: 'nlp',
    name: 'Natural Language Processing',
    count: 4,
    nodes: nlpNodes,
    edges: nlpEdges,
    optimizations: 1,
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    count: 3,
    nodes: mlNodes,
    edges: mlEdges,
    optimizations: 0,
  },
];

export const AIKnowledgeGraph = () => {
  const [activeCategory, setActiveCategory] = useState<string>('computer-vision');
  const [searchQuery, setSearchQuery] = useState('');
  
  const currentCategory = graphCategories.find(cat => cat.id === activeCategory) || graphCategories[0];
  const [nodes, setNodes, onNodesChange] = useNodesState(currentCategory.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(currentCategory.edges);

  const handleCategoryChange = (categoryId: string) => {
    const category = graphCategories.find(cat => cat.id === categoryId);
    if (category) {
      setActiveCategory(categoryId);
      setNodes(category.nodes);
      setEdges(category.edges);
    }
  };

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

      {/* Category Tags - Clickable to switch graphs */}
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
          {graphCategories.map((category) => (
            <Badge
              key={category.id}
              variant={activeCategory === category.id ? "default" : "secondary"}
              className={`text-xs cursor-pointer transition-all hover:scale-105 ${
                activeCategory === category.id ? 'shadow-md' : ''
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name} ({category.count})
              {category.optimizations > 0 && (
                <AlertCircle className="w-3 h-3 ml-1 inline" />
              )}
            </Badge>
          ))}
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

      {/* Dynamic Analysis Footer */}
      {currentCategory.optimizations > 0 && (
        <div className="px-3 py-2 bg-muted/50 rounded-md border border-muted-foreground/20">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
            <div className="flex-1 text-sm">
              <span className="font-medium">Analysis:</span>
              <span className="text-muted-foreground ml-1.5">
                {activeCategory === 'nlp' && (
                  <>
                    <span className="font-medium text-foreground">Attention Mechanisms</span> shows weak connections despite high citations. 
                    Link to transformer architectures for optimization.
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
