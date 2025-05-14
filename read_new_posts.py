import os
import json
from datetime import datetime

# Define paths
POSTS_FOLDER = "blog_posts"
JSON_FILE = "blog_posts.json"

def load_existing_posts():
    """Load existing posts from JSON file."""
    if os.path.exists(JSON_FILE):
        with open(JSON_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_posts(posts):
    """Save posts to JSON file."""
    with open(JSON_FILE, "w", encoding="utf-8") as f:
        json.dump(posts, f, indent=4)

def get_existing_titles(posts):
    """Get titles of existing posts to avoid duplicates (titles are dates now)."""
    return {post["title"] for post in posts}

def process_new_files():
    """Read new .txt files and update posts.json using the date as the title."""
    posts = load_existing_posts()
    existing_titles = get_existing_titles(posts)

    for filename in os.listdir(POSTS_FOLDER):
        if filename.endswith(".txt"):
            filepath = os.path.join(POSTS_FOLDER, filename)

            # Use file modification date as the title
            file_date = datetime.fromtimestamp(os.path.getmtime(filepath)).strftime("%B %d, %Y")

            with open(filepath, "r", encoding="utf-8") as file:
                content = file.read().strip().replace("\n", "<br>")

            if file_date in existing_titles:
                continue  # Skip already added posts

            new_post = {
                "title": file_date,
                "content": content
            }

            posts.append(new_post)

    if len(posts) > len(existing_titles):
        save_posts(posts)
        print("Posts updated successfully.")
    else:
        print("No new posts found.")

if __name__ == "__main__":
    process_new_files()
