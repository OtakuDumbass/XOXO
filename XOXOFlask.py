from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/bfhl', methods=['GET', 'POST'])
def bfhl():
    if request.method == 'POST':
        data = request.get_json()
        if not data or 'data' not in data:
            return jsonify({
                "is_success": False,
                "user_id": "",
                "email": "",
                "roll_number": "",
                "numbers": [],
                "alphabets": [],
                "highest_alphabet": []
            })

        user_id = "your_full_name_ddmmyyyy"
        email = "your_college_email@example.com"
        roll_number = "your_roll_number"
        numbers = [item for item in data['data'] if item.isdigit()]
        alphabets = [item for item in data['data'] if item.isalpha()]
        highest_alphabet = sorted(alphabets, key=lambda x: x.lower(), reverse=True)[:1] if alphabets else []

        return jsonify({
            "is_success": True,
            "user_id": user_id,
            "email": email,
            "roll_number": roll_number,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_alphabet": highest_alphabet
        })

    elif request.method == 'GET':
        return jsonify({
            "operation_code": 1
        })

if __name__ == '__main__':
    app.run(debug=True)
