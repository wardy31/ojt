import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
function FIleViewer() {
  const getDirPath = localStorage.getItem("dirPath");
  console.log("getDirPath", getDirPath);

  const docs = [
    {
      uri: require("/home/wardy/Desktop/VPAS/BE/src/uploads/35/curriculum-development-office.pdf"),
    }, // Remote file
  ];
  return (
    <DocViewer
      documents={docs}
      pluginRenderers={DocViewerRenderers}
    ></DocViewer>
  );
}

export default FIleViewer;
