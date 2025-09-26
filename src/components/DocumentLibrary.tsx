import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Upload, FileText, File, Image, Music, ChevronDown, Library } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Document {
  id: string;
  name: string;
  type: string;
  created: string;
  modified: string;
  size: string;
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Short Video Competition Analysis Lab",
    type: "pdf",
    created: "2024-01-15",
    modified: "6:52 PM Sep 17",
    size: "2.3 MB"
  },
  {
    id: "2",
    name: "Board",
    type: "text",
    created: "2024-01-14",
    modified: "2:38 PM Sep 17",
    size: "456 KB"
  },
  {
    id: "3",
    name: "Flowchart",
    type: "text",
    created: "2024-01-13",
    modified: "2:37 PM Sep 17",
    size: "1.2 MB"
  },
  {
    id: "4",
    name: "Board",
    type: "data",
    created: "2024-01-12",
    modified: "2:36 PM Sep 17",
    size: "5.7 MB"
  }
];

const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return <FileText className="h-4 w-4 text-red-500" />;
    case "text":
      return <File className="h-4 w-4 text-blue-500" />;
    case "image":
      return <Image className="h-4 w-4 text-green-500" />;
    case "audio":
      return <Music className="h-4 w-4 text-purple-500" />;
    default:
      return <File className="h-4 w-4 text-muted-foreground" />;
  }
};

export const DocumentLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [documents] = useState<Document[]>(mockDocuments);
  const navigate = useNavigate();

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDocumentClick = (docId: string) => {
    navigate(`/file/${docId}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 text-foreground">
          <Library className="h-4 w-4" />
          My Library
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-0 bg-card border" align="start">
        <div className="flex flex-col max-h-96">
          {/* Header */}
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-foreground mb-3">My Library</h2>
            
            {/* Search */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="default" size="sm" className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Create
              </Button>
              <Button variant="secondary" size="sm" className="flex-1">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>

          {/* Document List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {filteredDocuments.map((doc) => (
              <Card
                key={doc.id}
                className="p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleDocumentClick(doc.id)}
              >
                <div className="flex items-start gap-3">
                  {getFileIcon(doc.type)}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-foreground truncate">
                      {doc.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <span>Modified {doc.modified}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};