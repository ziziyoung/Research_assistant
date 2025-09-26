import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Upload, FileText, File, Image, Music, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
        <Button variant="outline" className="justify-between w-48">
          My Library
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto">
        {/* Search */}
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-8"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 p-3 border-b">
          <Button variant="default" size="sm" className="flex-1">
            <Plus className="h-4 w-4 mr-2" />
            Create
          </Button>
          <Button variant="secondary" size="sm" className="flex-1">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>

        {/* Document List */}
        <div className="max-h-64 overflow-y-auto">
          {filteredDocuments.map((doc) => (
            <DropdownMenuItem
              key={doc.id}
              className="p-3 cursor-pointer focus:bg-accent"
              onClick={() => handleDocumentClick(doc.id)}
            >
              <div className="flex items-start gap-3 w-full">
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
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};