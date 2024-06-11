from flask import Flask, request, jsonify, render_template
from Frontendfortechnicalround import chatbot_response
import nltk

# nltk.download('punkt')
# nltk.download('wordnet')

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("base.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")
    response = chatbot_response(user_message)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=False,host='0.0.0.0')
