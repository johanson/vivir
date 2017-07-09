from __future__ import print_function

import os

from fabric.api import local
from fabric.colors import red


def build():
    if cmd_exists('zip'):
        local('zip -r "dist/vivir.zip" . -x "*.git*"')
    else:
        print(red("Install zip!"), "apt install zip")


def cmd_exists(x):
    return any(os.access(os.path.join(path, x), os.X_OK)
               for path in os.environ["PATH"].split(os.pathsep))
