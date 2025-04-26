import numpy as np

# Function to calculate horizontal waist length from the bottommost panel vertices
def calculate_waist_length_upper_panel(vertices):
    # Find the maximum Y-coordinate (bottommost point)
    waist_line_y = max(v[1] for v in vertices)
    
    
    # Filter vertices that are at the bottommost Y-coordinate
    waist_vertices = [v for v in vertices if abs(v[1] - waist_line_y) < 1e-6]
   
    # Get the leftmost and rightmost vertices based on X-coordinate
    min_x = min(waist_vertices, key=lambda v: v[0])[0]
    max_x = max(waist_vertices, key=lambda v: v[0])[0]
    
    # Calculate waist length as the distance between the leftmost and rightmost points
    waist_length = abs(max_x - min_x)
    return waist_length


# Function to calculate horizontal waist length from the panel vertices
def calculate_waist_length_bottom_panel(vertices):
    waist_line_y = min(v[1] for v in vertices)  # Find topmost Y-coordinate (waistline)
    waist_vertices = [v for v in vertices if v[1] == waist_line_y]

    if len(waist_vertices) >= 2:
        return np.abs(waist_vertices[0][0] - waist_vertices[1][0])
    else:
        raise ValueError("Unable to find waistline vertices.")
    

# Function to calculate vertical height
def calculate_vertical_height(vertices):
    y_coords = [v[1] for v in vertices]
    return max(y_coords) - min(y_coords)