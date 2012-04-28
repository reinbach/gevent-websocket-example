#!/usr/bin/env python
from setuptools import setup

requires = [
    'Flask==0.8',
    'gevent==0.13.7',
    'gevent-websocket==0.3.6',
]

setup(
    name='Gevent Websockets Example',
    version='1.0',
    description='Mini app using gevent and websockets',
    author='Greg Reinbach',
    author_email='greg@reinbach.com',
    url='https://github.com/reinbach/gevent-websocket-example',
    install_requires=requires,
)