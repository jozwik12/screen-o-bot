import sys
import json
import time

input = json.load(sys.stdin)

print(json.dumps(input))
