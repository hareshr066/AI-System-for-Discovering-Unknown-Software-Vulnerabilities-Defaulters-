import sqlite3

def get_user_data(username):
    # Connect to the database
    conn = sqlite3.connect('company_data.db')
    cursor = conn.cursor()

    # VULNERABILITY: SQL Injection Risk!
    # Using string formatting directly into the query allows malicious input
    # like:  admin' OR '1'='1
    query = f"SELECT * FROM users WHERE username = '{username}'"

    # Execute the dangerous query
    cursor.execute(query)
    user = cursor.fetchone()

    conn.close()
    return user

def execute_system_command(user_provided_command):
    import os
    # VULNERABILITY: Command Injection Risk!
    # Blindly executing user input on the server system
    os.system("ping " + user_provided_command)
