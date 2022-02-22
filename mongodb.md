# Database Connectivity

## I. Downloading and connecting Compass (MongoDB GUI) to Atlas (MongoDB Cloud)

**1. Download MongoDB Compass directly using this URL:**  
https://downloads.mongodb.com/compass/mongodb-compass-community-1.18.0-darwin-x64.dmg

**2. Once Compass is downloaded, open it and copy this connection string in the 'Hostname' field:**  
`mongodb+srv://<username>:<password>@hilfsuche-cluster-2qdrq.gcp.mongodb.net/hilfsuche`

**3. Select 'Username / Password' in the 'Authentication' dropdown menu**  

**4. Enter your respective Username and Password:**  

**Chuying**  
Username: chuyinghe  
Password: sebamaster2019.  

**Jiazheng**  
Username: jiazheng  
Password: sebamaster2019.  


## II. Connecting Mongo Shell to Atlas (MongoDB Cloud)

**1. Enter this command in a terminal for Mongo Shell installation**  
`brew install mongodb/brew/mongodb-community-shell`

**2. Add Mongo Shell to your $PATH variable as follows**  
1. In the terminal, enter the following command to open .profile  
`nano .profile`
3. Paste the following string at the end of your .profile file  
`export PATH="$PATH:/usr/local/Cellar/mongodb-community-shell/4.0.10/bin"`
4. `Ctrl + O` and then `Enter` to save changes
5. `Ctrl + X` to exit nano

**3. Use Mongo Shell**  
1. Restart the terminal
2. Enter this command to connect to the Shell **(make sure you put your own username in place of** `<username>` **)**  
`mongo "mongodb+srv://hilfsuche-cluster-2qdrq.gcp.mongodb.net/hilfsuche" --username <username> --password sebamaster2019.`


**4. Dump & Restore into Backend/dump folder**
After making changes to the data (adding more data, for example, or pulling from remote branch)
1) Drop table "hilfsuche" in Compass MANUALLY
2) Then run this command to dump data from the hilfsuche folder to Compass:  
 `mongorestore dump/ ` 
