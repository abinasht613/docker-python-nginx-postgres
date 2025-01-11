# Use official Python image
FROM python:3.9

# Set working directory
WORKDIR /app

# Copy files
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

# Expose the Flask port
EXPOSE 5000

# Run Flask app
CMD ["python", "app.py"]
