from pathlib import Path

from girder.plugin import GirderPlugin, registerPluginStaticContent


class MdsPlugin(GirderPlugin):
    DISPLAY_NAME = 'MDS-Data Customizations'

    def load(self, info):
        registerPluginStaticContent(
            plugin='mds',
            css=['/style.css'],
            js=['/girder-plugin-mds.umd.cjs'],
            staticDir=Path(__file__).parent / 'web_client' / 'dist',
            tree=info['serverRoot'],
        )
