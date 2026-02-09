import { useCallback, useState, useMemo, useEffect } from 'react';
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
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Network, AlertCircle, RefreshCw } from 'lucide-react';
import { useIndexedDocuments, type DocumentIndex, type KnowledgeGraphCategory } from '@/contexts/IndexedDocumentsContext';

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

const staticCategoryData: { id: KnowledgeGraphCategory; name: string; nodes: Node[]; edges: Edge[]; optimizations: number }[] = [
  { id: 'computer-vision', name: 'Computer Vision', nodes: cvNodes, edges: cvEdges, optimizations: 0 },
  { id: 'nlp', name: 'Natural Language Processing', nodes: nlpNodes, edges: nlpEdges, optimizations: 1 },
  { id: 'machine-learning', name: 'Machine Learning', nodes: mlNodes, edges: mlEdges, optimizations: 0 },
];

/** Topic keywords per static node, used to match uploaded docs and create edges */
const staticNodeTopics: Record<string, string[]> = {
  cv1: ['deep learning', 'vision', 'neural', 'feature', 'convolutional'],
  cv2: ['cnn', 'convolutional', 'architecture', 'resnet', 'backbone', 'network'],
  cv3: ['detection', 'object detection', 'bounding', 'yolo', 'detector'],
  cv4: ['segmentation', 'semantic', 'pixel', 'mask', 'segment'],
  nlp1: ['attention', 'mechanism', 'self-attention', 'attention mechanism'],
  nlp2: ['transformer', 'encoder', 'decoder', 'transformers'],
  nlp3: ['bert', 'bidirectional', 'embedding', 'language model'],
  nlp4: ['gpt', 'autoregressive', 'generation', 'llm', 'language model'],
  ml1: ['transfer', 'transfer learning', 'domain adaptation', 'adaptation'],
  ml2: ['fine-tuning', 'fine tuning', 'finetuning', 'adapt', 'adaptation'],
  ml3: ['few-shot', 'few shot', 'meta-learning', 'meta learning', 'zero-shot'],
};

const defaultEdgeStyle = {
  type: 'smoothstep' as const,
  markerEnd: { type: MarkerType.ArrowClosed },
  style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
  labelStyle: { fill: 'hsl(var(--foreground))', fontWeight: 500, fontSize: 10 },
  labelBgStyle: { fill: 'hsl(var(--background))', fillOpacity: 0.9 },
};

/** Static node → doc: algorithm/structure relation labels, aligned with cluster style */
const staticNodeRelationLabels: Record<string, string> = {
  cv1: 'Foundation architecture / deep learning extension',
  cv2: 'Architecture extension / backbone variant',
  cv3: 'Enables detection / detection variant',
  cv4: 'Pixel-level prediction / segmentation variant',
  nlp1: 'Self-attention breakthrough / attention variant',
  nlp2: 'Encoder-decoder / transformer extension',
  nlp3: 'Bidirectional encoding / representation variant',
  nlp4: 'Autoregressive model / generation variant',
  ml1: 'Adaptation technique / transfer variant',
  ml2: 'Fine-tuning / adaptation extension',
  ml3: 'Reduces data requirements / few-shot variant',
};

/** Match relevance (keywords/summary vs static topics), then parent=static node, child=doc; edge parent→child */
function buildEdgesFromDocsToStaticNodes(docs: DocumentIndex[], staticNodeIds: string[]): Edge[] {
  const edges: Edge[] = [];
  for (const doc of docs) {
    const docKw = doc.keywords.map((k) => k.toLowerCase());
    const summaryLower = doc.summary.toLowerCase();
    for (const nodeId of staticNodeIds) {
      const topics = staticNodeTopics[nodeId] ?? [];
      const matched = topics.filter(
        (t) => docKw.some((k) => k.includes(t) || t.includes(k)) || summaryLower.includes(t)
      );
      if (matched.length > 0) {
        const relationLabel = staticNodeRelationLabels[nodeId] ?? 'Derived research';
        edges.push({
          id: `e-static-${nodeId}-doc-${doc.id}`,
          source: nodeId,
          target: doc.id,
          label: relationLabel,
          ...defaultEdgeStyle,
        });
      }
    }
  }
  return edges;
}

function docToNode(doc: DocumentIndex, x: number, y: number): Node {
  const title = doc.name.replace(/\.[^/.]+$/, '');
  const label = title.length > 28 ? title.slice(0, 25) + '...' : title;
  return {
    id: doc.id,
    data: {
      label: (
        <div className="text-xs">
          <div className="font-semibold mb-1">{label}</div>
          <div className="text-muted-foreground">Citations: {doc.citation}</div>
        </div>
      ),
    },
    position: { x, y },
    style: {
      background: 'hsl(var(--card))',
      border: '2px solid hsl(var(--primary))',
      borderRadius: '8px',
      padding: '12px',
      width: 200,
    },
  };
}

function buildNodesFromDocuments(docs: DocumentIndex[]): Node[] {
  const n = docs.length;
  const radius = Math.min(280, 120 + n * 25);
  const centerX = 350;
  const centerY = 280;
  return docs.map((doc, i) => {
    const angle = n <= 1 ? 0 : (2 * Math.PI * i) / n - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return docToNode(doc, x, y);
  });
}

/** Place doc nodes in a row at given Y (for CV/NLP/ML graph bottom) */
function buildDocNodesRow(docs: DocumentIndex[], startY: number): Node[] {
  const gap = 220;
  const startX = 80;
  return docs.map((doc, i) => docToNode(doc, startX + i * gap, startY));
}

