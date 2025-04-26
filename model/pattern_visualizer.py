import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import quad
from garment_utils import garment_class
from measurements import calculate_waist_length_upper_panel
from measurements import calculate_waist_length_bottom_panel
from measurements import calculate_vertical_height

# Function to calculate area of a polygon using vertices
def calculate_area(vertices):
    # Using the shoelace formula to calculate the area of a polygon
    n = len(vertices)
    area = 0
    for i in range(n):
        x1, y1 = vertices[i]
        x2, y2 = vertices[(i + 1) % n]
        area += x1 * y2 - x2 * y1
    return abs(area) / 2

# Function to scale measurements by a given factor
def scale_measurements(vertices, scale_factor):
    return [(x * scale_factor, y * scale_factor) for x, y in vertices]

def new_scale_measurements(vertices, scale_factor_x, scale_factor_y):
    return [(x * scale_factor_x, y * scale_factor_y) for x, y in vertices]

def calculate_length_cm(start, end, units_in_meter):
    length_in_units = np.sqrt((end[0] - start[0])**2 + (end[1] - start[1])**2)
    return (length_in_units / units_in_meter) * 100

# Bézier curve length calculation
def bezier_curve_length(start, control, end):
    def bezier_derivative(t):
        dx_dt = 2 * (1 - t) * (control[0] - start[0]) + 2 * t * (end[0] - control[0])
        dy_dt = 2 * (1 - t) * (control[1] - start[1]) + 2 * t * (end[1] - control[1])
        return np.sqrt(dx_dt**2 + dy_dt**2)

    length, _ = quad(bezier_derivative, 0, 1)
    return length

def calculate_angle(start, end):
    dx, dy = end[0] - start[0], end[1] - start[1]
    angle =  np.degrees(np.arctan2(dy, dx)) 
    if angle < -90 or angle > 90:
        angle += 180
    return angle

def plot_curve(start, end, curvature, color):
    mid_x = (start[0] + end[0]) / 2
    mid_y = (start[1] + end[1]) / 2
    dx = end[0] - start[0]
    dy = end[1] - start[1]
    length = np.sqrt(dx**2 + dy**2)
    perp_x = -dy / length
    perp_y = dx / length
    control_x = mid_x + curvature * perp_x * length
    control_y = mid_y + curvature * perp_y * length
    t = np.linspace(0, 1, 50)
    bezier_x = (1 - t) ** 2 * start[0] + 2 * (1 - t) * t * control_x + t ** 2 * end[0]
    bezier_y = (1 - t) ** 2 * start[1] + 2 * (1 - t) * t * control_y + t ** 2 * end[1]
    plt.plot(bezier_x, bezier_y, color=color, linewidth=2)

def scale_vertices(vertices, scale_factor):
    x_c = np.mean([v[0] for v in vertices])
    y_c = np.mean([v[1] for v in vertices])
    k = np.sqrt(scale_factor)
    scaled_vertices = [
        ((x_c + (v[0] - x_c) * k), (y_c + (v[1] - y_c) * k))
        for v in vertices
    ]
    return scaled_vertices

def draw_panel(panel_name, panel_data, color,scale_factor, x_offset=0, units_in_meter=100, garment_type=None):
    
    vertices = panel_data["vertices"]
    original_area = calculate_area(vertices)
    change_panels = ["wb_back", "wb_front"]

    # Default scaling
    scaled_vertices = scale_measurements(vertices, scale_factor)

    # Conditional scaling overrides
    if garment_type == "pant" and panel_name in change_panels:
        new_scale_factor = scale_factor * 2
        scaled_vertices = new_scale_measurements(vertices, new_scale_factor, scale_factor)

    elif garment_type == "sleeveless_jumpsuit" and panel_name in change_panels:
        new_scale_factor = scale_factor * 2
        scaled_vertices = new_scale_measurements(vertices, new_scale_factor, scale_factor)

    edges = panel_data["edges"]

    x_values = [v[0] + x_offset for v in scaled_vertices]
    y_values = [v[1] for v in scaled_vertices]

    center_x = np.mean(x_values)
    max_y = max(y_values)

    # Calculate waist length and area
    parameter = calculate_waist_length_upper_panel(scaled_vertices)
    new_area = calculate_area(scaled_vertices)

        # Display label based on garment type
    if garment_type in ("dress", "sleeveless_dress", "jumpsuit"):
        parameter = calculate_waist_length_upper_panel(scaled_vertices)
    

    elif garment_type in ("skirt", "pant","sleeveless_jumpsuit"):
        parameter = calculate_waist_length_bottom_panel(scaled_vertices)
        

    elif garment_type in ("croptop", "tshirt", "sleeveless_tshirt", "sleeveless_croptop"):
        parameter = calculate_vertical_height(scaled_vertices)
        
    
    else:
        return None
    

    for edge in edges:
        start_idx, end_idx = edge["endpoints"]
        start, end = scaled_vertices[start_idx], scaled_vertices[end_idx]

        # Apply offset
        start = (start[0] + x_offset, start[1])
        end = (end[0] + x_offset, end[1])

        if "curvature" in edge:
            curvature = edge["curvature"][1]

            # Get control point for Bézier
            mid_x = (start[0] + end[0]) / 2
            mid_y = (start[1] + end[1]) / 2
            dx = end[0] - start[0]
            dy = end[1] - start[1]
            length = np.sqrt(dx**2 + dy**2)
            perp_x = -dy / length
            perp_y = dx / length
            control_x = mid_x + curvature * perp_x * length
            control_y = mid_y + curvature * perp_y * length
            control = (control_x, control_y)

            # Draw Bézier curve
            t = np.linspace(0, 1, 50)
            bezier_x = (1 - t) ** 2 * start[0] + 2 * (1 - t) * t * control[0] + t ** 2 * end[0]
            bezier_y = (1 - t) ** 2 * start[1] + 2 * (1 - t) * t * control[1] + t ** 2 * end[1]
            plt.plot(bezier_x, bezier_y, color=color, linewidth=2)

            # Calculate curve length
            length_in_units = bezier_curve_length(start, control, end)
        else:
            # Draw straight line
            plt.plot([start[0], end[0]], [start[1], end[1]], color=color, linewidth=2)
            length_in_units = np.sqrt((end[0] - start[0])**2 + (end[1] - start[1])**2)

        # Convert to cm and annotate
        segment_length_cm = (length_in_units / units_in_meter) * 100
        mid_x = (start[0] + end[0]) / 2
        mid_y = (start[1] + end[1]) / 2
        angle = calculate_angle(start, end)
        text_offset = 2
        font_size = 6 if segment_length_cm > 1 else 4

        plt.text(mid_x + text_offset, mid_y + text_offset, f"{segment_length_cm:.1f}", 
                 fontsize=font_size, color="black", ha="center", fontweight="bold", va="center", 
                 rotation=angle)
    
        # Label the panel BELOW the panel
    center_x = sum(v[0] for v in vertices) / len(vertices) + x_offset
    min_y = min(v[1] for v in vertices)  # Get lowest point for panel
    
    if garment_type in ("sleeveless_tshirt", "sleeveless_croptop"):
        plt.text(center_x, min_y+15, panel_name, fontsize=10, color=color, ha="center", fontweight="bold")
    

    else:
        plt.text(center_x, min_y-12, panel_name, fontsize=10, color=color, ha="center", fontweight="bold")