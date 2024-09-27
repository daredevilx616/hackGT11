from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows requests from all origins (useful for development)

# Trie data structure
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False
        self.procedure_data = None

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, procedure_name, procedure_data):
        node = self.root
        for char in procedure_name.lower():
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True
        node.procedure_data = procedure_data

    def search(self, prefix):
        node = self.root
        results = []
        for char in prefix.lower():
            if char not in node.children:
                return []
            node = node.children[char]
        self._dfs(node, prefix, results)
        return results

    def _dfs(self, node, prefix, results):
        if node.is_end_of_word:
            results.append({'name': prefix, 'data': node.procedure_data})
        for char, child_node in node.children.items():
            self._dfs(child_node, prefix + char, results)

# Initialize the Trie
trie = Trie()

# Dummy data for the Trie
procedures = [
    ("Appendectomy", "Surgical removal of the appendix"),
    ("Angioplasty", "Procedure to open clogged arteries"),
    ("Arthroscopy", "Minimally invasive surgery for joints"),
    ("Bronchoscopy", "Examination of the airways using a scope"),
    ("Cataract Surgery", "Removal of the cloudy lens in the eye"),
    ("Colonoscopy", "Examination of the colon using a scope")
]

# Insert the dummy data into the Trie
for name, data in procedures:
    trie.insert(name, data)

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('q', '')
    if not query:
        return jsonify([])

    # Get suggestions from the Trie
    suggestions = trie.search(query)
    return jsonify(suggestions)

# Root route to serve the homepage (index.html)
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
