from setuptools import find_packages, setup

setup(
    name='girder-mds',
    version='0.1.0',
    description='MDS-Data landing page, branding, and UI customizations for Girder 5',
    author='IHU Liryc',
    license='Apache 2.0',
    python_requires='>=3.10',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=['girder>=5'],
    entry_points={
        'girder.plugin': [
            'mds = girder_mds:MdsPlugin',
        ],
    },
)
