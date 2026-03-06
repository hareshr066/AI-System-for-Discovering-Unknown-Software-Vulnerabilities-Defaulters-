#include <stdio.h>
#include <string.h>

void process_login(char *username) {
    // VULNERABILITY: Stack-based Buffer Overflow
    // The buffer is only 20 bytes long
    char buffer[20];

    // strcpy doesn't check destination size!
    // Passing >20 chars crashes the system
    strcpy(buffer, username);

    printf("Logging in user: %s\n", buffer);
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("Usage: program <username>\n");
        return 1;
    }
    process_login(argv[1]);
    return 0;
}