/** Doc–doc: match by shared keywords; parent = higher citation or earlier, child = other; edge parent→child */
function buildEdgesFromDocuments(docs: DocumentIndex[]): Edge[] {
  const edges: Edge[] = [];
  const keywordsLower = docs.map((d) => d.keywords.map((k) => k.toLowerCase()));
  for (let i = 0; i < docs.length; i++) {
    for (let j = i + 1; j < docs.length; j++) {
      const shared = keywordsLower[i].filter((k) => keywordsLower[j].includes(k));
      if (shared.length === 0) continue;
      const a = docs[i];
      const b = docs[j];
      const parent =
        a.citation > b.citation
          ? a
          : b.citation > a.citation
            ? b
            : new Date(a.createdAt).getTime() <= new Date(b.createdAt).getTime()
              ? a
              : b;
      const child = parent.id === a.id ? b : a;
      const kw = shared.length <= 2 ? shared.join(', ') : shared[0] + ' …';
      const label = `Shared methodology: ${kw}`;
      edges.push({
        id: `e-${parent.id}-${child.id}`,
        source: parent.id,
        target: child.id,
        label,
        ...defaultEdgeStyle,
      });
    }
  }
  return edges;
}

export const AIKnowledgeGraph = () => {
  const { documents } = useIndexedDocuments();
  const [activeCategory, setActiveCategory] = useState<string>('my-papers');
  const [searchQuery, setSearchQuery] = useState('');
  const [graphVersion, setGraphVersion] = useState(0);

  const sortedDocs = useMemo(
    () => [...documents].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [documents]
  );

  /** Keep only clusters with at least one edge and nodes that appear in edges */
  const allCategories = useMemo(() => {
    const DOC_ROW_Y = 420;
    const list: GraphCategory[] = [];

    const myNodes = buildNodesFromDocuments(sortedDocs);
    const myEdges = buildEdgesFromDocuments(sortedDocs);
    if (myEdges.length > 0) {
      const connectedIds = new Set(myEdges.flatMap((e) => [e.source, e.target]));
      const filteredNodes = myNodes.filter((n) => connectedIds.has(n.id));
      if (filteredNodes.length > 0) {
        list.push({
          id: 'my-papers',
          name: 'My Papers',
          count: filteredNodes.length,
          nodes: filteredNodes,
          edges: myEdges,
          optimizations: 0,
        });
      }
    }

    staticCategoryData.forEach((staticCat) => {
      const docsInCategory = documents.filter((d) => (d.category ?? 'machine-learning') === staticCat.id);
      const docNodes = buildDocNodesRow(docsInCategory, DOC_ROW_Y);
      const staticNodeIds = staticCat.nodes.map((n) => n.id);
      const docEdges = buildEdgesFromDocuments(docsInCategory);
      const docToStaticEdges = buildEdgesFromDocsToStaticNodes(docsInCategory, staticNodeIds);
      const allNodes = [...staticCat.nodes, ...docNodes];
      const allEdges = [...staticCat.edges, ...docEdges, ...docToStaticEdges];
      if (allEdges.length === 0) return;
      const connectedIds = new Set(allEdges.flatMap((e) => [e.source, e.target]));
      const filteredNodes = allNodes.filter((n) => connectedIds.has(n.id));
      if (filteredNodes.length === 0) return;
      list.push({
        id: staticCat.id,
        name: staticCat.name,
        count: filteredNodes.length,
        nodes: filteredNodes,
        edges: allEdges,
        optimizations: staticCat.optimizations,
      });
    });

    return list;
  }, [sortedDocs, documents, graphVersion]);

  const currentCategory = allCategories.find((cat) => cat.id === activeCategory) ?? allCategories[0];
  const [nodes, setNodes, onNodesChange] = useNodesState(currentCategory?.nodes ?? []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(currentCategory?.edges ?? []);

  useEffect(() => {
    if (allCategories.length > 0 && !allCategories.some((c) => c.id === activeCategory)) {
      setActiveCategory(allCategories[0].id);
    }
  }, [allCategories, activeCategory]);

  useEffect(() => {
    if (currentCategory) {
      setNodes(currentCategory.nodes);
      setEdges(currentCategory.edges);
    }
  }, [currentCategory, setNodes, setEdges]);

  const handleCategoryChange = (categoryId: string) => {
    const category = allCategories.find((cat) => cat.id === categoryId);
    if (category) {
      setActiveCategory(categoryId);
      setNodes(category.nodes);
      setEdges(category.edges);
    }
  };

  const handleRefreshGraph = useCallback(() => {
    setGraphVersion((v) => v + 1);
  }, []);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const isGraphEmpty = allCategories.length === 0;

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
            <span className="font-semibold">{allCategories.length}</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <Button variant="outline" size="sm" className="gap-1.5" onClick={handleRefreshGraph}>
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh graph
          </Button>
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
          {allCategories.map((category) => (
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
          {isGraphEmpty ? (
            <div className="h-full flex flex-col items-center justify-center gap-2 text-center p-6 text-muted-foreground">
              <Network className="h-12 w-12 opacity-50" />
              <p className="font-medium">No connected papers or clusters</p>
              <p className="text-sm">Only articles and clusters with at least one edge are shown. Upload papers and ensure they relate to the graph or other papers (e.g. shared keywords, topic match) to see them here.</p>
            </div>
          ) : (
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
          )}
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
