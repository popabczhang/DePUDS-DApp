def format_response(data, message="Success", status_code=200):
    return {
        "status": status_code,
        "message": message,
        "data": data
    }

def validate_input(data, required_fields):
    for field in required_fields:
        if field not in data:
            return False, f"Missing required field: {field}"
    return True, "Validation successful"

def handle_error(error_message, status_code=400):
    return format_response(None, error_message, status_code)