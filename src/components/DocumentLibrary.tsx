import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FileText, File, Image, Music, ChevronDown, ChevronRight, FolderOpen, Folder, Clock, Users, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Document {
  id: string;
  name: string;
  type: string;
  created: string;
  modified: string;
  size: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  icon: any;
  documents: Document[];
  defaultOpen?: boolean;
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Short Video Competition Analysis Lab",
    type: "pdf",
    created: "2024-01-15",
    modified: "6:52 PM Sep 17",
    size: "2.3 MB",
    category: "recent"
  },
  {
    id: "2",
    name: "Board Meeting Notes",
    type: "text",
    created: "2024-01-14",
    modified: "2:38 PM Sep 17",
    size: "456 KB",
    category: "boards"
  },
  {
    id: "3",
    name: "User Flow Diagram",
    type: "text",
    created: "2024-01-13",
    modified: "2:37 PM Sep 17",
    size: "1.2 MB",
    category: "flowcharts"
  },
  {
    id: "4",
    name: "Q3 Strategy Board",
    type: "data",
    created: "2024-01-12",
    modified: "2:36 PM Sep 17",
    size: "5.7 MB",
    category: "boards"
  },
  {
    id: "5",
    name: "System Architecture Flow",
    type: "image",
    created: "2024-01-11",
    modified: "1:15 PM Sep 16",
    size: "3.2 MB",
    category: "flowcharts"
  },
  {
    id: "6",
    name: "Shared Project Plan",
    type: "pdf",
    created: "2024-01-10",
    modified: "4:22 PM Sep 15",
    size: "1.8 MB",
    category: "shared"
  }
];

const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return <FileText className="h-3 w-3 text-red-500" />;
    case "text":
      return <File className="h-3 w-3 text-blue-500" />;
    case "image":
      return <Image className="h-3 w-3 text-green-500" />;
    case "audio":
      return <Music className="h-3 w-3 text-purple-500" />;
    default:
      return <File className="h-3 w-3 text-muted-foreground" />;
  }
};

export const DocumentLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    recent: true, // Recent is expanded by default
  });
  const navigate = useNavigate();

  const categories: Category[] = [
    {
      id: "recent",
      name: "Recent Documents",
      icon: Clock,
      documents: mockDocuments.filter(doc => doc.category === "recent"),
      defaultOpen: true
    },
    {
      id: "boards",
      name: "Boards",
      icon: FolderOpen,
      documents: mockDocuments.filter(doc => doc.category === "boards")
    },
    {
      id: "flowcharts",
      name: "Flowcharts",
      icon: Folder,
      documents: mockDocuments.filter(doc => doc.category === "flowcharts")
    },
    {
      id: "shared",
      name: "Shared with Me",
      icon: Users,
      documents: mockDocuments.filter(doc => doc.category === "shared")
    }
  ];

  const filteredCategories = categories.map(category => ({
    ...category,
    documents: category.documents.filter(doc =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.documents.length > 0 || searchQuery === "");

  const handleDocumentClick = (docId: string) => {
    navigate(`/file/${docId}`);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  return (
    <div className="h-full flex flex-col border-r bg-card">
      {/* Header */}
      <div className="p-4 border-b flex-shrink-0">
        <h2 className="text-lg font-semibold text-foreground mb-3">My Library</h2>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-8 text-sm"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-scroll">{/* Independent vertical scrolling */}
        {filteredCategories.map((category) => (
          <div key={category.id} className="border-b border-border/50 last:border-b-0">
            <Collapsible
              open={expandedCategories[category.id] || false}
              onOpenChange={() => toggleCategory(category.id)}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-muted/50 transition-colors text-left">
                <div className="flex items-center gap-2">
                  <category.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{category.name}</span>
                  <span className="text-xs text-muted-foreground ml-1">
                    ({category.documents.length})
                  </span>
                </div>
                {expandedCategories[category.id] ? (
                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                )}
              </CollapsibleTrigger>
              
              <CollapsibleContent className="pb-2">
                <div className="space-y-1">
                  {category.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="mx-2 p-2 rounded-md cursor-pointer hover:bg-muted/70 transition-colors group"
                      onClick={() => handleDocumentClick(doc.id)}
                    >
                      <div className="flex items-start gap-2">
                        {getFileIcon(doc.type)}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-xs text-foreground truncate group-hover:text-primary">
                            {doc.name}
                          </h4>
                          <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                            <span className="truncate">{doc.modified}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
        
        {filteredCategories.length === 0 && searchQuery && (
          <div className="p-4 text-center">
            <p className="text-sm text-muted-foreground">No documents found</p>
          </div>
        )}
      </div>
    </div>
  );
};