import os
import glob

public_dir = r"c:\Users\pablo\Desktop\website\public"
files = glob.glob(os.path.join(public_dir, "**", "*"), recursive=True)

# Filter out directories
files = [f for f in files if os.path.isfile(f)]

# Sort by modification time
files.sort(key=lambda x: os.path.getmtime(x), reverse=True)

print("Recently modified files:")
for f in files[:20]:
    print(f"{f} - {os.path.getmtime(f)} - {os.path.getsize(f)} bytes")
