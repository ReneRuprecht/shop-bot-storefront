# Shop Bot Storefront

## ⚙️ Configure Environment Variables

Before starting the Shopware containers, you need to set up your environment variables. 

1. Copy the example file:

```bash
cp docker/.env.example docker/.env
```

2. Open docker/.env and set the variables

3. Save the file. The Makefile and Docker Compose will automatically use these values when running commands.

## 🚀 Run containers and import demo data
To get started with the environment, you can use the provided Makefile to automatically start the containers and import demo data.

Run the recommended command to start the containers and import demo data:

```bash
make fresh_setup
``````


If you don't want to import the demo data, you can simply start the containers with:

```bash
make run
```

## Makefile Targets

💻 **Makefile Commands**

| Command            | Description                              |
| ------------------ | ---------------------------------------- |
| `make help`        | ℹ️ Display an overview of all available Makefile commands |
| `make run`         | ▶️ Start containers and wait until ready |
| `make stop`        | ⏹️ Stop containers                       |
| `make clean`       | 🧹 Clean containers and volumes          |
| `make setup`       | 📥 Import demo data                      |
| `make fresh_setup` | 🔄 Runs clean, run, and setup            |

## 🛒 Access Shopware Web Interface

Once the containers are running, you can access Shopware through your browser.  
The URLs depend on the environment variables defined in `docker/.env`:

- `APP_URL` – the base URL of your Shopware instance
- `HTTP_PORT_LOCAL` – the local port exposed by Docker

⚠️ **Important:** The port in `APP_URL` must match `HTTP_PORT_LOCAL`.  
For example, if you set `HTTP_PORT_LOCAL=80`, your `APP_URL` should be `http://localhost:80`.

### Default
- **Admin Panel:** `http://localhost/admin`
- **Frontend Store:** `http://localhost/`

### Default Login Credentials

The demo environment comes with default credentials:

- **Admin username:** `admin`
- **Admin password:** `shopware`

