import sys
import json

data = json.loads(sys.stdin.read())

result = {"status": "success", "data": "1"}

print(json.dumps(result))
