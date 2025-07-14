import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function App() {
  const [size, setSize] = useState("");
  const [garmentType, setGarmentType] = useState("");
  const [file, setFile] = useState(null);
  const [patternImage, setPatternImage] = useState(null);

  const sizeCharts = {
    "T-Shirt": [
      { size: "XS", shoulder: "34.29", length: "57.15" },
      { size: "S", shoulder: "36.19", length: "59.69" },
      { size: "M", shoulder: "38.1", length: "62.23" },
      { size: "L", shoulder: "40", length: "67.31" },
      { size: "XL", shoulder: "41.9", length: "69.85" },
      { size: "2XL", shoulder: "43.82", length: "72.39" },
    ],
    "Crop top": [
      { size: "XS", shoulder: "34.29", length: "49.53" },
      { size: "S", shoulder: "36.19", length: "50.16" },
      { size: "M", shoulder: "38.1", length: "50.8" },
      { size: "L", shoulder: "40", length: "52.7" },
      { size: "XL", shoulder: "41.9", length: "54.61" },
      { size: "2XL", shoulder: "43.82", length: "56.51" },
    ],
    "Dress": [
      { size: "XS", bust: "41.91", waist: "36.83" },
      { size: "S", bust: "44.45", waist: "39.37" },
      { size: "M", bust: "46.99", waist: "42" },
      { size: "L", bust: "49.53", waist: "44.45" },
      { size: "XL", bust: "53.97", waist: "48.89" },
      { size: "2XL", bust: "58.42", waist: "53.34" },
    ],
    "Jumpsuit": [
      { size: "XS", bust: "41.91", waist: "36.83" },
      { size: "S", bust: "44.45", waist: "39.37" },
      { size: "M", bust: "46.99", waist: "42" },
      { size: "L", bust: "49.53", waist: "44.45" },
      { size: "XL", bust: "53.97", waist: "48.89" },
      { size: "2XL", bust: "58.42", waist: "53.34" },
    ],
    "Pant": [
      { size: "XS", waist: "30", length: "102.6" },
      { size: "S", waist: "33", length: "103.12" },
      { size: "M", waist: "35", length: "103.38" },
      { size: "L", waist: "37", length: "103.88" },
      { size: "XL", waist: "39", length: "104.39" },
      { size: "2XL", waist: "41", length: "104.9" },
    ],
    "Skirt": [
      { size: "XS", waist: "31.8", length: "36.8" },
      { size: "S", waist: "34.29", length: "37.49" },
      { size: "M", waist: "36.9", length: "38.1" },
      { size: "L", waist: "40", length: "38.7" },
      { size: "XL", waist: "43.78", length: "39.39" },
      { size: "2XL", waist: "47.6", length: "40" },
    ],
  };

  const handleSizeChange = (event) => setSize(event.target.value);
  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleGeneratePattern = async () => {
    if (!file || !size || !garmentType) {
      alert("Please upload a file, select garment type, and size.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("size", size);
    formData.append("garmentType", garmentType);

    try {
      const response = await fetch("http://localhost:8081/api/garment/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Pattern generation failed");

      const blob = await response.blob();
      setPatternImage(URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
      alert("Error generating pattern. Try again!");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        minHeight: "40vh",
        py: 2,
        px: 2,
        width: "98.8vw",
        overflowX: "hidden",
      }}
    >
      <Box sx={{ px: 6 }}>
        {/* Header */}
        <Typography variant="h4" align="center">
          Pattern Maker
        </Typography>
        <Typography
          variant="body1"
          align="center"
          gutterBottom
          color="textSecondary"
          paddingBottom={4.7}
        >
          Customize and download your garment patterns!
        </Typography>

        {/* File Uploader */}
        <Box
          sx={{
            border: "1px solid #ddd",
            p: 2,
            borderRadius: 1,
            backgroundColor: "#f0f0f0",
            maxWidth: "59.5%",
            mb: 3,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Upload the image
          </Typography>
          <Button variant="contained" component="label">
            Upload files
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {file && <Typography mt={1}>{file.name}</Typography>}
        </Box>

        {/* Dropdowns and Output */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 2,
            mb: 0,
            flexWrap: "wrap",
          }}
        >
          {/* Dropdowns */}
          <Box
            sx={{
              flex: "1 1 30%",
              "@media (max-width: 900px)": { flex: "1 1 100%" },
            }}
          >
            {/* Garment Type Selector */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="garment-type-selector-label">Select Garment Type</InputLabel>
              <Select
                labelId="garment-type-selector-label"
                value={garmentType}
                onChange={(e) => setGarmentType(e.target.value)}
              >
                {Object.keys(sizeCharts).map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Size Selector */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="size-selector-label">Select Size</InputLabel>
              <Select
                labelId="size-selector-label"
                value={size}
                onChange={handleSizeChange}
                disabled={!garmentType}
              >
                {garmentType &&
                  sizeCharts[garmentType]?.map((s) => (
                    <MenuItem key={s.size} value={s.size}>
                      {s.size}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            {/* Output Section */}
            <Box
              sx={{
                border: "0.5px solid #ddd",
                p: 2,
                borderRadius: 1,
                backgroundColor: "#f0f0f0",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Patterns
              </Typography>
              {patternImage ? (
                <>
                  <img
                    src={patternImage}
                    alt="Generated Pattern"
                    style={{ maxWidth: "100%", borderRadius: 8 }}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    href={patternImage}
                    download="pattern.png"
                    sx={{ mt: 2 }}
                  >
                    Download Pattern
                  </Button>
                </>
              ) : (
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Your pattern will appear here after processing.
                </Typography>
              )}
            </Box>
          </Box>

          {/* Size Table */}
          <Box
            sx={{
              flex: "1 1 10%",
              "@media (max-width: 900px)": { flex: "1 1 100%" },
            }}
          >
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Size</TableCell>
                    {garmentType === "T-Shirt" || garmentType === "Crop top" ? (
                      <>
                        <TableCell>Shoulder(cm)</TableCell>
                        <TableCell>Length(cm)</TableCell>
                      </>
                    ) : garmentType === "Pant" || garmentType === "Skirt" ? (
                      <>
                        <TableCell>Waist(cm)</TableCell>
                        <TableCell>Length(cm)</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>Bust(cm)</TableCell>
                        <TableCell>Waist(cm)</TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(sizeCharts[garmentType] || []).map((row) => (
                    <TableRow key={row.size}>
                      <TableCell>{row.size}</TableCell>
                      {garmentType === "T-Shirt" || garmentType === "Crop top" ? (
                        <>
                          <TableCell>{row.shoulder || "-"}</TableCell>
                          <TableCell>{row.length || "-"}</TableCell>
                        </>
                      ) : garmentType === "Pant" || garmentType === "Skirt" ? (
                        <>
                          <TableCell>{row.waist || "-"}</TableCell>
                          <TableCell>{row.length || "-"}</TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>{row.bust || "-"}</TableCell>
                          <TableCell>{row.waist || "-"}</TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>

        {/* Generate Pattern Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleGeneratePattern}
          sx={{ mt: 2 }}
        >
          Generate Pattern
        </Button>
      </Box>
    </Box>
  );
}
