from ultralytics import YOLO
from PIL import Image

def predict_class(model_path, image_path, class_names):
    model = YOLO(model_path)
    img = Image.open(image_path).convert("RGB")
    results = model.predict(img)
    pred = results[0]
    predicted_class_index = pred.probs.top1
    predicted_class = class_names[predicted_class_index]
    return predicted_class
