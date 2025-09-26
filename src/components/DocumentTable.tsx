import { useState } from "react";
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
    name: "Research Notes.docx",
    type: "text",
    created: "2024-01-14",
    modified: "2024-01-16",
    size: "456 KB"
  },
  {
    id: "3",
    name: "Interview Transcript.txt",
    type: "text",
    created: "2024-01-13",
    modified: "2024-01-15",
    size: "1.2 MB"
  },
  {
    id: "4",
    name: "Dataset.xlsx",
    type: "data",
    created: "2024-01-12",
    modified: "2024-01-14",
    size: "5.7 MB"
  },
  {
    id: "5",
    name: "Audio Recording.mp3",
    type: "audio",
    created: "2024-01-11",
    modified: "2024-01-13",
    size: "12.4 MB"
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

  return (
    <Card className="h-full">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Documents</h3>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Modified</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id} className="document-hover">
                  <TableCell>
                    {getFileIcon(doc.type)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {doc.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {doc.created}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {doc.modified}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {doc.size}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
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