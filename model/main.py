import os
import json
import matplotlib
import io
from flask import Flask, request, jsonify, send_file
import matplotlib.pyplot as plt
from predict_garment import predict_class
from pattern_visualizer import draw_panel
from garment_utils import (
    load_sizechart,
    desired_parameter,
    select_panel,
    original_parameter_value,
    scale_factor,
    garment_class
)

matplotlib.use('Agg')  # Use non-GUI backend for Matplotlib to avoid issues with GUI backends

app = Flask(__name__)

# File paths
MODEL_PATH = r"E:\sem 7\fyp\model/model1.pt"
PATTERN_SET_PATH = r"E:\sem 7\fyp\model\pattern set"
SIZE_CHART_PATH = r"E:\sem 7\fyp\model/size_chart.json"
CLASS_NAMES_PATH = r"E:\sem 7\fyp\model/class_names.json"

# Load class names from JSON file
with open(CLASS_NAMES_PATH, "r") as f:
    class_names = json.load(f)

@app.route("/predict", methods=["POST"])
def predict_and_visualize():
    # Check if image is provided in the request
    if "image" not in request.files or "size" not in request.form:
        return jsonify({"error": "Image and size are required"}), 400

    # Get the image and size from the request
    image_file = request.files["image"]
    size = request.form["size"]

    # Generate a unique filename for the uploaded image
    image_filename = image_file.filename
    image_path = os.path.join("uploads", image_filename)

    # Ensure the upload folder exists
    if not os.path.exists("uploads"):
        os.makedirs("uploads")

    # Save the uploaded image
    image_file.save(image_path)

    # Predict garment class
    predicted_class = predict_class(MODEL_PATH, image_path, class_names)
    print(f"Predicted Class: {predicted_class}")

    # Load JSON specification
    class_folder = os.path.join(PATTERN_SET_PATH, predicted_class)
    spec_path = os.path.join(class_folder, "specification.json")
    if not os.path.exists(spec_path):
        os.remove(image_path)  # Cleanup uploaded image
        return jsonify({"error": "Specification file not found"}), 500

    with open(spec_path, "r") as f:
        specification_data = json.load(f)

    units_in_meter = specification_data["properties"].get("units_in_meter", 100)
    panels = specification_data["pattern"]["panels"]

    # Load size chart
    size_chart = load_sizechart(SIZE_CHART_PATH)

    garment_type = garment_class(predicted_class)
    # Process
    if garment_type == "pant":
        desired_value = 0.25 * desired_parameter(predicted_class, size, size_chart)
    elif garment_type == "sleeveless_jumpsuit":
        desired_value = 0.5 * desired_parameter(predicted_class, size, size_chart)
    else:
        desired_value = desired_parameter(predicted_class, size, size_chart)

    selected_panel = select_panel(predicted_class, panels)
    original_value = original_parameter_value(predicted_class, selected_panel["vertices"])

    if original_value and desired_value:
        sf = scale_factor(original_value, desired_value)
        print(f"Scale factor for {predicted_class} ({size}): {sf:.3f}")
    else:
        os.remove(image_path)  # Cleanup uploaded image
        return jsonify({"error": "Could not compute scale factor"}), 500

    # Visualization
    plt.figure(figsize=(40, 40), dpi=120)
    x_offset = 0
    colors = ["blue", "red", "green", "orange", "purple"]
    color_index = 0

    for panel_name, panel_data in panels.items():
        color = colors[color_index % len(colors)]  # Generate a random color for each panel
        draw_panel(panel_name, panel_data, color, sf, x_offset, garment_type=garment_type)
        
        # Increase the offset for the next panel to avoid overlap
        x_offset += 80  # Adjust spacing for better visualization
        color_index += 1

    plt.gca().set_aspect('equal')
    plt.title(f"Sewing Pattern with Measurements (in cm) for {size} size")
    plt.axis('off')
    plt.tight_layout()

    # Save the image to buffer
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    plt.close()  # Close the plot to free resources

    os.remove(image_path)  # Cleanup uploaded image after serving the file
    return send_file(buf, mimetype='image/png')

if __name__ == "__main__":
    app.run(port=5000, debug=True)
