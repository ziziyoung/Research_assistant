import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, File, Image, Music, MoreHorizontal, Eye, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Document {
  id: string;
  name: string;
  type: string;
  owner: string;
  modified: string;
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Short Video Competition Analysis Lab",
    type: "pdf",
    owner: "yangyuwei",
    modified: "6:52 PM Sep 17"
  },
  {
    id: "2",
    name: "Board",
    type: "text",
    owner: "yangyuwei",
    modified: "2:38 PM Sep 17"
  },
  {
    id: "3",
    name: "Flowchart",
    type: "text",
    owner: "yangyuwei",
    modified: "2:37 PM Sep 17"
  },
  {
    id: "4",
    name: "Board",
    type: "data",
    owner: "yangyuwei",
    modified: "2:36 PM Sep 17"
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

export const DocumentTable = () => {
  const [documents] = useState<Document[]>(mockDocuments);
  const navigate = useNavigate();

  const handleFileClick = (fileId: string) => {
    navigate(`/file/${fileId}`);
  };

  return (
    <Card className="h-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Documents</h3>
            <div className="text-xs text-muted-foreground">
              AI indexes: Automatically generate summary indexes, simple keyword annotations,<br />
              thumbnails, method summaries, code addresses, literature times, and supports<br />
              batch import and batch generation of index management documents
            </div>
          </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Modified</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow 
                  key={doc.id} 
                  className="document-hover cursor-pointer"
                  onClick={() => handleFileClick(doc.id)}
                >
                  <TableCell>
                    {getFileIcon(doc.type)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {doc.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {doc.owner}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {doc.modified}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleFileClick(doc.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};