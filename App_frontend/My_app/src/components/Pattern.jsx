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
  
  const [file, setFile] = useState(null); // Store uploaded file
  const [patternImage, setPatternImage] = useState(null); // Store generated pattern

  const handleSizeChange = (event) => setSize(event.target.value);
  
  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleGeneratePattern = async () => {
    if (!file || !size ) {
      alert("Please upload a file and select size.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("size", size);
   

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
        width: "98.8vw", // Full width of viewport
        
        overflowX: "hidden", // Avoid horizontal scrolling
      
      }}
    >
      {/* Laptop-specific container */}
      <Box
        sx={{
          px: 6, // Padding for larger screens

        }}
      >
        {/* Header */}
        <Typography variant="h4" align="center" >
          Pattern Maker
        </Typography>
        <Typography variant="body1" align="center" gutterBottom color="textSecondary" paddingBottom={4.7}>
          Customize and download your garment patterns!
        </Typography>

       {/* File Uploader */}
       <Box sx={{
            border: "1px solid #ddd",
            p: 2,
            borderRadius: 1,
            backgroundColor: "#f0f0f0",
            maxWidth:"59.5%",
            mb: 3,
            
          }}>
          <Typography variant="h6" gutterBottom>
            Upload the image
          </Typography>
          <Button variant="contained" component="label">
            Upload files
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {file && <Typography mt={1}>{file.name}</Typography>}
        </Box>

        {/* Dropdowns and Size Table and Output Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 2,
            mb: 0,
            flexWrap: "wrap", // Ensure that on smaller screens, the content wraps
          }}
        >
          
          
          {/* Dropdowns */}
          <Box
            sx={{
              flex: "1 1 30%",
              "@media (max-width: 900px)": { flex: "1 1 100%" }, // Stack vertically on smaller screens
            }}
          >
             

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="size-selector-label">Select Size</InputLabel>
              <Select
                labelId="size-selector-label"
                value={size}
                onChange={handleSizeChange}
              >
                 {["XS", "S", "M", "L", "XL"].map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
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
                  <img src={patternImage} alt="Generated Pattern" style={{ maxWidth: "100%", borderRadius: 8 }} />
                  <Button variant="contained" color="secondary" href={patternImage} download="pattern.png" sx={{ mt: 2 }}>
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
              "@media (max-width: 900px)": { flex: "1 1 100%" }, // Stack vertically on smaller screens
            }}
          >
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>General Size</TableCell>
                    <TableCell>Chest</TableCell>
                    <TableCell>Waist</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {[
                    { size: "XS", chest: "32-34\"", waist: "26-28\"" },
                    { size: "S", chest: "34-36\"", waist: "28-30\"" },
                    { size: "M", chest: "38-40\"", waist: "32-34\"" },
                    { size: "L", chest: "42-44\"", waist: "36-38\"" },
                    { size: "XL", chest: "46-48\"", waist: "40-42\"" },
                  ].map((row) => (
                    <TableRow key={row.size}>
                      <TableCell>{row.size}</TableCell>
                      <TableCell>{row.chest}</TableCell>
                      <TableCell>{row.waist}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
         {/* Generate Pattern Button */}
        <Button variant="contained" color="primary" onClick={handleGeneratePattern} sx={{ mt: 0 }}>
          Generate Pattern
        </Button>
        
      </Box>
    </Box>
  );
}
