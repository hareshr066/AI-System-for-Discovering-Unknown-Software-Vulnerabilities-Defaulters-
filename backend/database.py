import os
import motor.motor_asyncio
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")

# Create the async MongoDB client
client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URI)

# Select the database and collection
db = client.vulnerability_scanner
scan_results_collection = db.scan_results
