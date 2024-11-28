
### Updating the Live Website from GitHub

To ensure that any updates made to the website's code are properly reflected on the live server, follow these steps:

1. **Make Code Changes Locally**:
   - Clone the repository from GitHub if you haven't already.
   - Make the necessary updates to the code on your local machine.

2. **Push Changes to GitHub**:
   - Commit your changes to your local repository.
   - Push your committed changes to the GitHub repository.
   ```bash
   git add .
   git commit -m "Describe your changes here"
   git push origin main
   ```

3. **Pull Changes on the Server**:
   - SSH into the server where the live website is hosted.
   - Navigate to the directory where the website's code is located.
   - Pull the latest changes from the GitHub repository.
   ```bash
   git pull origin main
   ```

4. **Restart the Server (if necessary)**:
   - Depending on your setup, you might need to restart the server to apply the changes. For example:
   ```bash
   sudo systemctl restart your-web-service
   ```

5. **Verify the Update**:
   - Visit the live website to ensure that the updates have been successfully applied and everything is working as expected.

---

By following these steps, you can ensure that any code changes are properly updated on the live server.
