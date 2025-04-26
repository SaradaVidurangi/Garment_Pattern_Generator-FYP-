import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <div
      className="App"
      style={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="container mt-5">
        <h1 className="text-center mb-4">Pattern Maker</h1>

        {/* File Uploader */}
        <div className="mb-4">
          <label htmlFor="imageUploader" className="form-label">
            Upload the image
          </label>
          <input type="file" className="form-control" id="imageUploader" />
        </div>

        {/* Dropdowns and Size Table */}
        <div className="row mb-4">
          {/* Dropdowns */}
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="sizeSelector" className="form-label">
                Select Size
              </label>
              <select id="sizeSelector" className="form-select">
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="fabricSelector" className="form-label">
                Select Fabric Type
              </label>
              <select id="fabricSelector" className="form-select">
                <option value="Cotton">Cotton</option>
                <option value="Linen">Linen</option>
                <option value="Wool">Wool</option>
                <option value="Silk">Silk</option>
                <option value="Cashmere">Cashmere</option>
                <option value="Hemp">Hemp</option>
                <option value="Polyester">Polyester</option>
                <option value="Nylon">Nylon</option>
                <option value="Denim">Denim</option>
                <option value="Velvet">Velvet</option>
              </select>
            </div>
          </div>

          {/* Size Table */}
          <div className="col-md-8">
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>General Size</th>
                  <th>Chest</th>
                  <th>Waist</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>XS</td>
                  <td>32-34"</td>
                  <td>26-28"</td>
                </tr>
                <tr>
                  <td>S</td>
                  <td>34-36"</td>
                  <td>28-30"</td>
                </tr>
                <tr>
                  <td>M</td>
                  <td>38-40"</td>
                  <td>32-34"</td>
                </tr>
                <tr>
                  <td>L</td>
                  <td>42-44"</td>
                  <td>36-38"</td>
                </tr>
                <tr>
                  <td>XL</td>
                  <td>46-48"</td>
                  <td>40-42"</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Output Section */}
        <div className="output-section border p-3 rounded bg-light">
          <h4>Patterns</h4>
          <p className="text-muted">
            Your pattern will appear here after processing.
          </p>
          <button className="btn btn-primary">Download</button>
        </div>
      </div>
    </div>
  );
}
