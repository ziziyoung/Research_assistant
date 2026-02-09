import { useParams, useNavigate } from "react-router-dom";
import { useIndexedDocuments } from "@/contexts/IndexedDocumentsContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";

const PdfViewer = () => {
  const { docId } = useParams<{ docId: string }>();
  const navigate = useNavigate();
  const { documents } = useIndexedDocuments();
  const doc = documents.find((d) => d.id === docId);

  if (!doc) {
    return (
      <div className="h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-muted-foreground">
          <p className="font-medium">Document not found</p>
          <Button variant="outline" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const hasPdf = doc.downloadUrl && (doc.downloadUrl.startsWith("http") || doc.downloadUrl.startsWith("blob:"));

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <div className="flex items-center gap-3 px-4 py-2 border-b bg-card flex-shrink-0">
        <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <span className="text-sm font-medium truncate flex-1">
          {doc.name.replace(/\.[^/.]+$/, "")}
        </span>
      </div>
      <div className="flex-1 min-h-0 p-4">
        {hasPdf ? (
          <iframe
            title={doc.name}
            src={doc.downloadUrl}
            className="w-full h-full rounded-lg border bg-muted/30"
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <p className="font-medium">No PDF available for preview</p>
            <p className="text-sm">This document has no source link; locally uploaded PDFs are only viewable in the current session. Refresh will require re-upload.</p>
            <Button variant="outline" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfViewer;
