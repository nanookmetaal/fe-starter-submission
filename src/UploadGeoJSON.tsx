/**
 * Upload element, handles new geojson files uploads by user
 */
const FileUpload = ({ onUpload }: { onUpload: (id: string, geojson: GeoJSON.FeatureCollection) => void }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const jsonContent = JSON.parse(e.target.result);
          onUpload(file.name, jsonContent);
          localStorage.setItem(
            file.name,
            JSON.stringify(jsonContent)
          );
        };
        reader.readAsText(file);
      } else {
        alert("Upload failed.");
      }
    }
  };

  return (
    <div>
      <input className="text" type="file" onChange={handleFileUpload} accept=".geojson" />
    </div>
  );
};

export default FileUpload;
