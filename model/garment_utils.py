import json
from predict_garment import predict_class
from measurements import calculate_waist_length_upper_panel
from measurements import calculate_waist_length_bottom_panel
from measurements import calculate_vertical_height

def garment_class(predicted_class):
    if predicted_class in ["long sleeve long dress", "long sleeve short dress", 
                           "short sleeve long dress", "short sleeve short dress"]:
        garment_type = "dress"
       

    elif predicted_class in ["long sleeve  tight short jumpsuit", "long sleeve  tight long jumpsuit", 
                             "long sleeve not tight  short jumpsuit", "long sleeve not tight long jumpsuit", 
                             "short sleeve not tight long jumpsuit", "short sleeve not tight short jumpsuit", 
                             "short sleeve tight long jumpsuit", "short sleeve tight short jumpsuit"]:
        garment_type="jumpsuit"
  

    elif predicted_class in ["3 quaters loose", "fit 3 quaters", "fit pants", "fit shorts", 
                             "ladies shorts", "leggins", "loose pants", "loose shorts"]:
        garment_type="pant"


    elif predicted_class in ["circle skirts long", "circle skirts medium", "circle skirts mini", 
                             "long tight skirts", "medium tight skirts", "short tight skirts"]:
        garment_type="skirt"


    elif predicted_class in ["long sleeve no neck t shirt", "long sleeve no neck tops", 
                             "long sleeve normal neck t shirt", "short sleeve no neck t shirt", 
                             "short sleeve normal neck t shirt"]:
        garment_type="tshirt"


    elif predicted_class in ["sleeveless fit no neck crop tops", "sleeveless fit no neck t shirts", 
                             "sleeveless fit normal neck crop tops", "sleeveless fit normal neck t shirts",
                             "sleeveless loose no neck crop tops", "sleeveless loose no neck t shirts", 
                             "sleeveless loose normal neck crop tops", "sleeveless loose normal neck t shirts"]:
        garment_type="sleeveless_tshirt"
 

    elif predicted_class in ["long no neck cut sleeveless not tight jump suit", 
                             "long no neck cut sleevelsee tight jump suit", 
                             "long normal neck cut sleeveless not tight jump suit", 
                             "long normal neck cut sleeveless tight jump suit",
                             "medium no neck cut sleeveless not tight jump suit", 
                             "medium normal neck cut sleeveless not tight jump suit",
                             "short no neck cut sleeveless not tight jump suit", 
                             "short no neck cut sleeveless tight jumpsuit",
                             "short normal neck cut sleeveless not tight jump suit", 
                             "short normal neck cut sleeveless tight jumpsuit"]:
        garment_type="sleeveless_jumpsuit"


    elif predicted_class in ["normal neck cut-  tight - long sleeveless dress", 
                             "normal neck cut-  tight - medium sleeveless dress",
                             "normal neck cut-  tight - short sleeveless dress", 
                             "normal neck cut- not tight - long sleeveless dress", 
                             "normal neck cut- not tight - medium sleeveless dress", 
                             "small neck cut- not tight - long sleeveless dress",
                             "small neck cut- not tight - short sleeveless dress",
                             "small neck cut- tight - long sleeveless dress", 
                             "small neck cut- tight - medium sleeveless dress"]:
        
        garment_type="sleeveless_dress"
    
    
    elif predicted_class in ["long sleeve no neck tops",  "short sleeve no neck t shirt" ]:
        garment_type="croptop"
    

    elif predicted_class in ["sleeveless fit no neck crop tops", 
                             "sleeveless fit normal neck crop tops", 
                             "sleeveless loose no neck crop tops" 
                             "sleeveless loose normal neck crop tops"]:
        garment_type="sleeveless_croptop"
      

    else:
        garment_type="unknown"  # Default case if no match is found

    return garment_type

def load_sizechart(path):
    try:
        with open(path, "r") as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}

def desired_parameter (predicted_class,size,size_chart):
    garment_type = garment_class(predicted_class)

    if garment_type in ("dress", "sleeveless_dress", "jumpsuit", "sleeveless_jumpsuit", "skirt", "pant"):
        parameter = "waist_length"
    elif garment_type in ("croptop", "tshirt", "sleeveless_tshirt", "sleeveless_croptop"):
        parameter = "vertical_height"
    else:
        return None
    
    
    # Get the relevant data from the JSON structure
    garment_data = size_chart.get(garment_type)
    if garment_data:
        measurement_type = garment_data.get("measurement_type")
        values = garment_data.get("values", {})
        if measurement_type == parameter:
            parameter_value = values.get(size.upper())  # Use upper() since sizes are in uppercase
            print(f"Desired {parameter} for {predicted_class} ({size}): {parameter_value} cm")
            return parameter_value
    

def select_panel(predicted_class,panels):
    garment_type = garment_class(predicted_class)
    
    if garment_type in ("dress", "sleeveless_dress"):
        panel_name=  "top_back" 
    
    elif garment_type in ("jumpsuit"):
        panel_name=  "up_back" 

    elif garment_type in ("skirt", "pant","sleeveless_jumpsuit"):
        panel_name=  "wb_back" 

    elif garment_type in ("croptop", "tshirt", "sleeveless_tshirt", "sleeveless_croptop"):
        panel_name=  "back" 
    
    else:
        panel_name=  None 
    
        
    if panel_name not in panels:
        raise ValueError(f"Panel '{panel_name}'for '{garment_type}' not found. Available panels: {list(panels.keys())}")
   
    desired_panel = panels[panel_name]
    return desired_panel


def original_parameter_value(predicted_class, vertices):
        garment_type = garment_class(predicted_class)
    
        if garment_type in ("dress", "sleeveless_dress", "jumpsuit", "sleeveless_jumpsuit"):
            original_parameter_value = calculate_waist_length_upper_panel(vertices)
            

        elif garment_type in ("skirt", "pant"):
            original_parameter_value = calculate_waist_length_bottom_panel(vertices)
            

        elif garment_type in ("croptop", "tshirt", "sleeveless_tshirt", "sleeveless_croptop"):
            original_parameter_value= calculate_vertical_height(vertices)
            

        else:
            original_parameter_value= None
        return original_parameter_value

def scale_factor(original_parameter_value,desired_parameter_value):
    scale_factor = desired_parameter_value/original_parameter_value
    return (scale_factor)