import { useState } from "react";
import { Search, Plus, Upload, FileText, File, Image, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

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
    name: "Voice Computing Analysis.pdf",
    type: "pdf",
    created: "2024-01-15",
    modified: "2024-01-17",
    size: "2.3 MB"
  },
  {
    id: "2",
    name: "Research Notes",
    type: "text",
    created: "2024-01-14",
    modified: "2024-01-16",
    size: "456 KB"
  },
  {
    id: "3",
    name: "Interview Transcript",
    type: "text",
    created: "2024-01-13",
    modified: "2024-01-15",
    size: "1.2 MB"
  },
  {
    id: "4",
    name: "Dataset",
    type: "data",
    created: "2024-01-12",
    modified: "2024-01-14",
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

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
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
            className="p-3 document-hover cursor-pointer hover:shadow-sm"
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
  );
};