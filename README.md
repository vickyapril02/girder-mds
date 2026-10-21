# girder-mds-plugin

MDS-Data customizations for Girder 5: landing page, branding, tools dashboard, and login UX.

## Local setup

```bash
# 1. Girder 5 environment (if not done yet)
cd ~/Desktop/girder5/mds-data-g5
python3 -m venv venv
source venv/bin/activate
pip install "girder==5.0.12" gunicorn celery redis

# 2. Build this plugin
cd ~/Desktop/girder5/girder-mds-plugin/girder_mds/web_client
npm install
npm run build

# 3. Install plugin
cd ~/Desktop/girder5/girder-mds-plugin
pip install -e .

# 4. Start services (MongoDB + Redis must be running)
export GIRDER_MONGO_URI="mongodb://localhost:27017/girder_mds_test"
export GIRDER_HOST="127.0.0.1"
export GIRDER_PORT="8080"

girder serve
```

Open http://127.0.0.1:8080 and enable the **MDS-Data Customizations** plugin in Admin → Plugins.

## What is ported so far

- Custom landing page (anonymous users)
- Logged-in dashboard with Tools (Trame, Paraview, LGE, LA QC, MUSICardio)
- Green MDS-Data banner branding
- Login page refresh fix

## Still to port (next steps)

- Folder navigation widgets (HierarchyWidget, FolderTree, etc.)
